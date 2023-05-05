#!/usr/bin/env python3
from flask import Flask, request, make_response, jsonify
from flask_migrate import Migrate
from flask_restful import Api, Resource

from models import db

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///songpicker.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)
api = Api(app)

db.init_app(app)

class Home(Resource):
    def get(self):
        return make_response({'message': 'Hello World!'}, 202)
    
api.add_resource(Home, '/')

if __name__ == '__main__':
    app.run(port=5555, debug=True)