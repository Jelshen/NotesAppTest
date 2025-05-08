from django.db import models
from django.contrib.auth.models import User

class Note(models.Model):
    NoteId = models.AutoField(primary_key=True)  # Auto-incrementing primary key
    NoteTitle = models.CharField(max_length=100)
    NoteContent = models.TextField()
    NoteDate = models.DateTimeField()
    UserId = models.ForeignKey(User, on_delete=models.CASCADE, db_column='UserId')

    class Meta:
        db_table = 'NoteEntries'  # Match this with the table name in database

    def __str__(self):
        return self.NoteTitle
