require('dotenv').config();

const config = {
  // Database
  database: {
    url: process.env.DATABASE_URL || 'postgresql://postgres:Joxz27102905@localhost:5432/biblioteca_escolar',
  },

  // JWT
  jwt: {
    secret: process.env.JWT_SECRET || 'tu_jwt_secret_super_seguro_aqui',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
  },

  // Server
  server: {
    port: process.env.PORT || 3001,
    nodeEnv: process.env.NODE_ENV || 'development',
  },

  // CORS
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  },

  // Rate Limiting
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 900000, // 15 minutes
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  },

  // Logging
  logging: {
    level: process.env.LOG_LEVEL || 'info',
  },

  // File Upload
  upload: {
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE) || 5242880, // 5MB
    uploadPath: process.env.UPLOAD_PATH || './uploads',
  },

  // Business Rules
  business: {
    maxLoansPerStudent: 3,
    defaultLoanDays: 15,
  },
};

module.exports = config;
