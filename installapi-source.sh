#!/bin/sh

# Specify the desired Python version
python_version="3.10.4"

install_project() {
	# Check if the right version of Python is installed
	if ! command -v python3 >/dev/null || ! python3 -c "import sys; assert sys.version_info[:2] == tuple(map(int, '$python_version'.split('.')[:2]))"; then
		echo "Python $python_version is not installed. Please install it and run this script again."
		return 1
	fi

	# Create and activate virtual environment
	echo "Creating virtual environment..."
	python3 -m venv api/.venv
	echo "Creating .gitignore in the virtual environment..."
	echo "# created by installapi-source.sh" >api/.venv/.gitignore
	echo "*" >>api/.venv/.gitignore
	cd api || {
		echo "Failed to change to directory 'api'."
		return 1
	}
	echo "Activating the virtual environment..."
	. .venv/bin/activate || {
		echo "Failed to activate the virtual environment."
		return 1
	}

	# Check if pipenv is installed
	if ! command -v pipenv >/dev/null; then
		echo "Installing pipenv..."
		python3 -m pip install pipenv || {
			echo "Failed to install pipenv."
			return 1
		}
		export PATH="$HOME/.local/bin:$PATH"
	fi

	# Create Pipenv environment with specified Python version
	pipenv --python "$python_version" || {
		echo "Failed to create Pipenv environment."
		return 1
	}

	# Install pip, pipenv and project dependencies
	echo "Upgrading pip and installing dependencies..."
	python3 -m pip install --upgrade pip || {
		echo "Failed to upgrade pip."
		return 1
	}
	pipenv install flask=="2.3.2" || {
		echo "Failed to install Flask."
		return 1
	}
	pipenv install requests=="2.31.0" || {
		echo "Failed to install requests."
		return 1
	}
	pipenv install python-dotenv=="1.0.0" || {
		echo "Failed to install python-dotenv."
		return 1
	}
	pipenv install flask-cors=="3.0.10" || {
		echo "Failed to install Flask-CORS."
		return 1
	}
	pipenv install --dev black=="23.3.0" || {
		echo "Failed to install Black."
		return 1
	}
	pipenv install --dev pylint=="2.17.4" || {
		echo "Failed to install pylint."
		return 1
	}
	pipenv install --dev pycodestyle=="2.10.0" || {
		echo "Failed to install pycodestyle."
		return 1
	}

	echo "API folder created and setup complete!"
}

install_project
