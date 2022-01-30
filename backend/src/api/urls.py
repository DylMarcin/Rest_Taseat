from django.urls import path, include
from rest_framework import routers
from .views import RestaurantView

from django.conf.urls.static import static
from django.conf import settings

router = routers.DefaultRouter()
router.register('restaurants', RestaurantView, basename='restaurants')


urlpatterns = [
    path('', include(router.urls))
]

urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)