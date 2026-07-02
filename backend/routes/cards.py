import json
from datetime import datetime
from flask import Blueprint, request, jsonify
from database import get_db_connection
from services.bingo_service import generate_card_grids, calculate_card_hash

cards_bp = Blueprint('cards', __name__)

@cards_bp.route('/api/cards/generate', methods=['POST'])
def generate_cards():
    data = request.json or {}
    quantity = int(data.get('quantity', 2000))
    date_str = data.get('date') or datetime.now().strftime('%Y-%m-%d')
    number_range = int(data.get('number_range', 75))
    start_number = data.get('start_number')

    if quantity <= 0 or quantity > 5000:
        return jsonify({"status": "error", "message": "Quantity must be between 1 and 5000"}), 400

    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        # 1. Fetch all existing hashes to guarantee absolute uniqueness
        cursor.execute('SELECT hash FROM cards')
        existing_hashes = {row[0] for row in cursor.fetchall()}
        
        # 2. Determine starting card number
        if start_number is not None:
            current_num = int(start_number)
            # Check if this card number or any in the range already exists
            cursor.execute('SELECT COUNT(*) FROM cards WHERE card_number >= ? AND card_number < ?', 
                           (current_num, current_num + quantity))
            if cursor.fetchone()[0] > 0:
                conn.close()
                return jsonify({
                    "status": "error", 
                    "message": f"Conflict: Some card numbers between {current_num} and {current_num + quantity - 1} already exist."
                }), 409
        else:
            cursor.execute('SELECT MAX(card_number) FROM cards')
            max_num = cursor.fetchone()[0]
            current_num = (max_num + 1) if max_num is not None else 1

        # 3. Generate cards
        generated_cards = []
        new_hashes = set()
        
        while len(generated_cards) < quantity:
            grids = generate_card_grids(number_range)
            card_hash = calculate_card_hash(grids)
            
            # Check for duplicates in database and current batch
            if card_hash not in existing_hashes and card_hash not in new_hashes:
                new_hashes.add(card_hash)
                generated_cards.append((
                    current_num,
                    date_str,
                    number_range,
                    json.dumps(grids[0]),
                    json.dumps(grids[1]),
                    json.dumps(grids[2]),
                    json.dumps(grids[3]),
                    card_hash
                ))
                current_num += 1

        # 4. Save to DB in transaction
        cursor.executemany('''
            INSERT INTO cards (card_number, date_generated, number_range, grid1, grid2, grid3, grid4, hash)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ''', generated_cards)
        
        conn.commit()
        
        return jsonify({
            "status": "success",
            "message": f"Successfully generated {quantity} cards.",
            "date": date_str,
            "start_number": generated_cards[0][0],
            "end_number": generated_cards[-1][0]
        })

    except Exception as e:
        conn.rollback()
        return jsonify({"status": "error", "message": str(e)}), 500
    finally:
        conn.close()

@cards_bp.route('/api/cards', methods=['GET'])
def get_cards():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    date_filter = request.args.get('date')
    card_number = request.args.get('number')
    start_num = request.args.get('start')
    quantity = request.args.get('quantity')
    
    page = int(request.args.get('page', 1))
    limit = int(request.args.get('limit', 50))
    offset = (page - 1) * limit

    try:
        if card_number:
            # Query single card
            cursor.execute('SELECT * FROM cards WHERE card_number = ?', (int(card_number),))
            row = cursor.fetchone()
            if row:
                card = {
                    "card_number": row['card_number'],
                    "date_generated": row['date_generated'],
                    "number_range": row['number_range'],
                    "grids": [
                        json.loads(row['grid1']),
                        json.loads(row['grid2']),
                        json.loads(row['grid3']),
                        json.loads(row['grid4'])
                    ]
                }
                return jsonify({"cards": [card], "total": 1, "page": 1, "limit": 1})
            return jsonify({"cards": [], "total": 0, "page": 1, "limit": limit})

        # Build query
        query = 'SELECT * FROM cards WHERE 1=1'
        count_query = 'SELECT COUNT(*) FROM cards WHERE 1=1'
        params = []

        if date_filter:
            query += ' AND date_generated = ?'
            count_query += ' AND date_generated = ?'
            params.append(date_filter)
        
        if start_num:
            query += ' AND card_number >= ?'
            count_query += ' AND card_number >= ?'
            params.append(int(start_num))
            
            if quantity:
                query += ' AND card_number < ?'
                count_query += ' AND card_number < ?'
                params.append(int(start_num) + int(quantity))

        # Sort by card number
        query += ' ORDER BY card_number ASC'

        # Get total count
        cursor.execute(count_query, params)
        total_count = cursor.fetchone()[0]

        # Add pagination
        query += ' LIMIT ? OFFSET ?'
        params.extend([limit, offset])

        cursor.execute(query, params)
        rows = cursor.fetchall()
        
        cards = []
        for row in rows:
            cards.append({
                "card_number": row['card_number'],
                "date_generated": row['date_generated'],
                "number_range": row['number_range'],
                "grids": [
                    json.loads(row['grid1']),
                    json.loads(row['grid2']),
                    json.loads(row['grid3']),
                    json.loads(row['grid4'])
                ]
            })
            
        return jsonify({
            "cards": cards,
            "total": total_count,
            "page": page,
            "limit": limit
        })

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
    finally:
        conn.close()

@cards_bp.route('/api/cards/<int:card_number>', methods=['GET'])
def get_card_by_number(card_number):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute('SELECT * FROM cards WHERE card_number = ?', (card_number,))
        row = cursor.fetchone()
        if row:
            return jsonify({
                "card_number": row['card_number'],
                "date_generated": row['date_generated'],
                "number_range": row['number_range'],
                "grids": [
                    json.loads(row['grid1']),
                    json.loads(row['grid2']),
                    json.loads(row['grid3']),
                    json.loads(row['grid4'])
                ]
            })
        return jsonify({"status": "error", "message": f"Card #{card_number} not found"}), 404
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
    finally:
        conn.close()
