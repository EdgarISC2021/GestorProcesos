from solicitudes.models import solicitudesProcesos
from solicitudes.api.serializers import solicitudesSerealizers
from rest_framework import viewsets

class solicitudViewSet(viewsets.ModelViewSet):
    queryset = solicitudesProcesos.objects.all()
    serializer_class = solicitudesSerealizers
    
    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)
