const userService = require('../services/userService');
const { validationResult } = require('express-validator');

class UserController {
  constructor() {
    // Debug: Verificar que todos los métodos estén definidos
    console.log('UserController methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(this)));
  }

  // POST /api/users/register
  async register(req, res) {
    try {
      // Validar datos de entrada
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Datos de entrada inválidos',
          errors: errors.array(),
        });
      }

      const userData = req.body;
      const user = await userService.createUser(userData);

      res.status(201).json({
        success: true,
        message: 'Usuario creado exitosamente',
        data: user,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // POST /api/users/login
  async login(req, res) {
    try {
      // Validar datos de entrada
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Datos de entrada inválidos',
          errors: errors.array(),
        });
      }

      const { username, password } = req.body;
      const result = await userService.authenticateUser(username, password);

      res.status(200).json({
        success: true,
        message: 'Autenticación exitosa',
        data: result,
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: error.message,
      });
    }
  }

  // GET /api/users/profile
  async getProfile(req, res) {
    try {
      const userId = req.user.id;
      const user = await userService.getProfile(userId);

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  // GET /api/users/:id
  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(id);

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  // GET /api/users (solo bibliotecarios)
  async getAllUsers(req, res) {
    try {
      const { page = 1, limit = 10, search = '' } = req.query;
      const result = await userService.getAllUsers(
        parseInt(page),
        parseInt(limit),
        search
      );

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // GET /api/users/public (público - sin autenticación)
  async getAllUsersPublic(req, res) {
    try {
      const { page = 1, limit = 10, search = '' } = req.query;
      const result = await userService.getAllUsers(
        parseInt(page),
        parseInt(limit),
        search
      );

      res.status(200).json({
        success: true,
        message: 'Lista de usuarios obtenida exitosamente',
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // GET /api/users/role/:role
  async getUsersByRole(req, res) {
    try {
      const { role } = req.params;
      const { page = 1, limit = 10 } = req.query;
      const result = await userService.getUsersByRole(
        role,
        parseInt(page),
        parseInt(limit)
      );

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // PUT /api/users/:id
  async updateUser(req, res) {
    try {
      // Validar datos de entrada
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Datos de entrada inválidos',
          errors: errors.array(),
        });
      }

      const { id } = req.params;
      const updateData = req.body;
      const user = await userService.updateUser(id, updateData);

      res.status(200).json({
        success: true,
        message: 'Usuario actualizado exitosamente',
        data: user,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // PUT /api/users/:id/change-password
  async changePassword(req, res) {
    try {
      // Validar datos de entrada
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Datos de entrada inválidos',
          errors: errors.array(),
        });
      }

      const { id } = req.params;
      const { currentPassword, newPassword } = req.body;
      const user = await userService.changePassword(id, currentPassword, newPassword);

      res.status(200).json({
        success: true,
        message: 'Contraseña cambiada exitosamente',
        data: user,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // PUT /api/users/:id/deactivate
  async deactivateUser(req, res) {
    try {
      const { id } = req.params;
      const user = await userService.deactivateUser(id);

      res.status(200).json({
        success: true,
        message: 'Usuario desactivado exitosamente',
        data: user,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // PUT /api/users/:id/activate
  async activateUser(req, res) {
    try {
      const { id } = req.params;
      const user = await userService.activateUser(id);

      res.status(200).json({
        success: true,
        message: 'Usuario activado exitosamente',
        data: user,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // GET /api/users/stats/overview
  async getUserStats(req, res) {
    try {
      const stats = await userService.getUserStats();

      res.status(200).json({
        success: true,
        data: stats,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // GET /api/users/search
  async searchUsers(req, res) {
    try {
      const { q: searchTerm, page = 1, limit = 10 } = req.query;
      
      if (!searchTerm) {
        return res.status(400).json({
          success: false,
          message: 'Término de búsqueda requerido',
        });
      }

      const result = await userService.searchUsers(
        searchTerm,
        parseInt(page),
        parseInt(limit)
      );

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // POST /api/users/verify-token
  async verifyToken(req, res) {
    try {
      const { token } = req.body;
      
      if (!token) {
        return res.status(400).json({
          success: false,
          message: 'Token requerido',
        });
      }

      const user = await userService.verifyToken(token);

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: error.message,
      });
    }
  }

  // GET /api/users/me
  async getCurrentUser(req, res) {
    try {
      const userId = req.user.id;
      const user = await userService.getUserById(userId);

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }
}

// Crear instancia y verificar métodos
const userController = new UserController();

// Debug: Verificar que todos los métodos estén disponibles
console.log('Available methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(userController)));
console.log('getProfile method:', typeof userController.getProfile);
console.log('getCurrentUser method:', typeof userController.getCurrentUser);
console.log('changePassword method:', typeof userController.changePassword);

module.exports = userController;
