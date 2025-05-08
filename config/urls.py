"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

# Each app's unique views to differentiate between them
from notes.views import notes_views as noteviews
from notes.views import profile_views as profileviews

# Documentation for self:
# Separated the view from the API, views go under the views.py file
# API views go under the api_views.py file
urlpatterns = [
    path('admin/', admin.site.urls),

    # API for note-related stuff
    path('api/notes/', include('notes.urls')),

    # Main screen
    path('', noteviews.notes_view, name='notes'),

    # Profile screen
    path('profile/', profileviews.profile_view, name='profile'),
    path('profile/edit/', profileviews.profile_edit, name='profile_edit'),

    # Authentication URL
    path('auth/', include('users.urls')),
]
