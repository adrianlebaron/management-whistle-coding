from django.urls import path
from . import views
from .views import RegisterNewUser
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('login/', obtain_auth_token, name='api_token_auth'),
    path('register/', RegisterNewUser.as_view()),
    path('put/', views.putUser),
    path('image/', views.uploadImage),
    path('userProfile/', views.getUserProfile),
    path('<int:pk>/', views.getSoloUser),
    path('getUsers/', views.getUsers),
]