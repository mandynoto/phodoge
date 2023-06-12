import os

import requests
from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS
from mongo_client import mongo_client

gallery = mongo_client.gallery
images_collection = gallery.images

UNSPLASH_URL = "https://api.unsplash.com/photos/random"  # is Unsplash API base URL

load_dotenv(dotenv_path="./.env.local")  # loads environment variables (envs)

DEBUG = bool(os.environ.get("DEBUG", True))  # enables Flask debug mode by default
UNSPLASH_KEY = os.environ.get("UNSPLASH_KEY", "")  # gets Unsplash API key from envs
if not UNSPLASH_KEY:  # raises an error if UNSPLASH_KEY is empty
    raise EnvironmentError("Please create a .env.local file with UNSPLASH_KEY")

app = Flask(__name__)  # instantiates a Flask application
CORS(app)  # enables Cross-Origin Resource Sharing (CORS) for the Flask app

app.config["DEBUG"] = DEBUG


# Define a Flask route for "/new-image" to retrieve images based on a query
@app.route("/new-image")
def new_image():
    """
    Flask route to retrieve images from Unsplash based on a query.
    The query parameter is received via the request URL.
    The Unsplash API is then hit with the query parameter to return a random image related to the query.
    """

    word = request.args.get("query")  # gets query parameter from request URL
    headers = {  # defines headers for Unsplash API request
        "Accept-Version": "v1",
        "Authorization": "Client-ID " + UNSPLASH_KEY,
    }

    params = {  # sets query parameters for Unsplash API request
        "query": word,
    }

    # Make a GET request to the Unsplash API with the headers and parameters
    response = requests.get(url=UNSPLASH_URL, headers=headers, params=params)
    data = response.json()  # extracts JSON data from response

    return data  # that is, the JSON data from Unsplash API


@app.route("/images", methods=["GET", "POST"])
def images():
    if request.method == "GET":  # , read images from database
        images = images_collection.find({})
        return jsonify([img for img in images])
    elif request.method == "POST":  # , save image in database
        image = request.get_json()
        image["_id"] = image.get("id")
        result = images_collection.insert_one(image)
        inserted_id = result.inserted_id
        return {"inserted_id": inserted_id}
    return jsonify({"error": "Method not allowed"}), 405


@app.route("/images/<image_id>", methods=["DELETE"])  # type: ignore
def image(image_id: str):
    if request.method == "DELETE":
        # delete image from database
        res = images_collection.delete_one(filter={"_id": image_id})
        if not res:
            return {"error": "Image was not deleted. Please try again"}, 500
        if not res.deleted_count:
            return {"error": "image not found"}, 404
        return {"deleted_id": image_id}


if __name__ == "__main__":  # means that when this script is run directly,
    # run the Flask app on all available network interfaces at port 5050
    app.run(host="0.0.0.0", port=5050)
