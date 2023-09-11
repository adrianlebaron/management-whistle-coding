<<<<<<< HEAD
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from .models import Domain
from .serializers import DomainSerializer  # Import your serializer

@api_view(['GET'])
@permission_classes([AllowAny])
def getDomains(request):
    domains = Domain.objects.all()  # Fetch all Domain objects from the database
    serializer = DomainSerializer(domains, many=True)  # Serialize the queryset
    return Response(serializer.data)  # Return the serialized data as JSON response
=======

>>>>>>> 83850471d483a62e73d5c5bea90dafe3a272e3d9
