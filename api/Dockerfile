# Use official Python runtime version 3.10.11 as a parent image
FROM python:3.10.11

# Set the working directory in the Docker image to /app
WORKDIR /app

# Inform Docker that the container listens on the specified network port at runtime
EXPOSE 5050

# Copy the Pipfile and Pipfile.lock files from your local system to the Docker image
COPY Pipfile Pipfile.lock ./

# Run the command pip install pipenv inside the Docker image to install pipenv 
RUN pip install pipenv

# Convert the Pipfile.lock file into a requirements.txt file within the Docker image
RUN pipenv requirements > requirements.txt

# Run the command pip install -r requirements.txt to install all Python package dependencies
RUN pip install -r requirements.txt

# Copy the rest of your code from your local system to the Docker image
COPY . ./

# The command that will be executed when Docker runs your image
CMD ["python", "app.py"]
