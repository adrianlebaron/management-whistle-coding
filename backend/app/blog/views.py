# Create your views here.
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status

from .serializers import BlogSerializer
from .models import Blog

@api_view(['GET'])
@permission_classes([AllowAny])
def getBlogs(request):
    blog = Blog.objects.filter().order_by('-date')
    serializer = BlogSerializer(blog, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def getSoloBlog(request, pk):
    blog = Blog.objects.get(id=pk)
    serializer = BlogSerializer(blog, many=False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def postBlog(request):
    data = request.data
    file = request.FILES.get('video')
    blog = Blog.objects.create(
        user=request.user,
        body=data['body'],
        picture=data['picture'],
        video=file
    )
    serializer = BlogSerializer(blog, many=False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def postPicture(request):
    data=request.data
    file = request.FILES.get
    blog_id = data['blog_id']#pasa al body
    blog = Blog.objects.get(id=blog_id)
    blog.picture = file('picture')
    blog.save()
    return Response('Imagen suvida')

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def putBlog(request, pk):
    data = request.data
    blog = Blog.objects.get(id=pk)
    serializer = BlogSerializer(instance=blog, data=data)
    if blog.user == request.user:
        if serializer.is_valid():
            serializer.save()
    else:
        return Response({'Error': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteBlog(request, pk):
    blog = Blog.objects.get(id=pk)
    if blog.user == request.user:
        blog.delete()
        return Response('Blog Eliminado')
    else:
        return Response({'Error': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)