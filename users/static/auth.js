// Global Variables
const successIcon = 'success';
const errorIcon = 'error';
const registerUrl = '/auth/register/';
const loginUrl = '/auth/login/';

// Show alert using SweetAlert2
function showAlert(icon, title, text) {
    return Swal.fire({
        icon: icon,
        title: title,
        text: text,
    });
}

// Validate if password and confirm password match
function validatePassword(password, confirmPassword) {
    if (password !== confirmPassword) {
        showAlert(errorIcon, 'Password Mismatch', 'Passwords do not match. Please try again.');
        return false;
    }
    return true;
}

// Register form submission
function registerSubmit() {
    const password = $('#password').val();
    const confirmPassword = $('#confirm_password').val();

    if (!validatePassword(password, confirmPassword)) {
        return;
    }

    const formData = {
        'username': $('#username').val().toLowerCase(),
        'email': $('#email').val(),
        'first_name': $('#first_name').val(),
        'last_name': $('#last_name').val(),
        'password1': password,
        'password2': confirmPassword
    };

    $.ajax({
        url: registerUrl,
        type: 'POST',
        data: formData,
        success: function(response) {
            showAlert(successIcon, 'Registration Successful', response.message)
                .then(() => {
                    window.location.href = loginUrl; // Correct redirection
                });
        },
        error: function(xhr, errmsg, err) {
            let errorMessage = 'An error occurred.';
        
            if (xhr.responseJSON && xhr.responseJSON.message) {
                const errors = xhr.responseJSON.message;
                // Flatten the error messages
                errorMessage = Object.values(errors)
                    .flat()                // flatten arrays like ["error1", "error2"]
                    .join('\n');           // join them nicely
            }
        
            showAlert(errorIcon, 'Registration Failed', errorMessage);
        }
    });
}

$(document).ready(function() {
    $('#authForm').on('submit', function(event) {
        const title = $('#title').text().trim();
        console.log("Form Title:", title);

        if (title === "Register") {
            event.preventDefault(); // Only prevent default for Register
            console.log("Submitting registration...");
            registerSubmit();
        }
        // For Login, let the form submit naturally
    });
});
