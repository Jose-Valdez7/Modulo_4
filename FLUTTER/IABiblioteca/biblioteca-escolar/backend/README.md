# 📚 Sistema de Biblioteca Escolar - Backend

Backend completo para el Sistema de Biblioteca Escolar construido con Node.js, Express, Prisma y PostgreSQL.

## 🚀 Características

- **Autenticación JWT** con roles (BIBLIOTECARIO, ESTUDIANTE)
- **CRUD completo** para usuarios, libros y préstamos
- **Validaciones robustas** con express-validator
- **Middleware de autorización** por roles
- **Manejo de errores centralizado**
- **Documentación Swagger/OpenAPI**
- **Logging con Morgan**
- **Rate limiting y seguridad con Helmet**
- **Base de datos PostgreSQL** con Prisma ORM
- **Arquitectura en capas** (Repositorios, Servicios, Controladores)

## 🛠️ Tecnologías

- **Node.js** (v18+)
- **Express.js** - Framework web
- **Prisma** - ORM para PostgreSQL
- **PostgreSQL** - Base de datos
- **JWT** - Autenticación
- **bcryptjs** - Encriptación de contraseñas
- **Swagger** - Documentación de API
- **Helmet** - Seguridad
- **CORS** - Cross-origin resource sharing
- **Morgan** - Logging de requests

## 📋 Prerrequisitos

- Node.js (v18 o superior)
- npm o yarn
- PostgreSQL (v12 o superior)
- Git

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd biblioteca-escolar/backend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

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

# Logging
LOG_LEVEL=info

# Upload
MAX_FILE_SIZE=5242880
UPLOAD_PATH="./uploads"
```

### 4. Configurar la base de datos

```bash
# Generar cliente de Prisma
npm run db:generate

# Ejecutar migraciones
npm run db:migrate

# Poblar con datos de prueba (opcional)
npm run db:seed
```

### 5. Iniciar el servidor

```bash
# Desarrollo (con nodemon)
npm run dev

# Producción
npm start
```

## 📚 Estructura del Proyecto

```
backend/
├── src/
│   ├── config/           # Configuración de la aplicación
│   ├── controllers/      # Controladores de la API
│   ├── database/         # Cliente de Prisma
│   ├── dto/             # Data Transfer Objects
│   ├── middleware/       # Middleware personalizado
│   ├── repositories/     # Capa de acceso a datos
│   ├── routes/           # Definición de rutas
│   ├── services/         # Lógica de negocio
│   ├── validators/       # Validaciones de entrada
│   ├── app.js           # Configuración de Express
│   └── server.js        # Punto de entrada del servidor
├── prisma/
│   ├── schema.prisma    # Esquema de la base de datos
│   └── seed.js          # Datos de prueba
├── package.json
└── README.md
```

## 🔐 Autenticación y Autorización

### Roles de Usuario

- **BIBLIOTECARIO**: Acceso completo al sistema
- **ESTUDIANTE**: Acceso limitado a sus propios datos

### Endpoints de Autenticación

- `POST /api/users/register` - Registro de usuarios
- `POST /api/users/login` - Inicio de sesión
- `POST /api/users/verify-token` - Verificación de token

### Uso de JWT

```bash
# Incluir token en headers
Authorization: Bearer <tu_token_jwt>
```

## 📖 API Endpoints

### Usuarios (`/api/users`)

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| POST | `/register` | Registrar usuario | No |
| POST | `/login` | Iniciar sesión | No |
| GET | `/profile` | Obtener perfil | Sí |
| GET | `/:id` | Obtener usuario por ID | Sí |
| PUT | `/:id` | Actualizar usuario | Sí |
| PUT | `/:id/change-password` | Cambiar contraseña | Sí |

### Libros (`/api/books`)

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| GET | `/` | Listar libros | No |
| GET | `/:id` | Obtener libro por ID | No |
| GET | `/search` | Buscar libros | No |
| POST | `/` | Crear libro | BIBLIOTECARIO |
| PUT | `/:id` | Actualizar libro | BIBLIOTECARIO |
| DELETE | `/:id` | Eliminar libro | BIBLIOTECARIO |

### Préstamos (`/api/loans`)

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| GET | `/my-loans` | Mis préstamos | Sí |
| POST | `/` | Crear préstamo | Sí |
| PUT | `/:id/return` | Devolver libro | Sí |
| PUT | `/:id/renew` | Renovar préstamo | Sí |

## 🧪 Datos de Prueba

Después de ejecutar `npm run db:seed`, tendrás acceso a:

### Usuarios de Prueba

- **Bibliotecario**: `bibliotecario` / `password123`
- **Estudiante 1**: `estudiante1` / `password123`
- **Estudiante 2**: `estudiante2` / `password123`

### Libros de Prueba

- El Quijote (Miguel de Cervantes)
- Cien años de soledad (Gabriel García Márquez)
- Harry Potter y la piedra filosofal (J.K. Rowling)
- El Señor de los Anillos (J.R.R. Tolkien)
- 1984 (George Orwell)

## 📊 Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Iniciar servidor con nodemon
npm start               # Iniciar servidor en producción

# Base de datos
npm run db:generate     # Generar cliente de Prisma
npm run db:migrate      # Ejecutar migraciones
npm run db:seed         # Poblar con datos de prueba
npm run db:studio       # Abrir Prisma Studio

# Testing
npm test                # Ejecutar tests
npm run test:watch      # Tests en modo watch

# Linting
npm run lint            # Verificar código
npm run lint:fix        # Corregir problemas de linting
```

## 🔧 Configuración

### Variables de Entorno

| Variable | Descripción | Valor por Defecto |
|----------|-------------|-------------------|
| `DATABASE_URL` | URL de conexión a PostgreSQL | - |
| `JWT_SECRET` | Secreto para JWT | `tu_jwt_secret_super_seguro_aqui` |
| `JWT_EXPIRES_IN` | Expiración del JWT | `24h` |
| `PORT` | Puerto del servidor | `3001` |
| `NODE_ENV` | Entorno de ejecución | `development` |
| `CORS_ORIGIN` | Origen permitido para CORS | `http://localhost:3000` |

### Configuración de Base de Datos

El esquema de la base de datos incluye:

- **Users**: Usuarios con roles y autenticación
- **Books**: Libros con stock y disponibilidad
- **Loans**: Préstamos con estados y fechas

## 📖 Documentación de API

Una vez iniciado el servidor, accede a:

- **Swagger UI**: `http://localhost:3001/api-docs`
- **Health Check**: `http://localhost:3001/health`

## 🚀 Despliegue

### Producción

1. Configurar variables de entorno para producción
2. Ejecutar migraciones: `npm run db:migrate`
3. Generar cliente de Prisma: `npm run db:generate`
4. Iniciar servidor: `npm start`

### Docker (opcional)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3001
CMD ["npm", "start"]
```

## 🧪 Testing

```bash
# Ejecutar tests
npm test

# Tests en modo watch
npm run test:watch

# Tests con coverage
npm run test:coverage
```

## 📝 Logs

Los logs se configuran automáticamente según el entorno:

- **Development**: Logs detallados con Morgan
- **Production**: Logs combinados para producción

## 🔒 Seguridad

- **Helmet**: Headers de seguridad
- **CORS**: Configuración de origen
- **Rate Limiting**: Protección contra ataques
- **JWT**: Autenticación segura
- **bcrypt**: Encriptación de contraseñas

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🆘 Soporte

Si tienes problemas o preguntas:

1. Revisa la documentación de la API en `/api-docs`
2. Verifica los logs del servidor
3. Abre un issue en el repositorio

## 🎯 Roadmap

- [ ] Tests unitarios y de integración
- [ ] Sistema de notificaciones
- [ ] Reportes avanzados
- [ ] API para móviles
- [ ] Cache con Redis
- [ ] Monitoreo y métricas

---

**¡Disfruta construyendo tu Sistema de Biblioteca Escolar! 🎉**
