import os

import requests
from dotenv import load_dotenv
from flask import Flask, request
from flask_cors import CORS

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


if __name__ == "__main__":  # means that when this script is run directly,
    # run the Flask app on all available network interfaces at port 5050
    app.run(host="0.0.0.0", port=5050)
