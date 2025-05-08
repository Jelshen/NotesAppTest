# Notes App

A Django-based web application personal project for managing personal notes with user authentication and CRUD operations.

## Prerequisites

- [Visual Studio Code](https://code.visualstudio.com/) - Code editor for development
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) - Database server for storing notes and user data
- [SQL Server Management Studio (SSMS)](https://learn.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms) - Tool to manage SQL Server databases
- [Python](https://www.python.org/downloads/) (3.x recommended) - Programming language required to run the application
- [ODBC Driver 17 for SQL Server](https://learn.microsoft.com/en-us/sql/connect/odbc/download-odbc-driver-for-sql-server) - Required for Python to communicate with SQL Server

## Installation

1. **Clone the repository**
   ```bash
   git clone "https://github.com/Jelshen/NotesAppTest/edit/master/README.md"
   cd NoteAppTest
   ```
   This downloads the project code to your local machine. The `cd` command moves you into the project directory.

2. **Set up Python virtual environment**
   ```bash
   # Create virtual environment
   python -m venv venv

   # Activate virtual environment
   # On Windows:
   venv\Scripts\activate
   # On Unix/MacOS:
   source venv/bin/activate
   ```
   A virtual environment creates an isolated Python environment for this project, preventing conflicts with other Python projects. You'll know it's activated when you see `(venv)` at the start of your command prompt.

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```
   This installs all the Python packages needed to run the application, including Django and database drivers.

4. **Set up the database**
   - Open SQL Server Management Studio (SSMS)
   - Connect to your SQL Server instance
   - Open and run `setup.sql` to create the database and tables
   - Verify that the `Notes` database and `NoteEntries` table are created
   
   This step creates the database structure needed to store notes and user data. The `setup.sql` file contains the SQL commands to create the necessary database and tables.

5. **Configure environment variables**
   - Create a new `.env` file in root
   - Copy `.env.example` to `.env`
   - Update the following variables in `.env`:
     ```
     # Database
     DB_NAME=Notes
     DB_USER=your_sql_server_username
     DB_PASSWORD=your_sql_server_password
     DB_HOST=localhost
     DB_PORT=
     ```
   Environment variables keep sensitive information like database credentials out of the code. The `.env` file is not tracked by Git to maintain security.

6. **Run migrations**
   ```bash
   # Create database migrations
   python manage.py makemigrations

   # Apply migrations to the database
   python manage.py migrate
   ```
   Migrations are Django's way of propagating changes to your database schema:
   - `makemigrations` creates new migrations based on your models
   - `migrate` applies these migrations to your database

7. **Start the development server**
   ```bash
   python manage.py runserver
   ```
   This starts the Django development server, making your application accessible locally.

8. **Access the application**
   - Open your browser and go to `http://127.0.0.1:8000/`
   - Register a new account or login with existing credentials
   
   The application is now running on your local machine. You can access it through your web browser.

## Project Structure

- `config/` - Django project settings and configuration files
- `notes/` - Notes application containing models, views, and templates for note management
- `users/` - User authentication handling login, registration, and user management
- `static/` - Static files like CSS and JavaScript for styling and interactivity
- `templates/` - HTML templates for rendering the user interface

## Troubleshooting

1. **Database Connection Issues**
   - Verify SQL Server is running
   - Check credentials in `.env` file
   - Ensure ODBC Driver 17 is installed
   
   These are common issues when the application can't connect to the database.

2. **Package Installation Issues**
   - Make sure virtual environment is activated
   - Try updating pip: `python -m pip install --upgrade pip`
   
   Package installation problems often occur when the virtual environment isn't activated or pip is outdated.

3. **Server Start Issues**
   - Check if port 8000 is available
   - Verify all environment variables are set
   
   The server might fail to start if another application is using port 8000 or if required environment variables are missing.

## Contributing

1. Fork the repository - Create your own copy of the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`) - Make changes in a separate branch
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`) - Save your changes
4. Push to the branch (`git push origin feature/AmazingFeature`) - Upload your changes
5. Open a Pull Request - Request to merge your changes into the main project

## License

   MIT License

   Copyright (c) 2025 Jelshen Febryand Valesco
   
   Permission is hereby granted, free of charge, to any person obtaining a copy
   of this software and associated documentation files (the "Software"), to deal
   in the Software without restriction, including without limitation the rights
   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   copies of the Software, and to permit persons to whom the Software is
   furnished to do so, subject to the following conditions:
   
   The above copyright notice and this permission notice shall be included in all
   copies or substantial portions of the Software.
   
   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   SOFTWARE.
