import os

from dotenv import load_dotenv
from pymongo import MongoClient, mongo_client

load_dotenv(dotenv_path="./.env.local")  # loads environment variables (envs)

MONGO_URL = os.environ.get("MONGO_URL", "mongo")
MONGO_USERNAME = os.environ.get("MONGO_USERNAME", "root")
MONGO_PASSWORD = os.environ.get("MONGO_PASSWORD", "")
MONGO_PORT = os.environ.get("MONGO_PORT", 27017)

mongo_client = MongoClient(
    host=MONGO_URL,
    password=MONGO_PASSWORD,
    username=MONGO_USERNAME,
    port=int(MONGO_PORT),
)


def insert_test_document():
    """Inserts a test document into the test_collection collection."""
    db = mongo_client.test
    test_collection = db.test_collection
    res = test_collection.insert_one({"name": "Mandy", "disciple": True})
    print(res)
