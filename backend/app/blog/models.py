from django.db import models
from django.contrib.auth.models import User

class Blog(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    title = models.CharField(max_length=250, null=True)
    body = models.CharField(max_length=250)
    date = models.DateTimeField(auto_now_add=True)
    picture = models.ImageField(null=True, blank=True)
