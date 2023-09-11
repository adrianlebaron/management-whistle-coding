from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from . import views

urlpatterns = [
    path('login/', obtain_auth_token, name='api_token_auth'),
<<<<<<< HEAD
    path('get-domains/', views.getDomains),
=======
>>>>>>> 83850471d483a62e73d5c5bea90dafe3a272e3d9
]
