let notesData = [];

function fetchNotes() {
    return $.get("/api/notes/", function(data) {
        notesData = data.notes;
        renderNotes(notesData);
    });
}

function upsertNote(note) {
    $.ajax({
        url: "/api/notes/upsert/",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(note),
        success: function(res) {
            Swal.fire({
                icon: 'success',
                title: 'Saved!',
                text: 'Your note has been saved.',
                confirmButtonColor: '#2269d3',
                showConfirmButton: true
            });

            fetchNotes(); // Refresh notes
        },
        error: function(err) {
            console.log(note)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `Something went wrong!\n${err.responseJSON?.error || 'No specific error provided.'}`
            });
        }
    });
}

function renderNotes(data) {
    console.log(data);
    
    data.sort((a, b) => new Date(b.NoteDate) - new Date(a.NoteDate));

    const container = $("#notesContainer");
    container.empty(); // Clear current cards

    data.forEach(note => {
        container.append(`
            <div class="col-sm-6 col-md-4 col-lg-3 mb-4">
                <div class="card h-100 shadow-sm">
                    <div class="card-body d-flex flex-column">
                        <div class="d-flex justify-content-between align-items-center">
                            <h5 class="card-title text-primary mb-0">${note.NoteTitle}</h5>
                            <!-- Icons beside the title -->
                            <div>
                                <span class="icon-action" onclick="editNote(${note.NoteId})">
                                    <i class="fas fa-pencil-alt"></i> <!-- Pencil icon -->
                                </span>
                                <span class="icon-action ms-2" onclick="deleteNote(${note.NoteId})">
                                    <i class="fas fa-trash-alt"></i> <!-- Trash icon -->
                                </span>
                            </div>
                        </div>
                        <p class="card-text flex-grow-1">${note.NoteContent}</p>
                        <p class="text-muted small mt-2">
                            ${new Date(note.NoteDate).toLocaleDateString('en-GB', 
                                {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric'
                                }
                            )}
                        </p>
                    </div>
                </div>
            </div>
        `);
    });

    // Reinitialize Masonry after adding new content
    container.masonry('reloadItems').masonry();
}

function addNewNote(note = null) {
    $('#noteModalLabel').text('Add Note');
    // Reset form fields
    $('#noteForm')[0].reset();
    $('#noteId').val('');
    $('#noteDate').val(new Date().toISOString().split('T')[0]);

    const modal = new bootstrap.Modal(document.getElementById('noteModal'));
    modal.show();
}

function editNote(noteId) {
    // Find the note by ID
    const note = notesData.find(n => n.NoteId === noteId);

    $('#noteModalLabel').text('Edit Note');
    $('#noteForm')[0].reset(); // Reset form fields

    // Populate form fields with note data
    $('#noteId').val(note.NoteId);
    $('#noteTitle').val(note.NoteTitle);
    $('#noteContent').val(note.NoteContent);
    $('#noteDate').val(new Date(note.NoteDate).toISOString().split('T')[0]);

    const modal = new bootstrap.Modal(document.getElementById('noteModal'));
    modal.show();
}

function deleteNote(noteId) {
    const note = notesData.find(n => n.NoteId === noteId);

    // Sweet Alert for confirmation popup
    Swal.fire({
        title: 'Are you sure?',
        text: `You are about to delete note ${note.NoteTitle}. This action cannot be undone.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#2269d3', // Customize confirm button color
        cancelButtonColor: '#d33', // Customize cancel button color
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: `/api/notes/delete/${noteId}/`, // Use the note ID in the URL
                method: "DELETE", // Use DELETE method
                success: function(res) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Deleted!',
                        text: `Note ${note.NoteTitle} has been deleted.`,
                        confirmButtonColor: '#2269d3',
                        showConfirmButton: true
                    });

                    fetchNotes(); // Refresh notes after deletion
                },
                error: function(err) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: `Something went wrong!\n${err.responseJSON?.error || 'No specific error provided.'}`,
                        confirmButtonColor: '#2269d3'
                    });
                }
            });
        }
    });
}

// Hook form submit to upsert
$('#noteForm').on('submit', function (e) {
    e.preventDefault();

    const note = {
        NoteId: $('#noteId').val() || null,
        NoteTitle: $('#noteTitle').val(),
        NoteContent: $('#noteContent').val(),
        NoteDate: $('#noteDate').val()
    };

    console.log(note);
    upsertNote(note); // call your API
    bootstrap.Modal.getInstance(document.getElementById('noteModal')).hide();
});


$(document).ready(function() {
    fetchNotes(); // Fetch and display notes
});
