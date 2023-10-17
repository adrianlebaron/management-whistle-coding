from django.contrib import admin
from .models import DrywallDomain, CommunityDomain, FamilyDomain, OtherDomain

# Register your models here.
class AdminDrywall(admin.ModelAdmin):
    list_display = ('domain_url',)
    list_display_links = ('domain_url',)    

class AdminCommunity(admin.ModelAdmin):
    list_display = ('domain_url',)
    list_display_links = ('domain_url',)    

class AdminFamily(admin.ModelAdmin):
    list_display = ('domain_url',)
    list_display_links = ('domain_url',)    

class AdminOther(admin.ModelAdmin):
    list_display = ('domain_url',)
    list_display_links = ('domain_url',)    

admin.site.register(DrywallDomain, AdminDrywall)
admin.site.register(CommunityDomain, AdminCommunity)
admin.site.register(FamilyDomain, AdminFamily)
admin.site.register(OtherDomain, AdminOther)
# Register your models here.