// Function to handle AJAX profile submission
function handleProfileSubmit(event) {
    event.preventDefault(); // Prevent the default form submission

    const form = $('#profileForm');
    const formData = form.serialize(); // Serialize form data for AJAX
    console.log(formData);

    $.ajax({
        url: form.attr('action'),
        method: 'POST',
        data: formData,
        success: function(response) {
            Swal.fire({
                icon: 'success',
                title: 'Changes Saved!',
                text: 'Your profile was successfully updated.',
                confirmButtonText: 'OK',
                confirmButtonColor: '#2269d3'
            }).then(result => {
                if (result.isConfirmed) {
                    window.location.href = notesUrl; // Redirect after confirmation
                }
            });
        },
        error: function(xhr) {
            let errorMsg = 'Something went wrong.';
            if (xhr.responseJSON && xhr.responseJSON.message) {
                errorMsg = xhr.responseJSON.message;
            }

            Swal.fire({
                icon: 'error',
                title: 'Update Failed',
                text: errorMsg
            });
        }
    });
}

$(document).ready(function() {
    $('#profileForm').on('submit', handleProfileSubmit);
});
