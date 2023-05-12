from flask import Flask
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.secret_key = b'\x8bA\xa5\xe6bE\x83\x10xQ\x06\xcb'
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:h8E+mc9i7RjhuUh@db.ndzxbeztcymzjjfyitku.supabase.co:5432/postgres" #sqlite:///songpicker.db
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config["SESSION_COOKIE_SAMESITE"] = "None"
app.config["SESSION_COOKIE_SECURE"] = True
app.json.compact = False
db = SQLAlchemy()
migrate = Migrate(app, db)
db.init_app(app)
bcrypt = Bcrypt(app)
api = Api(app)