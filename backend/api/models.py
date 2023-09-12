from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Domain(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    domain_url =  models.CharField(max_length=250, null=True)