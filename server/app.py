#!/usr/bin/env python3
from flask import request, session, make_response
from flask_restful import Resource
from config import app, db, api
from models import User, Song, Genre, FormPost
"""
FORMPOST:
Create FormPost
Read All FormPosts

"""
class Home(Resource):
    def get(self):
        return make_response({'message': 'Hello World!'}, 202)
    
class Signup(Resource):
    def post(self):
        try:
            new_user = User(username=request.form['username'], email=request.form['email'], password=request.form['password'])
            db.session.add(new_user)
            db.session.commit()
            session['user_id'] = new_user.id
            return make_response({'message': 'Account created!', 'user': new_user.id}, 201)
        except Exception as e:
            return make_response({'message': 'Something went wrong!', 'stackTrace': e}, 400)
        
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
        if 'user_id' in session:
            return make_response({"userId":session['user_id']}, 200)
        else:
            return make_response({'message': 'You are not logged in!'}, 401)
        
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
            new_song = Song(title=request.form['title'], artist=request.form['artist'], genre=request.form['genre'], user_id=session['user_id'])
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
            new_post = FormPost(title=request.form['title'], artist=request.form['artist'], genre=request.form['genre'], user_id=session['user_id'])
            db.session.add(new_post)
            db.session.commit()
            return make_response({'message': 'Post added!'}, 201)
        except Exception as e:
            return make_response({'message': 'Something went wrong!','stackTrace': e}, 400)
    
api.add_resource(Home, '/')
api.add_resource(Signup, '/signup')
api.add_resource(DeleteAccount, '/delete_account')
api.add_resource(CheckSession, '/check_session')
api.add_resource(GetUsersSongs, '/get_users_songs')
api.add_resource(AddSong, '/add_song')
api.add_resource(FormPostList, '/formpost')
if __name__ == '__main__':
    app.run(port=5555, debug=True)