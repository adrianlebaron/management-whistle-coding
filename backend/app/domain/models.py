from django.db import models

# Create your models here.
class DrywallDomain(models.Model):
    domain_url =  models.CharField(max_length=250, null=True)
    registrar = models.CharField(max_length=250, null=True)

class FamilyDomain(models.Model):
    domain_url =  models.CharField(max_length=250, null=True)
    registrar = models.CharField(max_length=250, null=True)

class CommunityDomain(models.Model):
    domain_url =  models.CharField(max_length=250, null=True)
    registrar = models.CharField(max_length=250, null=True)

class OtherDomain(models.Model):
    domain_url =  models.CharField(max_length=250, null=True)
    registrar = models.CharField(max_length=250, null=True)