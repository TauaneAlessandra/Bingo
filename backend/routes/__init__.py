from .status import status_bp
from .config import config_bp
from .cards import cards_bp
from .batches import batches_bp

def register_blueprints(app):
    app.register_blueprint(status_bp)
    app.register_blueprint(config_bp)
    app.register_blueprint(cards_bp)
    app.register_blueprint(batches_bp)
