from django.contrib import admin
from .models import *

# Register your models here.
class AdminDomain(admin.ModelAdmin):
    list_display = ('domain_url', 'user')
    list_display_links = ('domain_url', 'user')

admin.site.register(Domain, AdminDomain)
