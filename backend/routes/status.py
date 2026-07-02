from flask import Blueprint, jsonify
from database import get_db_connection

status_bp = Blueprint('status', __name__)

@status_bp.route('/api/status', methods=['GET'])
def get_status():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Get total cards
        cursor.execute('SELECT COUNT(*) FROM cards')
        total_cards = cursor.fetchone()[0]
        
        # Get count per date
        cursor.execute('SELECT date_generated, COUNT(*) FROM cards GROUP BY date_generated')
        batches = [{"date": row[0], "count": row[1]} for row in cursor.fetchall()]
        
        conn.close()
        return jsonify({
            "status": "connected",
            "total_cards": total_cards,
            "batches": batches
        })
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
