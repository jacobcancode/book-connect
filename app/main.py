from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_migrate import Migrate
from config import Config

# Initialize extensions
db = SQLAlchemy()
login_manager = LoginManager()
migrate = Migrate()

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Initialize extensions with app
    db.init_app(app)
    login_manager.init_app(app)
    migrate.init_app(app, db)

    # Register blueprints
    from app.routes.auth import auth_bp
    from app.routes.books import books_bp
    from app.routes.journal import journal_bp
    from app.routes.reading import reading_bp

    app.register_blueprint(auth_bp)
    app.register_blueprint(books_bp)
    app.register_blueprint(journal_bp)
    app.register_blueprint(reading_bp)

    # Import models to ensure they are registered with SQLAlchemy
    from app.models.user import User
    from app.models.book import Book
    from app.models.reading import ReadingJournal, ReadingSession, ReadingSpeed

    return app 