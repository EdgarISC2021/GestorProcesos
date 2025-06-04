from django.db import models
from django.contrib.auth.models import User 
# Create your models here.


import uuid
from django.db import models
from django.utils import timezone
from django.contrib.auth import get_user_model

User = get_user_model()

class solicitudesProcesos(models.Model):
    ESTATUS_CHOICES = [
        ('Pendiente', 'Pendiente'),
        ('Aprobado', 'Aprobado'),
        ('Rechazado', 'Rechazado'),
        ('Completado', 'Completado'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    descripcion = models.TextField()
    tipo_area = models.CharField(max_length=50)
    responsable_seguimiento = models.CharField(max_length=150)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_estimacion = models.DateTimeField()
    estatus = models.CharField(max_length=50, choices=ESTATUS_CHOICES, default='Pendiente')
    folio = models.CharField(max_length=50, unique=True)
    fecha_aprobacion = models.DateTimeField(null=True, blank=True)
    retroalimentacion = models.TextField(blank=True)
    aprobado_por = models.CharField(max_length=150, blank=True)
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        if not self.folio:
            # Generate folio in format CCADPRC-XXXX
            last_folio = SolicitudProceso.objects.order_by('folio').last()
            last_number = int(last_folio.folio.split('-')[1]) if last_folio else 0
            self.folio = f"CCADPRC-{str(last_number + 1).zfill(4)}"
        
        # Set fecha_estimacion to 3 days after creation if not set
        if not self.fecha_estimacion and not self.pk:
            self.fecha_estimacion = timezone.now() + timezone.timedelta(days=3)
        
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.folio} - {self.estatus}"

class Procesos(models.Model):
    id_proceso = models.BigAutoField(auto_created=True, primary_key=True, serialize=False)
    nombre = models.CharField(max_length=150)
    descripcion =  models.CharField(max_length=255)
    id_solicitud = models.ForeignKey(solicitudesProcesos, on_delete=models.CASCADE)
    fecha_registro =  models.DateField()


