#!/usr/bin/env python3
from flask import request, session, make_response
from flask_restful import Resource
from config import app, db, api
from models import User, Song, Genre, FormPost

class Home(Resource):
    def get(self):
        return make_response({'message': 'Hello World!'}, 202)
    
class Signup(Resource):
    def post(self):
        try:
            new_user = User(username=request.get_json()['username'], email=request.get_json()['email'], password=request.get_json()['password'])
            db.session.add(new_user)
            db.session.commit()
            session['user_id'] = new_user.id
            return make_response({'message': 'Account created!', 'user': new_user.id}, 201)
        except Exception as e:
            return make_response({'message': 'Something went wrong!', 'stackTrace': e}, 400)
        
class Login(Resource):
    def post(self): 
        request_json = request.get_json()

        username = request_json.get('username')
        password = request_json.get('password')

        user = User.query.filter(User.username == username).first()

        if user:
            if user.verify_password(password):
                session['user_id'] = user.id
                # request.set_cookie('user_id', user.id)
                return user.to_dict(), 200

        return {'error': '401 Unauthorized'}, 401

class Logout(Resource):
    def get(self):
        session.pop('user_id', None)
        return make_response({'message': 'You have been logged out!'}, 200)

class DeleteAccount(Resource):
    def delete(self):
        try:
            user = User.query.filter(User.id == session['user_id']).first()
            db.session.delete(user)
            db.session.commit()
            session.pop('user_id', None)
            return make_response({'message': 'Account deleted!'}, 200)
        except Exception as e:
            return make_response({'message': 'Something went wrong!','stackTrace': e}, 400)
    
class CheckSession(Resource):
    def get(self):
        if session.get('user_id'):

            user = User.query.filter(User.id == session['user_id']).first()

            return user.to_dict(), 200

        return {'error': '401 Unauthorized'}, 401
        
class GetUsersSongs(Resource):
    def get(self):
        try:
            user = User.query.filter(User.id == session['user_id']).first()
            return make_response(user.songs.to_dict(),202)
        except Exception as e:
            return make_response({'message': 'Something went wrong!','stackTrace': e}, 400)
        
class AddSong(Resource):
    def post(self):
        try:
            new_song = Song(title=request.get_json()['title'],
                            artist=request.get_json()['artist'],
                            album=request.get_json()['album'],
                            year=request.get_json()['year'],
                            link=request.get_json()['link'],
                            user_id=session['user_id']) #Have a list of genre IDs, linking to the genres table, append each genre
            genres = request.get_json()['genres']
            for i in genres:
                new_song.genres.append(Genre.query.filter(Genre.id == i).first())
            db.session.add(new_song)
            db.session.commit()
            return make_response({'message': 'Song added!'}, 201)
        except Exception as e:
            return make_response({'message': 'Something went wrong!','stackTrace': e}, 400)
        

class FormPostList(Resource):
    def get(self):
        try:
            posts = FormPost.query.all()
            return make_response(posts.to_dict(),202)
        except Exception as e:
            return make_response({'message': 'Something went wrong!','stackTrace': e}, 400)
    
    def post(self):
        try:
            new_post = FormPost(title=request.get_json()['title'], body=request.get_json()['body'], user_id=session['user_id'], song_id = request.get_json()['song_id']) #Have a genre ID, linking to one genre.
            db.session.add(new_post)
            db.session.commit()
            return make_response({'message': 'Post added!'}, 201)
        except Exception as e:
            return make_response({'message': 'Something went wrong!','stackTrace': e}, 400)
    
class GenreList(Resource):
    def get(self):
        genres = Genre.query.all()
        return make_response([g.to_dict() for g in genres], 202)
    
class SetUserGenre(Resource):
    def post(self):
        if session.get('user_id'):
            try:
                genre = Genre.query.filter(Genre.name == request.get_json()['genre']).first()
                user = User.query.filter(User.id == session['user_id']).first()
                user.genre = genre
                db.session.commit()
                return make_response({'message': 'Genre set!'}, 201)
            except:
                return make_response({'message': 'Genre not set!'}, 401)
        else:
            return make_response({'message': 'Not logged in'}, 200)

class PatchGenre(Resource):
    def patch(self):
        genre_name = request.get_json()['genre']
        user = User.query.filter(User.id == session['user_id']).first()
        genre_added = Genre.query.filter(Genre.name == genre_name).first()
        user.genre = genre_added
        db.session.commit()
        return make_response({"message": "Genre Added!"},202)

api.add_resource(Home, '/')
api.add_resource(Signup, '/signup')
api.add_resource(DeleteAccount, '/delete_account')
api.add_resource(CheckSession, '/check_session')
api.add_resource(GetUsersSongs, '/get_users_songs')
api.add_resource(AddSong, '/add_song')
api.add_resource(FormPostList, '/formpost')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(GenreList, '/genres')
api.add_resource(SetUserGenre, '/set_user_genre')
api.add_resource(PatchGenre, '/add_user_genre')
if __name__ == '__main__':
    app.run(port=5555, debug=True)