from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from .models import DrywallDomain, FamilyDomain, CommunityDomain, OtherDomain
from .serializers import DrywallDomainSerializer, CommunityDomainSerializer, FamilyDomainSerializer, OtherDomainSerializer

@api_view(['GET'])
@permission_classes([AllowAny])
def getDrywallDomains(request):
    domains = DrywallDomain.objects.all()  # Fetch all Domain objects from the database
    serializer = DrywallDomainSerializer(domains, many=True)  # Serialize the queryset
    return Response(serializer.data)  # Return the serialized data as JSON response

@api_view(['GET'])
@permission_classes([AllowAny])
def getFamilyDomains(request):
    domains = FamilyDomain.objects.all()  # Fetch all Domain objects from the database
    serializer = FamilyDomainSerializer(domains, many=True)  # Serialize the queryset
    return Response(serializer.data)  # Return the serialized data as JSON response

@api_view(['GET'])
@permission_classes([AllowAny])
def getCommunityDomains(request):
    domains = CommunityDomain.objects.all()  # Fetch all Domain objects from the database
    serializer = CommunityDomainSerializer(domains, many=True)  # Serialize the queryset
    return Response(serializer.data)  # Return the serialized data as JSON response

@api_view(['GET'])
@permission_classes([AllowAny])
def getOtherDomains(request):
    domains = OtherDomain.objects.all()  # Fetch all Domain objects from the database
    serializer = OtherDomainSerializer(domains, many=True)  # Serialize the queryset
    return Response(serializer.data)  # Return the serialized data as JSON response