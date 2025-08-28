const { PrismaClient } = require('@prisma/client');
const config = require('../config');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: config.database.url,
    },
  },
  log: config.server.nodeEnv === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
});

// Middleware para logging
prisma.$use(async (params, next) => {
  const before = Date.now();
  const result = await next(params);
  const after = Date.now();
  
  if (config.server.nodeEnv === 'development') {
    console.log(`Query ${params.model}.${params.action} took ${after - before}ms`);
  }
  
  return result;
});

// Manejo de errores de conexión
prisma.$on('error', (e) => {
  console.error('Prisma Client error:', e);
});

// Manejo de cierre de la aplicación (compatible con Prisma 5.0+)
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

module.exports = prisma;
