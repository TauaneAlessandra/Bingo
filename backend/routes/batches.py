from flask import Blueprint, jsonify
from database import get_db_connection

batches_bp = Blueprint('batches', __name__)

@batches_bp.route('/api/batches', methods=['GET'])
def get_batches():
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute('''
            SELECT date_generated, MIN(card_number), MAX(card_number), COUNT(*), number_range 
            FROM cards 
            GROUP BY date_generated, number_range
            ORDER BY date_generated DESC
        ''')
        rows = cursor.fetchall()
        batches = []
        for row in rows:
            batches.append({
                "date": row[0],
                "start_number": row[1],
                "end_number": row[2],
                "count": row[3],
                "number_range": row[4]
            })
        return jsonify(batches)
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
    finally:
        conn.close()

@batches_bp.route('/api/batches/<date_str>', methods=['DELETE'])
def delete_batch(date_str):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        # Delete cards for the date
        cursor.execute('DELETE FROM cards WHERE date_generated = ?', (date_str,))
        deleted_count = cursor.rowcount
        conn.commit()
        return jsonify({
            "status": "success",
            "message": f"Successfully deleted batch for date {date_str}. Total deleted: {deleted_count} cards."
        })
    except Exception as e:
        conn.rollback()
        return jsonify({"status": "error", "message": str(e)}), 500
    finally:
        conn.close()
