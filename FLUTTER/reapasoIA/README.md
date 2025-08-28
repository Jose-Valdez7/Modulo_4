# Sistema de Biblioteca Escolar

Sistema completo de gestión de biblioteca escolar con frontend en React y backend en Node.js/Express.

## 🚀 Características

### Frontend (React + TypeScript)
- **Interfaz moderna y responsiva** con Tailwind CSS
- **Autenticación JWT** con roles de usuario
- **Rutas protegidas** por rol (Bibliotecario/Estudiante)
- **Gestión de libros** con CRUD completo
- **Gestión de préstamos** con estados y validaciones
- **Dashboard** con estadísticas en tiempo real
- **Formularios validados** con React Hook Form y Yup

### Backend (Node.js + Express + Prisma)
- **API REST** completa con autenticación JWT
- **Base de datos PostgreSQL** con Prisma ORM
- **Validaciones robustas** con express-validator
- **Middleware de autorización** por roles
- **Documentación Swagger/OpenAPI** automática
- **Rate limiting** y seguridad con Helmet
- **Logging** con Morgan y Winston

## 🛠️ Tecnologías

### Frontend
- React 18 + TypeScript
- React Router DOM v6
- React Hook Form + Yup
- Tailwind CSS
- Lucide React (iconos)
- React Toastify (notificaciones)

### Backend
- Node.js + Express.js
- Prisma ORM + PostgreSQL
- JWT para autenticación
- bcryptjs para encriptación
- express-validator para validaciones
- Swagger/OpenAPI para documentación
- Helmet + CORS para seguridad

## 📋 Requisitos Previos

- **Node.js** 18+ y npm
- **PostgreSQL** 14+ instalado y ejecutándose
- **Git** para clonar el repositorio

## 🚀 Instalación y Configuración

### 1. Clonar y Preparar el Proyecto

```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd biblioteca-escolar

# Instalar dependencias del frontend y backend
npm run install-all
```

### 2. Configurar Base de Datos

```bash
# Crear base de datos PostgreSQL
createdb biblioteca_escolar

# Generar y ejecutar migraciones
npm run backend:generate
npm run backend:migrate

# Poblar con datos de prueba
npm run backend:seed
```

### 3. Configurar Variables de Entorno

Crear archivo `.env` en la carpeta `backend/`:

```env
# Base de datos
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/biblioteca_escolar"

# JWT
JWT_SECRET="tu_jwt_secret_super_seguro_aqui"
JWT_EXPIRES_IN="24h"

# Servidor
PORT=3001
NODE_ENV=development

# CORS
CORS_ORIGIN="http://localhost:3000"

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 4. Iniciar el Sistema

```bash
# Iniciar backend y frontend simultáneamente
npm run dev

# O iniciar por separado:
npm run backend:dev    # Backend en puerto 3001
npm run frontend:dev   # Frontend en puerto 3000
```

## 👥 Usuarios de Prueba

### Bibliotecario
- **Usuario:** `bibliotecario`
- **Contraseña:** `password123`
- **Acceso:** Todas las funcionalidades del sistema

### Estudiantes
- **Usuario:** `estudiante1` / `estudiante2`
- **Contraseña:** `password123`
- **Acceso:** Catálogo, mis préstamos, perfil

## 🌐 Acceso al Sistema

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:3001/api
- **Documentación Swagger:** http://localhost:3001/api-docs

## 📚 Funcionalidades por Rol

### 👨‍💼 Bibliotecario
- ✅ Gestión completa de usuarios
- ✅ Gestión completa de libros
- ✅ Gestión de préstamos
- ✅ Reportes y estadísticas
- ✅ Dashboard administrativo

### 👨‍🎓 Estudiante
- ✅ Ver catálogo de libros
- ✅ Ver mis préstamos
- ✅ Actualizar perfil
- ✅ Cambiar contraseña

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Inicia backend + frontend
npm run backend:dev      # Solo backend
npm run frontend:dev     # Solo frontend

# Base de datos
npm run backend:generate # Generar cliente Prisma
npm run backend:migrate  # Ejecutar migraciones
npm run backend:seed     # Poblar con datos de prueba

# Producción
npm run build            # Construir frontend
npm start                # Iniciar sistema completo
```

## 📁 Estructura del Proyecto

```
biblioteca-escolar/
├── backend/                 # Backend Node.js/Express
│   ├── src/
│   │   ├── controllers/    # Controladores de la API
│   │   ├── services/       # Lógica de negocio
│   │   ├── repositories/   # Acceso a datos
│   │   ├── routes/         # Definición de rutas
│   │   ├── middleware/     # Middleware personalizado
│   │   ├── validators/     # Validaciones de entrada
│   │   ├── dto/           # Data Transfer Objects
│   │   └── config/        # Configuración
│   ├── prisma/            # Esquema y migraciones DB
│   └── package.json
├── src/                    # Frontend React
│   ├── components/         # Componentes reutilizables
│   ├── pages/             # Páginas de la aplicación
│   ├── context/           # Contexto de autenticación
│   ├── services/          # Servicios de API
│   ├── types/             # Tipos TypeScript
│   └── config/            # Configuración del frontend
├── package.json           # Dependencias y scripts del proyecto
└── README.md
```

## 🔐 Autenticación y Autorización

### JWT Token
- **Expiración:** 24 horas por defecto
- **Almacenamiento:** localStorage del navegador
- **Renovación:** Automática en cada petición

### Roles y Permisos
- **BIBLIOTECARIO:** Acceso completo al sistema
- **ESTUDIANTE:** Acceso limitado a funcionalidades de estudiante

## 📊 API Endpoints

### Públicos
- `POST /api/users/login` - Iniciar sesión
- `GET /api/users/public` - Lista pública de usuarios

### Protegidos (requieren JWT)
- `GET /api/users/me` - Perfil del usuario actual
- `GET /api/books` - Lista de libros
- `GET /api/loans` - Lista de préstamos
- Y muchos más...

## 🚨 Solución de Problemas

### Error de CORS
- Verificar que `CORS_ORIGIN` en `.env` sea `http://localhost:3000`
- Reiniciar el backend después de cambios en `.env`

### Error de Base de Datos
- Verificar que PostgreSQL esté ejecutándose
- Verificar credenciales en `DATABASE_URL`
- Ejecutar `npm run backend:migrate`

### Error de Dependencias
- Ejecutar `npm run install-all` desde la raíz
- Verificar versiones de Node.js (18+)

## 🤝 Contribución

1. Fork el proyecto
2. Crear rama para feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 📞 Soporte

Para soporte técnico o preguntas:
- Crear un issue en el repositorio
- Contactar al equipo de desarrollo

---

**¡Disfruta usando el Sistema de Biblioteca Escolar! 📚✨**
