from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.contrib import messages

@login_required(login_url='login')
def profile_view(request):
    return render(request, 'profile.html')

@login_required(login_url='login')
def profile_edit(request):
    if request.method == 'POST':
        # Get the user object from the request
        # Django automatically gives you the logged-in user
        user = request.user
        username = request.POST.get('username')
        email = request.POST.get('email')
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')

        # Set values to user object and commit to database
        user.username = username
        user.email = email
        user.first_name = first_name
        user.last_name = last_name

        user.save()

        messages.success(request, 'Profile updated successfully!')
        return redirect('notes')
    
    return render(request, 'profile_edit.html')