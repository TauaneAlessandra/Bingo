from flask import Flask
from flask_cors import CORS
from database import init_db
from routes import register_blueprints

app = Flask(__name__)
CORS(app)

# Initialize Database on startup
init_db()

# Register modular routes blueprints
register_blueprints(app)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
