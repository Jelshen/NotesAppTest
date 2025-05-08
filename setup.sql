-- Create the database (if it doesn't exist)
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = N'Notes')
BEGIN
    CREATE DATABASE Notes;
END
GO

-- Switch to the new database
USE Notes;
GO

-- Create the NoteEntries table (required)
IF OBJECT_ID(N'dbo.NoteEntries', N'U') IS NULL
BEGIN
    CREATE TABLE dbo.NoteEntries (
        NoteId INT IDENTITY(1,1) PRIMARY KEY,
        NoteTitle NVARCHAR(100) NOT NULL,
        NoteContent NVARCHAR(MAX) NOT NULL,
        NoteDate DATETIME DEFAULT GETDATE(),
        UserId INT NOT NULL,
        FOREIGN KEY (UserId) REFERENCES auth_user(id) -- assumes default Django user table
    );
END
GO
