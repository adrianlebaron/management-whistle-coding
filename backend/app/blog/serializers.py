from rest_framework import serializers
from .models import Blog

class BlogSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source='user.user_name', read_only=True)

    class Meta:
        model = Blog
        fields = '__all__'