# rest_framework imports
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

# Miscellaneous imports
from ..models import Note
from ..serializers import NoteSerializer
from django.views.decorators.csrf import csrf_exempt

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_notes(request):
    notes = Note.objects.filter(UserId=request.user).order_by('NoteDate')
    serializer = NoteSerializer(notes, many=True)
    return Response({"notes": serializer.data}, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upsert_note(request):
    data = request.data
    note_id = data.get('NoteId')

    if note_id:
        try:
            # Checks if the note belongs to the logged-in user
            note = Note.objects.get(NoteId=note_id, UserId=request.user)  
        except Note.DoesNotExist:
            return Response({"error": "Note not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = NoteSerializer(note, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Note updated successfully", "NoteId": note.NoteId})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Creating a new note
    serializer = NoteSerializer(data=data)
    if serializer.is_valid():
        # Assign logged-in user
        note = serializer.save(UserId=request.user)  
        return Response({"message": "Note created successfully", "NoteId": note.NoteId}, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_note(request, note_id):
    try:
        note = Note.objects.get(NoteId=note_id, UserId=request.user)  # Make sure user owns it
    except Note.DoesNotExist:
        return Response({"error": "Note not found"}, status=status.HTTP_404_NOT_FOUND)

    note.delete()
    return Response({"message": "Note deleted successfully"}, status=status.HTTP_200_OK)
