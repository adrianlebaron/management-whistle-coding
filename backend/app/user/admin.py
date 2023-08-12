from django.contrib import admin
from app.user.models import User

# Register your models here.

class AdminUser(admin.ModelAdmin):
    list_display  = ('id', 'email',)
    list_display_links = ('id', 'email',)
    # list_filter = ('user',)
    search_fields = ('user',)
    list_per_page = 25

admin.site.register(User, AdminUser)
