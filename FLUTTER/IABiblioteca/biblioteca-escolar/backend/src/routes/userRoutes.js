const express = require('express');
const userController = require('../controllers/userController');
const userValidator = require('../validators/user.validator');
const { authenticateToken, requireLibrarian, canAccessResource } = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - password
 *         - name
 *         - role
 *       properties:
 *         id:
 *           type: string
 *           description: ID único del usuario
 *         username:
 *           type: string
 *           description: Nombre de usuario único
 *         email:
 *           type: string
 *           description: Email del usuario
 *         name:
 *           type: string
 *           description: Nombre completo del usuario
 *         role:
 *           type: string
 *           enum: [BIBLIOTECARIO, ESTUDIANTE]
 *           description: Rol del usuario
 *         isActive:
 *           type: boolean
 *           description: Estado activo del usuario
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación
 *     UserResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         message:
 *           type: string
 *         data:
 *           $ref: '#/components/schemas/User'
 */

// Debug: Verificar que los middlewares estén disponibles
console.log('Middleware check:');
console.log('authenticateToken:', typeof authenticateToken);
console.log('requireLibrarian:', typeof requireLibrarian);
console.log('canAccessResource:', typeof canAccessResource);
console.log('canAccessResource("user"):', typeof canAccessResource('user'));

// Rutas públicas (sin autenticación)

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 */
router.post('/register', userValidator.validateRegister, userController.register);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Autenticar usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *                     token:
 *                       type: string
 */
router.post('/login', userValidator.validateLogin, userController.login);

/**
 * @swagger
 * /api/users/verify-token:
 *   post:
 *     summary: Verificar token JWT
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *             properties:
 *               token:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token válido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 */
router.post('/verify-token', userController.verifyToken);

/**
 * @swagger
 * /api/users/public:
 *   get:
 *     summary: Obtener lista de usuarios (público)
 *     description: Endpoint público para obtener todos los usuarios sin autenticación
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número de página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Número de usuarios por página
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Término de búsqueda
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     users:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/User'
 *                     total:
 *                       type: integer
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 */
router.get('/public', userController.getAllUsersPublic); // Endpoint público para obtener usuarios

// Rutas protegidas (requieren autenticación)
router.use(authenticateToken);

// Rutas para usuarios autenticados

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Obtener perfil del usuario autenticado
 *     description: Obtiene el perfil del usuario que está autenticado
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       401:
 *         description: No autorizado - Token inválido o expirado
 */
router.get('/profile', userController.getProfile);

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: Obtener usuario actual
 *     description: Obtiene la información del usuario autenticado
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuario obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       401:
 *         description: No autorizado - Token inválido o expirado
 */
router.get('/me', userController.getCurrentUser);

// Ruta simplificada para cambiar contraseña (sin middleware complejo)

/**
 * @swagger
 * /api/users/{id}/change-password:
 *   put:
 *     summary: Cambiar contraseña del usuario
 *     description: Permite al usuario cambiar su contraseña
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 description: Contraseña actual
 *               newPassword:
 *                 type: string
 *                 description: Nueva contraseña
 *     responses:
 *       200:
 *         description: Contraseña cambiada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       400:
 *         description: Contraseña actual incorrecta
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Usuario no encontrado
 */
router.put('/:id/change-password', 
  userValidator.changePassword, 
  userController.changePassword
);

// Rutas solo para bibliotecarios

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtener todos los usuarios (solo bibliotecarios)
 *     description: Lista todos los usuarios con paginación y búsqueda
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número de página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Número de usuarios por página
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Término de búsqueda
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     users:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/User'
 *                     total:
 *                       type: integer
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso denegado - Se requiere rol de bibliotecario
 */
router.get('/', requireLibrarian, userController.getAllUsers);

/**
 * @swagger
 * /api/users/role/{role}:
 *   get:
 *     summary: Obtener usuarios por rol (solo bibliotecarios)
 *     description: Lista usuarios filtrados por rol específico
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: role
 *         required: true
 *         schema:
 *           type: string
 *           enum: [BIBLIOTECARIO, ESTUDIANTE]
 *         description: Rol de usuario a filtrar
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número de página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Número de usuarios por página
 *     responses:
 *       200:
 *         description: Usuarios por rol obtenidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     users:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/User'
 *                     total:
 *                       type: integer
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso denegado - Se requiere rol de bibliotecario
 */
router.get('/role/:role', requireLibrarian, userController.getUsersByRole);

/**
 * @swagger
 * /api/users/stats/overview:
 *   get:
 *     summary: Obtener estadísticas de usuarios (solo bibliotecarios)
 *     description: Estadísticas generales del sistema de usuarios
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Estadísticas obtenidas exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalUsers:
 *                       type: integer
 *                     activeUsers:
 *                       type: integer
 *                     students:
 *                       type: integer
 *                     librarians:
 *                       type: integer
 *                     inactiveUsers:
 *                       type: integer
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso denegado - Se requiere rol de bibliotecario
 */
router.get('/stats/overview', requireLibrarian, userController.getUserStats);

/**
 * @swagger
 * /api/users/search:
 *   get:
 *     summary: Buscar usuarios (solo bibliotecarios)
 *     description: Búsqueda avanzada de usuarios
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: Término de búsqueda
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número de página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Número de usuarios por página
 *     responses:
 *       200:
 *         description: Búsqueda realizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     users:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/User'
 *                     total:
 *                       type: integer
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *       400:
 *         description: Término de búsqueda requerido
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso denegado - Se requiere rol de bibliotecario
 */
router.get('/search', requireLibrarian, userController.searchUsers);

// Rutas para usuarios específicos (requieren autorización)

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Obtener usuario por ID
 *     description: Obtiene la información de un usuario específico
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/:id', userController.getUserById); // Sin middleware por ahora

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Actualizar usuario
 *     description: Actualiza la información de un usuario
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [BIBLIOTECARIO, ESTUDIANTE]
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Usuario no encontrado
 */
router.put('/:id', 
  userValidator.validateUpdate, 
  userController.updateUser
);

// Rutas solo para bibliotecarios (gestión de usuarios)

/**
 * @swagger
 * /api/users/{id}/deactivate:
 *   put:
 *     summary: Desactivar usuario (solo bibliotecarios)
 *     description: Desactiva un usuario del sistema
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario desactivado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso denegado - Se requiere rol de bibliotecario
 *       404:
 *         description: Usuario no encontrado
 */
router.put('/:id/deactivate', requireLibrarian, userController.deactivateUser);

/**
 * @swagger
 * /api/users/{id}/activate:
 *   put:
 *     summary: Activar usuario (solo bibliotecarios)
 *     description: Activa un usuario previamente desactivado
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario activado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso denegado - Se requiere rol de bibliotecario
 *       404:
 *         description: Usuario no encontrado
 */
router.put('/:id/activate', requireLibrarian, userController.activateUser);

module.exports = router;
