const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const config = require('./config');

// Importar rutas
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const loanRoutes = require('./routes/loanRoutes');

// Importar middleware de autenticación
const { logAuthAttempt, checkTokenExpiry } = require('./middleware/auth');

// Crear aplicación Express
const app = express();

// Configuración de Swagger/OpenAPI
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Sistema de Biblioteca Escolar',
      version: '1.0.0',
      description: 'API REST para gestión de biblioteca escolar con autenticación JWT y roles',
      contact: {
        name: 'Equipo de Desarrollo',
        email: 'desarrollo@biblioteca.edu',
      },
    },
    servers: [
      {
        url: `http://localhost:${config.server.port}`,
        description: 'Servidor de desarrollo',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js', './src/controllers/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Middleware de seguridad
app.use(helmet());

// Configuración de CORS
app.use(cors({
  origin: config.cors.origin,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.maxRequests,
  message: {
    success: false,
    message: 'Demasiadas peticiones desde esta IP, intenta de nuevo más tarde.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', limiter);

// Logging
if (config.server.nodeEnv === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Middleware de logging de autenticación
app.use(logAuthAttempt);

// Middleware para verificar expiración de token
app.use(checkTokenExpiry);

// Parsear JSON
app.use(express.json({ limit: config.upload.maxFileSize }));
app.use(express.urlencoded({ extended: true, limit: config.upload.maxFileSize }));

// Middleware para manejo de errores de parsing
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      success: false,
      message: 'JSON inválido en el cuerpo de la petición',
    });
  }
  next();
});

// Middleware para logging de requests
app.use((req, res, next) => {
  if (config.server.nodeEnv === 'development') {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  }
  next();
});

// Rutas de la API
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/loans', loanRoutes);

// Documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Ruta de salud
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Sistema de Biblioteca Escolar funcionando correctamente',
    timestamp: new Date().toISOString(),
    environment: config.server.nodeEnv,
    version: '1.0.0',
  });
});

// Ruta raíz
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Bienvenido a la API del Sistema de Biblioteca Escolar',
    documentation: '/api-docs',
    health: '/health',
    version: '1.0.0',
  });
});

// Middleware para manejo de rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Ruta ${req.originalUrl} no encontrada`,
    availableRoutes: {
      users: '/api/users',
      books: '/api/books',
      loans: '/api/loans',
      docs: '/api-docs',
      health: '/health',
    },
  });
});

// Middleware global para manejo de errores
app.use((err, req, res, next) => {
  console.error('Error no manejado:', err);

  // Si es un error de validación
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Error de validación',
      errors: Object.values(err.errors).map(e => e.message),
    });
  }

  // Si es un error de Prisma
  if (err.code === 'P2002') {
    return res.status(400).json({
      success: false,
      message: 'El registro ya existe con estos datos únicos',
    });
  }

  if (err.code === 'P2025') {
    return res.status(404).json({
      success: false,
      message: 'Registro no encontrado',
    });
  }

  // Error genérico del servidor
  res.status(err.status || 500).json({
    success: false,
    message: config.server.nodeEnv === 'development' ? err.message : 'Error interno del servidor',
    ...(config.server.nodeEnv === 'development' && { stack: err.stack }),
  });
});

// Manejo de señales de terminación
process.on('SIGTERM', () => {
  console.log('SIGTERM recibido, cerrando servidor...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT recibido, cerrando servidor...');
  process.exit(0);
});

module.exports = app;
