from django.urls import path
from . import views

urlpatterns = [
    path('get/', views.getBlogs),
    path('get/<int:pk>/', views.getSoloBlog),
    path('post/', views.postBlog),
    path('post-picture/',views.postPicture),
    path('put/<int:pk>/', views.putBlog),
    path('delete/<int:pk>/', views.deleteBlog),
]