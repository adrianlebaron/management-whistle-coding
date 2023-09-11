<<<<<<< HEAD
from rest_framework import serializers
from .models import Domain

class DomainSerializer(serializers.ModelSerializer):
    class Meta:
        model = Domain
        fields = ('domain_url', 'user',)  # Add other fields if necessary
=======
>>>>>>> 83850471d483a62e73d5c5bea90dafe3a272e3d9
