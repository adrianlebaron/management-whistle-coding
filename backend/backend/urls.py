# backend URL Configuration
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    # point to the api app and let it handle the traffic there
    path('api/', include('api.urls')),
    path('app/blog/', include('app.blog.urls')),
    path('app/domain/', include('app.domain.urls')),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)