from config import db, app
from models import User, Song, Genre, FormPost

with app.app_context():
    db.session.add(Genre(name="Rap"))
    db.session.add(Genre(name="Country"))
    db.session.add(Genre(name="R&B"))
    db.session.add(Genre(name="EDM"))
    db.session.add(Genre(name="Rock"))
    db.session.add(Genre(name="Lo-fi"))
    db.session.commit()