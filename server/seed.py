from config import db, app
from models import User, Song, Genre, FormPost

with app.app_context():
    u = User(username='admin', password='password', email='anpch@example.com')
    s = Song(title='test song', artist='test artist', album='test album', year=2020)
    g = Genre(name='test genre')
    f = FormPost(title='test form post', body='test form post body', song_id=s.id)
    db.session.bulk_save_objects([u, s, g, f])
    db.session.commit()