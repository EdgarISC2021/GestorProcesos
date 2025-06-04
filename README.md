# Sistema Gestor de Procesos

## Descripción

Sistema de gestión de procesos empresariales enfocado en la administración rápida y eficiente de procesos dentro de una organización. Desarrollado como parte de un reto técnico utilizando tecnologías modernas de desarrollo web.

## Estado del Proyecto

🚧 **En desarrollo** - Actualmente completado entre 60% y 75% del total del ejercicio. El desarrollo continúa debido al interés en trabajar con estas nuevas tecnologías.

## Tecnologías Utilizadas

### Backend
- **Django** - Framework web de Python
- **Python** - Lenguaje de programación principal

### Frontend
- **React** - Biblioteca de JavaScript para interfaces de usuario
- **Material-UI** - Biblioteca de componentes React con diseño Material Design

### Base de Datos
- **MySQL** - Sistema de gestión de base de datos
- **Azure Database** - Base de datos hospedada en la nube de Microsoft Azure

## Características Implementadas

- ✅ Sistema de autenticación de usuarios
- ✅ API RESTful con Django
- ✅ Interfaz de usuario con React y Material-UI
- ✅ Integración con base de datos MySQL en Azure
- 🚧 Gestión completa de procesos (en desarrollo)

## Instalación y Configuración

### Prerrequisitos
- Python 3.8+
- Node.js 14+
- MySQL
- Git

### Backend (Django)
```bash
# Clonar el repositorio
git clone https://github.com/EdgarISC2021/GestorProcesos.git
cd GestorProcesos

# Crear entorno virtual
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate

# Instalar dependencias
pip install -r requirements.txt

# Configurar base de datos
python manage.py migrate

# Ejecutar servidor de desarrollo
python manage.py runserver
```

### Frontend (React)
```bash
# Navegar al directorio del frontend
cd frontend

# Instalar dependencias
npm install

# Ejecutar aplicación React
npm start
```

## Uso

### Acceso al Sistema

**URL de Login:** `http://127.0.0.1:8000/users/api/login/`

**Credenciales de prueba:**
- **Usuario:** Edgar
- **Contraseña:** 123

> ⚠️ **Nota:** La ruta de login aún no está configurada como página principal. Se está trabajando en la corrección de las rutas.

### URLs del Proyecto
- **Backend API:** `http://127.0.0.1:8000/`
- **Frontend:** `http://127.0.0.1:3000/`
- **Login:** `http://127.0.0.1:8000/users/api/login/`

## Estructura del Proyecto

```
GestorProcesos/
├── backend/
│   ├── manage.py
│   ├── requirements.txt
│   ├── gestor_procesos/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   └── apps/
│       ├── users/
│       └── processes/
├── frontend/
│   ├── package.json
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   └── public/
└── README.md
```

## Funcionalidades Planificadas

- [ ] Dashboard principal de procesos
- [ ] CRUD completo de procesos
- [ ] Asignación de procesos a usuarios
- [ ] Sistema de notificaciones
- [ ] Reportes y métricas
- [ ] Configuración de permisos por rol
- [ ] API documentada con Swagger

## Experiencia con Azure

El desarrollador cuenta con experiencia previa trabajando con Microsoft Azure, como se puede ver en el proyecto en producción:

🌐 **Proyecto en Azure:** [https://alifrutdigital.azurewebsites.net](https://alifrutdigital.azurewebsites.net)
**Credenciales de prueba:**
- **Usuario:** Edgar
- **Contraseña:** Bared664
## Configuración de Base de Datos

La base de datos MySQL está configurada para ejecutarse en Azure Database for MySQL, proporcionando:
- Alta disponibilidad
- Escalabilidad automática
- Backups automáticos
- Seguridad empresarial

## Contribuir

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit los cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abrir un Pull Request

## Próximos Pasos

- Completar la implementación del CRUD de procesos
- Corregir enrutamiento principal
- Implementar sistema de roles y permisos
- Añadir validaciones del lado del cliente
- Optimizar rendimiento de consultas
- Documentar API con Swagger/OpenAPI

## Tecnologías Aprendidas

Este proyecto ha sido una oportunidad para trabajar con tecnologías nuevas:
- Primera experiencia con Django para APIs
- Integración React + Material-UI
- Configuración de bases de datos en Azure
- Arquitectura de aplicaciones full-stack

## Contacto

- **Desarrollador:** Edgar ISC
- **GitHub:** [@EdgarISC2021](https://github.com/EdgarISC2021)



---

⚡ **Nota de Desarrollo:** Este proyecto continúa en desarrollo activo. Las contribuciones y sugerencias son bienvenidas.
