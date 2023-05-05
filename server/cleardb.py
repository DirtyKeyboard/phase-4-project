from config import db, app
from models import User, Song, Genre, FormPost

with app.app_context():
    users = User.query.all()
    songs = Song.query.all()
    genres = Genre.query.all()
    form_posts = FormPost.query.all()

    for u in users:
        db.session.delete(u)
    for s in songs:
        db.session.delete(s)
    for g in genres:
        db.session.delete(g)
    for f in form_posts:
        db.session.delete(f)

    db.session.commit()
