import pymongo
from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()
db_url = os.environ.get("DATABASE_URI")
client = MongoClient(db_url)
