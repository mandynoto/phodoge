#!/bin/sh

# Specify the desired Python version
python_version="3.10.4"

install_project() {
	# Check if the right version of Python is installed
	if ! command -v python3 >/dev/null || ! python3 -c "import sys; assert sys.version_info[:2] == tuple(map(int, '$python_version'.split('.')[:2]))"; then
		echo "Python $python_version is not installed. Please install it and run this script again."
		echo "Press enter to continue"
		read -r dummy
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
		echo "Press enter to continue"
		read -r dummy
		return 1
	}
	echo "Activating the virtual environment..."
	. .venv/bin/activate || {
		echo "Failed to activate the virtual environment."
		echo "Press enter to continue"
		read -r dummy
		return 1
	}

	# Check if pipenv is installed
	if ! command -v pipenv >/dev/null; then
		echo "Installing pipenv..."
		python3 -m pip install pipenv || {
			echo "Failed to install pipenv."
			echo "Press enter to continue"
			read -r dummy
			return 1
		}
		export PATH="$HOME/.local/bin:$PATH"
	fi

	# Install pip, pipenv and project dependencies
	echo "Upgrading pip and installing dependencies..."
	python3 -m pip install --upgrade pip || {
		echo "Failed to upgrade pip."
		echo "Press enter to continue"
		read -r dummy
		return 1
	}
	pip install pipenv || {
		echo "Failed to install pipenv."
		echo "Press enter to continue"
		read -r dummy
		return 1
	}
	pipenv install --python "$python_version" flask --dev || {
		echo "Failed to install project dependencies."
		echo "Press enter to continue"
		read -r dummy
		return 1
	}
	pipenv install --python "$python_version" requests --dev || {
		echo "Failed to install project dependencies."
		echo "Press enter to continue"
		read -r dummy
		return 1
	}
	pipenv install --python "$python_version" python-dotenv --dev || {
		echo "Failed to install project dependencies."
		echo "Press enter to continue"
		read -r dummy
		return 1
	}
	pipenv install --python "$python_version" flask-cors --dev || {
		echo "Failed to install project dependencies."
		echo "Press enter to continue"
		read -r dummy
		return 1
	}

	echo "Setup complete! You can now start working on the project."
}

install_project
