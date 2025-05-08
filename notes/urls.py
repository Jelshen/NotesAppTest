from django.urls import path
from django.shortcuts import render
from notes.api import notes_api

urlpatterns = [
    path('', notes_api.get_notes, name='get_notes'),
    path('upsert/', notes_api.upsert_note, name='upsert_note'),
    path('delete/<int:note_id>/', notes_api.delete_note, name='delete_note'),
]
