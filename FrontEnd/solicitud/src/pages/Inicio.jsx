// src/pages/Inicio.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSolicitudes } from "../assets/api/solicitudes";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Paper,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

export default function Inicio() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalSolicitudes: 0,
    pendientes: 0,
    aprobadas: 0,
    rechazadas: 0
  });
  const [recentSolicitudes, setRecentSolicitudes] = useState([]);

  // Cargar datos reales desde la API
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setLoading(true);
        const response = await getSolicitudes();
        
        // Verificar el formato de la respuesta
        console.log('Respuesta de la API:', response);
        
        // Extraer el array de solicitudes según el formato de tu API
        let solicitudes = [];
        if (Array.isArray(response)) {
          solicitudes = response;
        } else if (response && Array.isArray(response.data)) {
          solicitudes = response.data;
        } else if (response && Array.isArray(response.solicitudes)) {
          solicitudes = response.solicitudes;
        } else {
          console.error('Formato de respuesta inesperado:', response);
          throw new Error('Formato de respuesta no válido');
        }
        
        // Calcular estadísticas
        const totalSolicitudes = solicitudes.length;
        const pendientes = solicitudes.filter(s => s.estatus === 'Pendiente').length;
        const aprobadas = solicitudes.filter(s => s.estatus === 'Aprobado').length;
        const rechazadas = solicitudes.filter(s => s.estatus === 'Rechazado').length;
        
        setStats({
          totalSolicitudes,
          pendientes,
          aprobadas,
          rechazadas
        });

        // Obtener las 5 solicitudes más recientes
        const solicitudesRecientes = solicitudes
          .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
          .slice(0, 5);
        
        setRecentSolicitudes(solicitudesRecientes);
      } catch (err) {
        console.error('Error al cargar solicitudes:', err);
        setError('Error al cargar las solicitudes');
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Aprobado':
        return 'success';
      case 'Rechazado':
        return 'error';
      case 'Pendiente':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Aprobado':
        return <CheckCircleIcon />;
      case 'Rechazado':
        return <ErrorIcon />;
      case 'Pendiente':
        return <PendingActionsIcon />;
      default:
        return <PendingActionsIcon />;
    }
  };

  // Mostrar estado de carga
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography>Cargando datos...</Typography>
      </Box>
    );
  }

  // Mostrar error si existe
  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <>
      {/* Saludo y bienvenida */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
          ¡Bienvenido al Sistema de Solicitudes!
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Gestiona y supervisa todas tus solicitudes desde un solo lugar
        </Typography>
      </Box>

      {/* Tarjetas de estadísticas */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: '#e3f2fd', height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="h6">
                    Total Solicitudes
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                    {stats.totalSolicitudes}
                  </Typography>
                </Box>
                <Avatar sx={{ backgroundColor: '#1976d2', width: 56, height: 56 }}>
                  <AssignmentIcon fontSize="large" />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: '#fff3e0', height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="h6">
                    Pendientes
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#f57c00' }}>
                    {stats.pendientes}
                  </Typography>
                </Box>
                <Avatar sx={{ backgroundColor: '#f57c00', width: 56, height: 56 }}>
                  <PendingActionsIcon fontSize="large" />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: '#e8f5e8', height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="h6">
                    Aprobadas
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#388e3c' }}>
                    {stats.aprobadas}
                  </Typography>
                </Box>
                <Avatar sx={{ backgroundColor: '#388e3c', width: 56, height: 56 }}>
                  <CheckCircleIcon fontSize="large" />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: '#ffebee', height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="h6">
                    Rechazadas
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#d32f2f' }}>
                    {stats.rechazadas}
                  </Typography>
                </Box>
                <Avatar sx={{ backgroundColor: '#d32f2f', width: 56, height: 56 }}>
                  <ErrorIcon fontSize="large" />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Acciones rápidas */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                Acciones Rápidas
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    fullWidth
                    size="large"
                    onClick={() => navigate('/agregarSolicitud')}
                    sx={{ mb: 2, py: 1.5 }}
                  >
                    Nueva Solicitud
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    startIcon={<AssignmentIcon />}
                    fullWidth
                    size="large"
                    onClick={() => navigate('/solicitudes')}
                    sx={{ mb: 2, py: 1.5 }}
                  >
                    Ver Todas las Solicitudes
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    startIcon={<TrendingUpIcon />}
                    fullWidth
                    size="large"
                    onClick={() => navigate('/reportes')}
                    sx={{ py: 1.5 }}
                  >
                    Ver Reportes
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Solicitudes recientes */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                Solicitudes Recientes
              </Typography>
              {recentSolicitudes.length === 0 ? (
                <Typography color="textSecondary" sx={{ textAlign: 'center', py: 4 }}>
                  No hay solicitudes recientes
                </Typography>
              ) : (
                <List>
                  {recentSolicitudes.map((solicitud) => (
                    <ListItem key={solicitud.id} divider>
                      <ListItemAvatar>
                        <Avatar sx={{ 
                          backgroundColor: 'transparent', 
                          color: getStatusColor(solicitud.estatus) === 'success' ? '#388e3c' : 
                                 getStatusColor(solicitud.estatus) === 'error' ? '#d32f2f' : '#f57c00' 
                        }}>
                          {getStatusIcon(solicitud.estatus)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                              {solicitud.folio}
                            </Typography>
                            <Chip 
                              label={solicitud.estatus} 
                              color={getStatusColor(solicitud.estatus)}
                              size="small"
                              variant="outlined"
                            />
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Typography variant="body2" color="textSecondary">
                              {solicitud.descripcion}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                              {new Date(solicitud.fecha_creacion).toLocaleDateString('es-ES')}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              )}
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Button 
                  variant="text" 
                  onClick={() => navigate('/solicitudes')}
                  endIcon={<AssignmentIcon />}
                >
                  Ver todas las solicitudes
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Información adicional */}
      <Box sx={{ mt: 4 }}>
        <Paper sx={{ p: 3, backgroundColor: '#f8f9fa', border: '1px solid #e9ecef' }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#495057' }}>
            💡 Consejos del Sistema
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
            • Puedes filtrar y ordenar tus solicitudes por fecha, estatus y tipo
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
            • Usa los reportes para obtener estadísticas detalladas de tu gestión
          </Typography>
          <Typography variant="body2" color="textSecondary">
            • Configura notificaciones para mantenerte al día con el progreso de tus solicitudes
          </Typography>
        </Paper>
      </Box>
    </>
  );
}