import os

import requests
from dotenv import load_dotenv
from flask import Flask, request

# Define the Unsplash API base URL
UNSPLASH_URL = "https://api.unsplash.com/photos/random"

# Load environment variables from a .env.local file in the current directory
load_dotenv(dotenv_path="./.env.local")

# Get the Unsplash API key from the environment variables
UNSPLASH_KEY = os.environ.get("UNSPLASH_KEY", "")

# Raise an exception if the Unsplash API key is not provided
if not UNSPLASH_KEY:
    raise EnvironmentError("Please create a .env.local file with UNSPLASH_KEY")

# Instantiate a Flask application
app = Flask(__name__)

# Define a Flask route for "/new-image" to retrieve images based on a query
@app.route("/new-image")
def new_image():
    """
    Flask route to retrieve images from Unsplash based on a query.
    The query parameter is received via the request URL.
    The Unsplash API is then hit with the query parameter to return a random image related to the query.
    """

    # Get the query parameter from the request URL
    word = request.args.get("query")

    # Define the headers for the Unsplash API request
    headers = {
        "Accept-Version": "v1",
        "Authorization": "Client-ID " + UNSPLASH_KEY,
    }

    # Set the query parameters for the Unsplash API request
    params = {
        "query": word,
    }

    # Make a GET request to the Unsplash API with the headers and parameters
    # Extract the JSON response from the API
    response = requests.get(url=UNSPLASH_URL, headers=headers, params=params)
    data = response.json()

    # Return the JSON data from the Unsplash API
    return data


# Execute the Flask application if this script is run directly
# This won't be run if this script is imported as a module
if __name__ == "__main__":
    # Run the Flask app on all available network interfaces at port 5050
    app.run(host="0.0.0.0", port=5050)
