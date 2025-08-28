const app = require('./app');
const config = require('./config');
const prisma = require('./database/client');

// Función para iniciar el servidor
const startServer = async () => {
  try {
    // Conectar a la base de datos
    await prisma.$connect();
    console.log('✅ Base de datos conectada exitosamente');

    // Iniciar servidor
    const server = app.listen(config.server.port, () => {
      console.log('🚀 Servidor iniciado exitosamente');
      console.log(`📍 Puerto: ${config.server.port}`);
      console.log(`🌍 Entorno: ${config.server.nodeEnv}`);
      console.log(`📚 API: http://localhost:${config.server.port}/api`);
      console.log(`📖 Documentación: http://localhost:${config.server.port}/api-docs`);
      console.log(`💚 Salud: http://localhost:${config.server.port}/health`);
      console.log('─'.repeat(50));
    });

    // Manejo de errores del servidor
    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`❌ Puerto ${config.server.port} ya está en uso`);
        process.exit(1);
      } else {
        console.error('❌ Error del servidor:', error);
        process.exit(1);
      }
    });

    // Manejo de señales de terminación
    const gracefulShutdown = async (signal) => {
      console.log(`\n📡 Señal ${signal} recibida, cerrando servidor...`);
      
      server.close(async () => {
        console.log('🔒 Servidor HTTP cerrado');
        
        try {
          await prisma.$disconnect();
          console.log('🔌 Base de datos desconectada');
          console.log('👋 Servidor cerrado exitosamente');
          process.exit(0);
        } catch (error) {
          console.error('❌ Error al cerrar la base de datos:', error);
          process.exit(1);
        }
      });

      // Forzar cierre si no se cierra en 10 segundos
      setTimeout(() => {
        console.error('⏰ Forzando cierre del servidor...');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

    // Manejo de errores no capturados
    process.on('uncaughtException', (error) => {
      console.error('❌ Excepción no capturada:', error);
      gracefulShutdown('uncaughtException');
    });

    process.on('unhandledRejection', (reason, promise) => {
      console.error('❌ Promesa rechazada no manejada:', reason);
      gracefulShutdown('unhandledRejection');
    });

  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

// Verificar variables de entorno requeridas
const checkEnvironment = () => {
  const requiredEnvVars = ['DATABASE_URL'];
  const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

  if (missingEnvVars.length > 0) {
    console.error('❌ Variables de entorno faltantes:', missingEnvVars.join(', '));
    console.error('📝 Asegúrate de configurar un archivo .env con las variables requeridas');
    process.exit(1);
  }

  console.log('✅ Variables de entorno verificadas');
};

// Función principal
const main = async () => {
  console.log('🎯 Iniciando Sistema de Biblioteca Escolar...');
  console.log('─'.repeat(50));
  
  checkEnvironment();
  await startServer();
};

// Ejecutar aplicación
if (require.main === module) {
  main();
}

module.exports = { startServer };
