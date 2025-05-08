from django.contrib.auth.decorators import login_required
from django.shortcuts import render

# Create your views here

# Main screen
@login_required(login_url='login')
def notes_view(request):
    user = request.user  # Django automatically gives you the logged-in user

    context = {
        'user_id': user.id,
        'username': user.username,
        'email': user.email,
    }
    
    return render(request, 'notes.html', context)
