#!/usr/bin/env python3
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from config import db, bcrypt
from sqlalchemy.orm import validates

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String)
    email = db.Column(db.String, unique=True, nullable=False)
    songs = db.relationship('Song', backref='user', cascade='all, delete, delete-orphan')
    posts = db.relationship('FormPost', backref='user', cascade='all, delete, delete-orphan')
    genre = db.relationship('Genre', backref=db.backref('song', uselist=False))
    genre_id = db.Column(db.Integer, db.ForeignKey('genres.id'))

    @validates('email')
    def validate_email(self, key, value):
        if '@' not in value or '.' not in value:
            raise ValueError('Invalid email')
        return value
    
    @hybrid_property
    def password(self):
        return self._password_hash
    
    @password.setter
    def password(self, password):
        self._password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def verify_password(self, password):
        return bcrypt.check_password_hash(self._password_hash, password)
    
    def __repr__(self):
        return f'<User {self.id} :: {self.username}>'
    
class Song(db.Model, SerializerMixin):
    __tablename__ ='songs'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    artist = db.Column(db.String)
    album = db.Column(db.String)
    genre = db.relationship('Genre', backref=db.backref('song_g', uselist=False))
    genre_id = db.Column(db.Integer, db.ForeignKey('genres.id'))
    link = db.Column(db.String)
    album_cover = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    serialize_only = ('id', 'artist', 'title', 'album', 'album_cover', 'link',)

    def __repr__(self):
        return f'<Song {self.id} :: {self.title}>'

class Genre(db.Model, SerializerMixin):
    __tablename__ = 'genres'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    serialize_only = ('name',)
    
    def __repr__(self):
        return f'<Genre {self.id} :: {self.name}>'

class FormPost(db.Model, SerializerMixin):
    __tablename__ = 'form_posts'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    body = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    song_id = db.Column(db.Integer, db.ForeignKey('songs.id'))
    song = db.relationship('Song', backref=db.backref('song', uselist=False))
    genre = association_proxy('song', 'genre')
    user_name = db.Column(db.String)
    serialize_only = ('title','body','song', 'user_id', 'user_name', 'id', )

    def __repr__(self):
        return f'<FormPost {self.id} :: {self.title}>'