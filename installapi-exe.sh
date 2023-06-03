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

	# Check if pipenv is installed
	if ! command -v pipenv >/dev/null; then
		echo "Installing pipenv..."
		python3 -m pip install --user pipenv || {
			echo "Failed to install pipenv."
			echo "Press enter to continue"
			read -r dummy
			return 1
		}
		export PATH="$HOME/.local/bin:$PATH"
	fi

	# Create project directory
	echo "Creating project directory..."
	mkdir -p api
	cd api || {
		echo "Failed to change to directory 'api'."
		echo "Press enter to continue"
		read -r dummy
		return 1
	}

	# Install project dependencies
	echo "Installing dependencies..."
	export PIPENV_VENV_IN_PROJECT=1
	pipenv --python "$python_version"
	pipenv install flask --dev || {
		echo "Failed to install project dependencies."
		echo "Press enter to continue"
		read -r dummy
		return 1
	}
}

install_project
echo "To enter the virtual environment, navigate to the 'api' directory and run 'pipenv shell'."
