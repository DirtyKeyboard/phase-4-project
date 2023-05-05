#!/usr/bin/env python3
from flask import request, session, make_response
from flask_restful import Resource
from config import app, db, api
from models import User, Song, Genre, FormPost
"""
USER:
Login
Create
Delete Acc
Check_Session
Add Song

SONG:
Create Song
Get A User's Songs

FORMPOST:
Create FormPost
Read All FormPosts

"""
class Home(Resource):
    def get(self):
        return make_response({'message': 'Hello World!'}, 202)
    
api.add_resource(Home, '/')

if __name__ == '__main__':
    app.run(port=5555, debug=True)