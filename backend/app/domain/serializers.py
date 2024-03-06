from rest_framework import serializers
from .models import DrywallDomain, CommunityDomain, FamilyDomain, OtherDomain

class DrywallDomainSerializer(serializers.ModelSerializer):
    class Meta:
        model = DrywallDomain
        fields = ('domain_url', 'registrar',)  # Add other fields if necessary

class FamilyDomainSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommunityDomain
        fields = ('domain_url', 'registrar',)  # Add other fields if necessary

class CommunityDomainSerializer(serializers.ModelSerializer):
    class Meta:
        model = FamilyDomain
        fields = ('domain_url', 'registrar',)  # Add other fields if necessary


class OtherDomainSerializer(serializers.ModelSerializer):
    class Meta:
        model = OtherDomain
        fields = ('domain_url', 'registrar',)  # Add other fields if necessary