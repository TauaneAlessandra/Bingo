import json
from flask import Blueprint, request, jsonify
from database import get_db_connection

config_bp = Blueprint('config', __name__)

@config_bp.route('/api/config', methods=['GET', 'POST'])
def handle_config():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    if request.method == 'POST':
        data = request.json
        try:
            config_str = json.dumps(data)
            cursor.execute(
                'INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = ?',
                ('config', config_str, config_str)
            )
            conn.commit()
            return jsonify({"status": "success", "message": "Configuration saved"})
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 500
        finally:
            conn.close()
    else:
        # GET
        try:
            cursor.execute('SELECT value FROM settings WHERE key = ?', ('config',))
            row = cursor.fetchone()
            if row:
                return jsonify(json.loads(row[0]))
            else:
                return jsonify(None)
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 500
        finally:
            conn.close()
