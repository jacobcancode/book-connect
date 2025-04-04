from datetime import datetime
from app import db

class ReadingSession(db.Model):
    __tablename__ = 'reading_sessions'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    book_id = db.Column(db.Integer, db.ForeignKey('books.id'), nullable=False)
    start_time = db.Column(db.DateTime, nullable=False)
    end_time = db.Column(db.DateTime)
    duration = db.Column(db.Integer)  # Duration in minutes
    pages_read = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships
    user = db.relationship('User', backref=db.backref('reading_sessions', lazy=True))
    book = db.relationship('Book', backref=db.backref('reading_sessions', lazy=True))

    def __init__(self, user_id, book_id, start_time, pages_read=0):
        self.user_id = user_id
        self.book_id = book_id
        self.start_time = start_time
        self.pages_read = pages_read

    def end_session(self, end_time):
        self.end_time = end_time
        if self.start_time and self.end_time:
            self.duration = int((self.end_time - self.start_time).total_seconds() / 60)

    def to_dict(self):
        return {
            'id': self.id,
            'book_id': self.book_id,
            'start_time': self.start_time.isoformat(),
            'end_time': self.end_time.isoformat() if self.end_time else None,
            'duration': self.duration,
            'pages_read': self.pages_read,
            'created_at': self.created_at.isoformat(),
            'book': {
                'title': self.book.title,
                'author': self.book.author,
                'cover': self.book.cover
            }
        }

class ReadingSpeed(db.Model):
    __tablename__ = 'reading_speeds'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    words_per_minute = db.Column(db.Integer, nullable=False)
    test_date = db.Column(db.DateTime, default=datetime.utcnow)
    words_read = db.Column(db.Integer, nullable=False)
    minutes_taken = db.Column(db.Integer, nullable=False)

    # Relationship
    user = db.relationship('User', backref=db.backref('reading_speeds', lazy=True))

    def __init__(self, user_id, words_per_minute, words_read, minutes_taken):
        self.user_id = user_id
        self.words_per_minute = words_per_minute
        self.words_read = words_read
        self.minutes_taken = minutes_taken

    def to_dict(self):
        return {
            'id': self.id,
            'words_per_minute': self.words_per_minute,
            'test_date': self.test_date.isoformat(),
            'words_read': self.words_read,
            'minutes_taken': self.minutes_taken
        } 