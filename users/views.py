from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login
from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib import messages

# Create your views here.

# Registration view
def register(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        
        first_name = request.POST['first_name']
        last_name = request.POST['last_name']
        email = request.POST['email']

        if form.is_valid():
            if User.objects.filter(email=email).exists():
                return JsonResponse({
                    'status': 'error',
                    'message': {
                        'email': ['Email already in use.']
                    }
                }, status=400)

            user = form.save(commit=False)  # Create user object but don't save to DB yet
            user.first_name = first_name  # Assign first name manually
            user.last_name = last_name
            user.email = email              # Assign email manually
            print(user)
            user.save()         

            # Return success response
            return JsonResponse({
                'status': 'success',
                'message': 'User created successfully. Redirecting to login page...'
            })
        else:
            # Return validation errors as JSON response
            return JsonResponse({
                'status': 'error',
                'message': form.errors
            }, status=400)

    # If the method is not POST, render the registration form
    else:
        form = UserCreationForm()

    return render(request, 'auth.html', {
        'form': form,
        'title': 'Register'
    })

