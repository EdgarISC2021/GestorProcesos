import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSolicitudes, updateSolicitudStatus } from "../assets/api/solicitudes";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  TablePagination,
  TableSortLabel,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Tooltip,
  IconButton,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Snackbar,
  Alert
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import FilterListIcon from '@mui/icons-material/FilterList';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import SearchIcon from '@mui/icons-material/Search';

const statusOptions = [
  { value: 'Pendiente', label: 'Pendiente', color: 'warning' },
  { value: 'En revisión', label: 'En revisión', color: 'info' },
  { value: 'Aprobado', label: 'Aprobado', color: 'success' },
  { value: 'Rechazado', label: 'Rechazado', color: 'error' },
  { value: 'Completado', label: 'Completado', color: 'primary' },
];

export default function Solicitudes() {
  const navigate = useNavigate();
  const [solicitudes, setSolicitudes] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('fecha_creacion');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedSolicitud, setSelectedSolicitud] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const loadSolicitudes = async () => {
    try {
      const response = await getSolicitudes();
      setSolicitudes(response.data);
    } catch (error) {
      console.error("Error al cargar solicitudes:", error);
      showSnackbar('Error al cargar solicitudes', 'error');
    }
  };

  useEffect(() => {
    loadSolicitudes();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  const getComparator = (order, orderBy) => {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  const handleOpenDialog = (solicitud) => {
    setSelectedSolicitud(solicitud);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleStatusChange = async (newStatus) => {
    try {
      await updateSolicitudStatus(selectedSolicitud.id_solicitud, newStatus);
      loadSolicitudes();
      showSnackbar(`Estado actualizado a ${newStatus}`, 'success');
      handleCloseDialog();
    } catch (error) {
      console.error("Error al actualizar estado:", error);
      showSnackbar('Error al actualizar estado', 'error');
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const filteredSolicitudes = solicitudes.filter(solicitud => {
    const matchesSearch = 
      solicitud.folio?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      solicitud.descripcion?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      solicitud.responsable_seguimiento?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'Todos' || solicitud.estatus === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const speedDialActions = [
    { icon: <AddIcon />, name: 'Nueva solicitud', action: () => navigate('/solicitudes/nueva') },
    { icon: <FilterListIcon />, name: 'Filtrar', action: () => {/* Implementar filtros */} },
    { icon: <RefreshIcon />, name: 'Actualizar', action: loadSolicitudes },
  ];

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">
          Panel de Solicitudes
        </Typography>
        <Box>
          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
            onClick={() => navigate('/agregarSolicitud')}
            sx={{ mr: 2 }}
          >
            Nueva Solicitud
          </Button>
          <Button 
            variant="outlined" 
            startIcon={<RefreshIcon />}
            onClick={loadSolicitudes}
          >
            Actualizar
          </Button>
        </Box>
      </Box>

      <Paper elevation={0} sx={{ p: 2, mb: 3, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="subtitle1" color="text.secondary">
            Mostrando {filteredSolicitudes.length} solicitudes
          </Typography>
          <Box>
            <TextField
              select
              size="small"
              label="Filtrar por estado"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              sx={{ width: 180, mr: 2 }}
            >
              <MenuItem value="Todos">Todos</MenuItem>
              {statusOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              size="small"
              placeholder="Buscar..."
              variant="outlined"
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'action.active' }} />,
              }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ width: 300 }}
            />
          </Box>
        </Box>
        
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'folio'}
                    direction={orderBy === 'folio' ? order : 'asc'}
                    onClick={() => handleRequestSort('folio')}
                  >
                    Folio
                  </TableSortLabel>
                </TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Tipo Área</TableCell>
                <TableCell>Responsable</TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'fecha_creacion'}
                    direction={orderBy === 'fecha_creacion' ? order : 'asc'}
                    onClick={() => handleRequestSort('fecha_creacion')}
                  >
                    Fecha Creación
                  </TableSortLabel>
                </TableCell>
                <TableCell>Fecha Estimación</TableCell>
                <TableCell>Estatus</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stableSort(filteredSolicitudes, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((solicitud) => (
                  <TableRow 
                    key={solicitud.id_solicitud}
                    hover
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>
                      <Typography fontWeight="bold">
                        {solicitud.folio || '-'}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ maxWidth: 250 }}>
                      <Tooltip title={solicitud.descripcion || '-'}>
                        <Typography noWrap>
                          {solicitud.descripcion || '-'}
                        </Typography>
                      </Tooltip>
                    </TableCell>
                    <TableCell>{solicitud.tipo_area || '-'}</TableCell>
                    <TableCell>{solicitud.responsable_seguimiento || '-'}</TableCell>
                    <TableCell>{formatDate(solicitud.fecha_creacion)}</TableCell>
                    <TableCell>{formatDate(solicitud.fecha_estimacion)}</TableCell>
                    <TableCell>
                      <Chip
                        label={solicitud.estatus || 'Pendiente'}
                        color={
                          solicitud.estatus === 'Aprobado' ? 'success' :
                          solicitud.estatus === 'Rechazado' ? 'error' :
                          solicitud.estatus === 'En revisión' ? 'info' : 'warning'
                        }
                        size="small"
                      />
                    </TableCell>
                    
                  </TableRow>
                ))}
              {filteredSolicitudes.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                    <Typography color="text.secondary">
                      No se encontraron solicitudes
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={filteredSolicitudes.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Filas por página:"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
        />
      </Paper>

      <SpeedDial
        ariaLabel="Acciones rápidas"
        sx={{ position: 'fixed', bottom: 32, right: 32 }}
        icon={<SpeedDialIcon />}
      >
        {speedDialActions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.action}
          />
        ))}
      </SpeedDial>

     
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}