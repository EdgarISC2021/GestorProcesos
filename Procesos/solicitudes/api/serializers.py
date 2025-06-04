from rest_framework import serializers
from solicitudes.models import solicitudesProcesos



class solicitudesSerealizers(serializers.ModelSerializer):
    class Meta:
        model =  solicitudesProcesos
        fields = '__all__'