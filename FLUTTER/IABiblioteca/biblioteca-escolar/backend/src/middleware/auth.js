const jwt = require('jsonwebtoken');
const config = require('../config');
const userService = require('../services/userService');

// Middleware de autenticación JWT
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token de acceso requerido',
      });
    }

    // Verificar token
    const decoded = jwt.verify(token, config.jwt.secret);
    
    // Obtener usuario actualizado
    const user = await userService.getUserById(decoded.id);
    
    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Usuario no válido o inactivo',
      });
    }

    // Agregar usuario a la request
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Token inválido',
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expirado',
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Error de autenticación',
    });
  }
};

// Middleware de autorización por roles
const authorizeRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Usuario no autenticado',
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Acceso denegado. Rol insuficiente',
        requiredRoles: allowedRoles,
        userRole: req.user.role,
      });
    }

    next();
  };
};

// Middleware específico para bibliotecarios
const requireLibrarian = authorizeRole('BIBLIOTECARIO');

// Middleware específico para estudiantes
const requireStudent = authorizeRole('ESTUDIANTE');

// Middleware para verificar si el usuario puede acceder a un recurso específico
const canAccessResource = (resourceType) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Usuario no autenticado',
        });
      }

      // Los bibliotecarios pueden acceder a todo
      if (req.user.role === 'BIBLIOTECARIO') {
        return next();
      }

      // Los estudiantes solo pueden acceder a sus propios recursos
      if (req.user.role === 'ESTUDIANTE') {
        const resourceId = req.params.userId || req.params.id;
        
        if (resourceType === 'user' && resourceId !== req.user.id) {
          return res.status(403).json({
            success: false,
            message: 'Solo puedes acceder a tu propia información',
          });
        }

        if (resourceType === 'loan' && req.params.userId && req.params.userId !== req.user.id) {
          return res.status(403).json({
            success: false,
            message: 'Solo puedes ver tus propios préstamos',
          });
        }
      }

      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error de autorización',
      });
    }
  };
};

// Middleware para verificar si el usuario puede modificar un préstamo
const canModifyLoan = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Usuario no autenticado',
      });
    }

    const { id } = req.params;
    
    // Los bibliotecarios pueden modificar cualquier préstamo
    if (req.user.role === 'BIBLIOTECARIO') {
      return next();
    }

    // Los estudiantes solo pueden modificar sus propios préstamos
    if (req.user.role === 'ESTUDIANTE') {
      const loan = await require('../services/loanService').getLoanById(id);
      
      if (!loan) {
        return res.status(404).json({
          success: false,
          message: 'Préstamo no encontrado',
        });
      }

      if (loan.user.id !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: 'Solo puedes modificar tus propios préstamos',
        });
      }
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error de autorización',
    });
  }
};

// Middleware para verificar si el usuario puede crear préstamos
const canCreateLoan = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Usuario no autenticado',
      });
    }

    // Los bibliotecarios pueden crear préstamos para cualquier usuario
    if (req.user.role === 'BIBLIOTECARIO') {
      return next();
    }

    // Los estudiantes solo pueden crear préstamos para sí mismos
    if (req.user.role === 'ESTUDIANTE') {
      const { userId } = req.body;
      
      if (userId !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: 'Solo puedes crear préstamos para ti mismo',
        });
      }
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error de autorización',
    });
  }
};

// Middleware para verificar si el usuario puede acceder a estadísticas
const canAccessStats = (req, res, next) => {
  // Solo los bibliotecarios pueden acceder a estadísticas
  return requireLibrarian(req, res, next);
};

// Middleware para verificar si el usuario puede exportar datos
const canExportData = (req, res, next) => {
  // Solo los bibliotecarios pueden exportar datos
  return requireLibrarian(req, res, next);
};

// Middleware para logging de autenticación
const logAuthAttempt = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const ip = req.ip || req.connection.remoteAddress;
  const userAgent = req.get('User-Agent');
  
  console.log(`[${timestamp}] Auth attempt - IP: ${ip}, User-Agent: ${userAgent}`);
  
  next();
};

// Middleware para verificar si el token está próximo a expirar
const checkTokenExpiry = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
      const decoded = jwt.decode(token);
      if (decoded && decoded.exp) {
        const now = Math.floor(Date.now() / 1000);
        const timeUntilExpiry = decoded.exp - now;
        
        // Si el token expira en menos de 1 hora, agregar header de advertencia
        if (timeUntilExpiry < 3600) {
          res.set('X-Token-Expiry-Warning', 'Token expira pronto');
        }
      }
    }
    
    next();
  } catch (error) {
    // Si hay error en la verificación, continuar
    next();
  }
};

module.exports = {
  authenticateToken,
  authorizeRole,
  requireLibrarian,
  requireStudent,
  canAccessResource,
  canModifyLoan,
  canCreateLoan,
  canAccessStats,
  canExportData,
  logAuthAttempt,
  checkTokenExpiry,
};
