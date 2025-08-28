const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');
const userRepository = require('../repositories/userRepository');
const UserDTO = require('../dto/user.dto');

class UserService {
  // Crear usuario
  async createUser(userData) {
    try {
      // Verificar si username ya existe
      const usernameExists = await userRepository.usernameExists(userData.username);
      if (usernameExists) {
        throw new Error('El nombre de usuario ya existe');
      }

      // Verificar si email ya existe (si se proporciona)
      if (userData.email) {
        const emailExists = await userRepository.emailExists(userData.email);
        if (emailExists) {
          throw new Error('El email ya existe');
        }
      }

      // Encriptar contraseña
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

      // Crear usuario con contraseña encriptada
      const user = await userRepository.create({
        ...userData,
        password: hashedPassword,
      });

      // Retornar DTO sin contraseña
      return UserDTO.toResponse(user);
    } catch (error) {
      throw error;
    }
  }

  // Autenticar usuario
  async authenticateUser(username, password) {
    try {
      // Buscar usuario por username
      const user = await userRepository.findByUsername(username);
      if (!user) {
        throw new Error('Credenciales inválidas');
      }

      // Verificar si el usuario está activo
      if (!user.isActive) {
        throw new Error('Usuario inactivo');
      }

      // Verificar contraseña
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Credenciales inválidas');
      }

      // Generar token JWT
      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
          role: user.role,
        },
        config.jwt.secret,
        { expiresIn: config.jwt.expiresIn }
      );

      // Retornar usuario y token
      return {
        user: UserDTO.toResponse(user),
        token,
      };
    } catch (error) {
      throw error;
    }
  }

  // Obtener usuario por ID
  async getUserById(id) {
    try {
      const user = await userRepository.findById(id);
      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      return UserDTO.toResponse(user);
    } catch (error) {
      throw error;
    }
  }

  // Obtener todos los usuarios
  async getAllUsers(page = 1, limit = 10, search = '') {
    try {
      const result = await userRepository.findAll(page, limit, search);
      
      return {
        ...result,
        users: result.users.map(user => UserDTO.toResponse(user)),
      };
    } catch (error) {
      throw error;
    }
  }

  // Obtener usuarios por rol
  async getUsersByRole(role, page = 1, limit = 10) {
    try {
      const result = await userRepository.findByRole(role, page, limit);
      
      return {
        ...result,
        users: result.users.map(user => UserDTO.toResponse(user)),
      };
    } catch (error) {
      throw error;
    }
  }

  // Actualizar usuario
  async updateUser(id, updateData) {
    try {
      // Verificar si el usuario existe
      const existingUser = await userRepository.findById(id);
      if (!existingUser) {
        throw new Error('Usuario no encontrado');
      }

      // Verificar username único si se está actualizando
      if (updateData.username && updateData.username !== existingUser.username) {
        const usernameExists = await userRepository.usernameExists(updateData.username, id);
        if (usernameExists) {
          throw new Error('El nombre de usuario ya existe');
        }
      }

      // Verificar email único si se está actualizando
      if (updateData.email && updateData.email !== existingUser.email) {
        const emailExists = await userRepository.emailExists(updateData.email, id);
        if (emailExists) {
          throw new Error('El email ya existe');
        }
      }

      // Encriptar nueva contraseña si se está actualizando
      if (updateData.password) {
        const saltRounds = 12;
        updateData.password = await bcrypt.hash(updateData.password, saltRounds);
      }

      // Actualizar usuario
      const updatedUser = await userRepository.update(id, updateData);
      return UserDTO.toResponse(updatedUser);
    } catch (error) {
      throw error;
    }
  }

  // Cambiar contraseña
  async changePassword(id, currentPassword, newPassword) {
    try {
      // Obtener usuario
      const user = await userRepository.findById(id);
      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      // Verificar contraseña actual
      const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
      if (!isCurrentPasswordValid) {
        throw new Error('Contraseña actual incorrecta');
      }

      // Encriptar nueva contraseña
      const saltRounds = 12;
      const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

      // Actualizar contraseña
      const updatedUser = await userRepository.update(id, { password: hashedNewPassword });
      return UserDTO.toResponse(updatedUser);
    } catch (error) {
      throw error;
    }
  }

  // Desactivar usuario
  async deactivateUser(id) {
    try {
      const user = await userRepository.findById(id);
      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      if (!user.isActive) {
        throw new Error('El usuario ya está inactivo');
      }

      const deactivatedUser = await userRepository.delete(id);
      return UserDTO.toResponse(deactivatedUser);
    } catch (error) {
      throw error;
    }
  }

  // Activar usuario
  async activateUser(id) {
    try {
      const user = await userRepository.findById(id);
      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      if (user.isActive) {
        throw new Error('El usuario ya está activo');
      }

      const activatedUser = await userRepository.restore(id);
      return UserDTO.toResponse(activatedUser);
    } catch (error) {
      throw error;
    }
  }

  // Obtener estadísticas de usuarios
  async getUserStats() {
    try {
      return await userRepository.getStats();
    } catch (error) {
      throw error;
    }
  }

  // Verificar token JWT
  async verifyToken(token) {
    try {
      const decoded = jwt.verify(token, config.jwt.secret);
      const user = await userRepository.findById(decoded.id);
      
      if (!user || !user.isActive) {
        throw new Error('Usuario no válido');
      }

      return UserDTO.toResponse(user);
    } catch (error) {
      throw new Error('Token inválido');
    }
  }

  // Obtener perfil del usuario autenticado
  async getProfile(id) {
    try {
      const user = await userRepository.findById(id);
      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      return UserDTO.toResponse(user);
    } catch (error) {
      throw error;
    }
  }

  // Buscar usuarios por término de búsqueda
  async searchUsers(searchTerm, page = 1, limit = 10) {
    try {
      const result = await userRepository.findAll(page, limit, searchTerm);
      
      return {
        ...result,
        users: result.users.map(user => UserDTO.toResponse(user)),
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UserService();
