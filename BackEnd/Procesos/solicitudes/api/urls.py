from rest_framework.routers import DefaultRouter
from solicitudes.api.views import *




router = DefaultRouter() 
router.register('solicitudes', solicitudViewSet, basename='solicitudes')
urlpatterns = router.urls