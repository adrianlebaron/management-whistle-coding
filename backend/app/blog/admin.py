from django.contrib import admin
from .models import Blog
# Register your models here.
class AdminBlog(admin.ModelAdmin):
    list_display  = ('id','body', 'date')
    list_display_links = ('id',)
    list_editable = ('body',)
    search_fields = ('body',)
    list_per_page = 25

admin.site.register(Blog, AdminBlog)