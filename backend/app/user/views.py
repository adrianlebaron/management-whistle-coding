from rest_framework import serializers
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password  
from rest_framework import status, permissions
from rest_framework.views import APIView

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import User
from .serializers import  UserSerializer, UserSerializerWithToken

class RegisterNewUser(APIView):
    permission_classes=[permissions.AllowAny]
    def post(self,request,format=None):
        data = self.request.data
        try:
            user = User.objects.create(
                user_name=data['user_name'],
                email=data['email'],
                password=make_password(data['password'])#encripta o protege la contrasena
            )
            serializer = UserSerializerWithToken(user, many=False)
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        except KeyError:
            message = {'detail': 'Masing required fields'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            message = {'detail':str(e)}
            return Response(message,status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def putUser(request):
    user = request.user
    serializer = UserSerializerWithToken(user, many=False)
    data = request.data
    user.user_name = data['user_name']
    user.bio = data['bio']
    user.email = data['email']
    if data['password'] != '':
        user.password = make_password(data['password'])
    user.save()
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def uploadImage(request):
    data = request.data
    user_id = data['user_id']
    user = User.objects.get(id=user_id)
    user.image = request.FILES.get('image')
    user.save()
    return Response('Imagen subida!')


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getSoloUser(request, pk):
    user = User.objects.get(id=pk)
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)