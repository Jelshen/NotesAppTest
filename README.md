# Notes App

A Django-based web application for managing personal notes with user authentication and CRUD operations.

## Prerequisites

- [Visual Studio Code](https://code.visualstudio.com/)
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)
- [SQL Server Management Studio (SSMS)](https://learn.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms)
- [Python](https://www.python.org/downloads/) (3.x recommended)
- [ODBC Driver 17 for SQL Server](https://learn.microsoft.com/en-us/sql/connect/odbc/download-odbc-driver-for-sql-server)

## Installation

1. **Clone the repository**
   ```bash
   git clone [your-repository-url]
   cd NoteAppTest
   ```

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

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up the database**
   - Open SQL Server Management Studio (SSMS)
   - Connect to your SQL Server instance
   - Open and run `setup.sql` to create the database and tables
   - Verify that the `Notes` database and `NoteEntries` table are created

5. **Configure environment variables**
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

6. **Run migrations**
   ```bash
   python manage.py migrate
   ```

7. **Start the development server**
   ```bash
   python manage.py runserver
   ```

8. **Access the application**
   - Open your browser and go to `http://127.0.0.1:8000/`
   - Register a new account or login with existing credentials

## Project Structure

- `config/` - Django project settings
- `notes/` - Notes application
- `users/` - User authentication
- `static/` - Static files (CSS, JS)
- `templates/` - HTML templates

## API Endpoints

- `GET /api/notes/` - Get all notes
- `POST /api/notes/upsert/` - Create/update note
- `DELETE /api/notes/delete/<id>/` - Delete note

## Troubleshooting

1. **Database Connection Issues**
   - Verify SQL Server is running
   - Check credentials in `.env` file
   - Ensure ODBC Driver 17 is installed

2. **Package Installation Issues**
   - Make sure virtual environment is activated
   - Try updating pip: `python -m pip install --upgrade pip`

3. **Server Start Issues**
   - Check if port 8000 is available
   - Verify all environment variables are set

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

   MIT License

   Copyright (c) 2025 Jelshen

   Permission is hereby granted, free of charge, to any person obtaining a copy
   of this software and associated documentation files (the "Software"), to deal
   in the Software without restriction, including without limitation the rights
   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   copies of the Software, and to permit persons to whom the Software is
   furnished to do so, subject to the following conditions:

   The above copyright notice and this permission notice shall be included in all
   copies or substantial portions of the Software.
