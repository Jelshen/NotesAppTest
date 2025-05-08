from django.urls import path
from django.contrib.auth import views as auth_views
from . import views  # for register

urlpatterns = [
    path('login/', auth_views.LoginView.as_view(
            template_name='auth.html',
            extra_context={'title': 'Login'}
        ), name='login'),
    path('logout/', auth_views.LogoutView.as_view(
            next_page='login'  # redirects to login after logout
        ), name='logout'),
    path('register/', views.register, name='register'),
]
