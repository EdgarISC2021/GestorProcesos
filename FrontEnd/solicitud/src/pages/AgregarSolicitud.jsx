import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';  // Add this at the top with your other imports
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Alert,
  Snackbar,
  Card,
  CardContent,
  Divider
} from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import AddIcon from '@mui/icons-material/Add';

export default function NuevaSolicitud() {
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Estado del formulario
  const [formData, setFormData] = useState({
    descripcion: '',
    tipo_area: '',
    responsable_seguimiento: '',
    fecha_estimacion: '',
    prioridad: 'Media',
    observaciones: ''
  });

  // Estado para validaciones
  const [errors, setErrors] = useState({});

  // Opciones para los selects
  const tiposArea = [
    'Recursos Humanos',
    'Sistemas',
    'Contabilidad',
    'Operaciones',
    'Mantenimiento',
    'Compras',
    'Ventas',
    'Marketing'
  ];

  const responsables = [
    'Juan Pérez',
    'María García',
    'Carlos López',
    'Ana Martínez',
    'Pedro Rodríguez',
    'Laura Hernández',
    'Miguel Torres',
    'Carmen Ruiz'
  ];

  const prioridades = [
    { value: 'Alta', label: 'Alta', color: 'error' },
    { value: 'Media', label: 'Media', color: 'warning' },
    { value: 'Baja', label: 'Baja', color: 'info' }
  ];

  // Manejo de cambios en el formulario
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error si existe
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validación del formulario
  const validateForm = () => {
    const newErrors = {};

    if (!formData.descripcion.trim()) {
      newErrors.descripcion = 'La descripción es requerida';
    }

    if (!formData.tipo_area) {
      newErrors.tipo_area = 'El tipo de área es requerido';
    }

    if (!formData.responsable_seguimiento) {
      newErrors.responsable_seguimiento = 'El responsable es requerido';
    }

    if (!formData.fecha_estimacion) {
      newErrors.fecha_estimacion = 'La fecha de estimación es requerida';
    } else {
      const fechaEstimacion = new Date(formData.fecha_estimacion);
      const fechaActual = new Date();
      fechaActual.setHours(0, 0, 0, 0);
      
      if (fechaEstimacion < fechaActual) {
        newErrors.fecha_estimacion = 'La fecha no puede ser anterior a hoy';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
const createSolicitud = async (solicitudData) => {
  const token = localStorage.getItem('authToken');
  const response = await axios.post('http://127.0.0.1:8000/api/solicitudes/', solicitudData, {
    headers: {
      'Authorization': `Token ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return response.data;
};
  // Envío del formulario
const handleSubmit = async (event) => {
   event.preventDefault();
  
  if (!validateForm()) {
    setSnackbarMessage('Por favor, corrija los errores en el formulario');
    setSnackbarSeverity('error');
    setOpenSnackbar(true);
    return;
  }

  try {
    // Format data properly for Django with default values for required fields
    const datosEnviar = {
      ...formData,
      fecha_estimacion: new Date(formData.fecha_estimacion).toISOString().split('T')[0],
      estatus: 'Pendiente', // Default status
      folio: 'TEMP-' + Date.now(), // Temporary folio
      fecha_aprobación: '', // Null for not approved yet
      retroalimentacion: '', // Empty feedback
      aprobado_por: '-', // Empty for not approved yet
      usuario: 1 // You need to get this from your auth system
    };

    const response = await createSolicitud(datosEnviar);
    
    console.log('Solicitud creada:', response);
    
    setSnackbarMessage('Solicitud creada exitosamente');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
    
    setTimeout(() => {
      navigate('/solicitudes');
    }, 1500);
    
  } catch (error) {
    console.error('Error completo:', error.response?.data || error.message);
    setSnackbarMessage(error.response?.data?.detail || 
      Object.values(error.response?.data || {}).join(', ') || 
      'Error al crear la solicitud');
    setSnackbarSeverity('error');
    setOpenSnackbar(true);
  }
};
  // Limpiar formulario
  const handleReset = () => {
    setFormData({
      descripcion: '',
      tipo_area: '',
      responsable_seguimiento: '',
      fecha_estimacion: '',
      prioridad: 'Media',
      observaciones: ''
    });
    setErrors({});
  };

  return (
    <>
      <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <AddIcon /> Nueva Solicitud
      </Typography>
      
      <Card elevation={3}>
        <CardContent>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Grid container spacing={3}>
              
              {/* Descripción */}
              <Grid item xs={12}>
                <TextField
                  name="descripcion"
                  label="Descripción de la Solicitud"
                  multiline
                  rows={4}
                  fullWidth
                  required
                  value={formData.descripcion}
                  onChange={handleChange}
                  error={!!errors.descripcion}
                  helperText={errors.descripcion}
                  placeholder="Describe detalladamente tu solicitud..."
                />
              </Grid>

              {/* Tipo de Área */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required error={!!errors.tipo_area}>
                  <InputLabel>Tipo de Área</InputLabel>
                  <Select
                    name="tipo_area"
                    value={formData.tipo_area}
                    label="Tipo de Área"
                    onChange={handleChange}
                  >
                    {tiposArea.map((tipo) => (
                      <MenuItem key={tipo} value={tipo}>
                        {tipo}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.tipo_area && (
                    <Typography variant="caption" color="error" sx={{ mt: 1, ml: 2 }}>
                      {errors.tipo_area}
                    </Typography>
                  )}
                </FormControl>
              </Grid>

              {/* Responsable */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required error={!!errors.responsable_seguimiento}>
                  <InputLabel>Responsable de Seguimiento</InputLabel>
                  <Select
                    name="responsable_seguimiento"
                    value={formData.responsable_seguimiento}
                    label="Responsable de Seguimiento"
                    onChange={handleChange}
                  >
                    {responsables.map((responsable) => (
                      <MenuItem key={responsable} value={responsable}>
                        {responsable}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.responsable_seguimiento && (
                    <Typography variant="caption" color="error" sx={{ mt: 1, ml: 2 }}>
                      {errors.responsable_seguimiento}
                    </Typography>
                  )}
                </FormControl>
              </Grid>

              {/* Fecha de Estimación */}
              <Grid item xs={12} md={6}>
                <TextField
                  name="fecha_estimacion"
                  label="Fecha de Estimación"
                  type="date"
                  fullWidth
                  required
                  value={formData.fecha_estimacion}
                  onChange={handleChange}
                  error={!!errors.fecha_estimacion}
                  helperText={errors.fecha_estimacion}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              {/* Prioridad */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Prioridad</InputLabel>
                  <Select
                    name="prioridad"
                    value={formData.prioridad}
                    label="Prioridad"
                    onChange={handleChange}
                  >
                    {prioridades.map((prioridad) => (
                      <MenuItem key={prioridad.value} value={prioridad.value}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Box
                            sx={{
                              width: 12,
                              height: 12,
                              borderRadius: '50%',
                              bgcolor: `${prioridad.color}.main`
                            }}
                          />
                          {prioridad.label}
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Observaciones */}
              <Grid item xs={12}>
                <TextField
                  name="observaciones"
                  label="Observaciones Adicionales"
                  multiline
                  rows={3}
                  fullWidth
                  value={formData.observaciones}
                  onChange={handleChange}
                  placeholder="Agrega cualquier información adicional relevante..."
                />
              </Grid>

              {/* Divider */}
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
              </Grid>

              {/* Botones de acción */}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleReset}
                    startIcon={<CancelIcon />}
                  >
                    Limpiar
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/solicitudes')}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon />}
                  >
                    Crear Solicitud
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>

      {/* Snackbar para notificaciones */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setOpenSnackbar(false)} 
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
