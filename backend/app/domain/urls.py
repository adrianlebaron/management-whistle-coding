from django.urls import path
from . import views

urlpatterns = [
    path('get-drywall-domains/', views.getDrywallDomains),
    path('get-family-domains/', views.getFamilyDomains),
    path('get-community-domains/', views.getCommunityDomains),
    path('get-other-domains/', views.getOtherDomains),
]