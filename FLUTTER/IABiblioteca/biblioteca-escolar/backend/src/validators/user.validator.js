const { body, param, query } = require('express-validator');

const userValidator = {
  // Validación para crear usuario
  create: [
    body('username')
      .trim()
      .isLength({ min: 3, max: 50 })
      .withMessage('El nombre de usuario debe tener entre 3 y 50 caracteres')
      .matches(/^[a-zA-Z0-9_]+$/)
      .withMessage('El nombre de usuario solo puede contener letras, números y guiones bajos'),
    
    body('email')
      .optional()
      .isEmail()
      .withMessage('El email debe ser válido')
      .normalizeEmail(),
    
    body('password')
      .isLength({ min: 6 })
      .withMessage('La contraseña debe tener al menos 6 caracteres'),
    
    body('name')
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage('El nombre debe tener entre 2 y 100 caracteres'),
    
    body('role')
      .optional()
      .isIn(['BIBLIOTECARIO', 'ESTUDIANTE'])
      .withMessage('El rol debe ser BIBLIOTECARIO o ESTUDIANTE'),
  ],

  // Validación para actualizar usuario
  update: [
    param('id')
      .isString()
      .withMessage('El ID debe ser una cadena válida'),
    
    body('username')
      .optional()
      .trim()
      .isLength({ min: 3, max: 50 })
      .withMessage('El nombre de usuario debe tener entre 3 y 50 caracteres')
      .matches(/^[a-zA-Z0-9_]+$/)
      .withMessage('El nombre de usuario solo puede contener letras, números y guiones bajos'),
    
    body('email')
      .optional()
      .isEmail()
      .withMessage('El email debe ser válido')
      .normalizeEmail(),
    
    body('name')
      .optional()
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage('El nombre debe tener entre 2 y 100 caracteres'),
    
    body('role')
      .optional()
      .isIn(['BIBLIOTECARIO', 'ESTUDIANTE'])
      .withMessage('El rol debe ser un valor válido'),
    
    body('isActive')
      .optional()
      .isBoolean()
      .withMessage('isActive debe ser un valor booleano'),
  ],

  // Validación para login
  login: [
    body('username')
      .trim()
      .notEmpty()
      .withMessage('El nombre de usuario es requerido'),
    
    body('password')
      .notEmpty()
      .withMessage('La contraseña es requerida'),
  ],

  // Validación para obtener usuario por ID
  getById: [
    param('id')
      .isString()
      .withMessage('El ID debe ser una cadena válida'),
  ],

  // Validación para listar usuarios
  list: [
    query('page')
      .optional()
      .isInt({ min: 1 })
      .withMessage('La página debe ser un número entero mayor a 0'),
    
    query('limit')
      .optional()
      .isInt({ min: 1, max: 100 })
      .withMessage('El límite debe ser un número entre 1 y 100'),
    
    query('search')
      .optional()
      .trim()
      .isLength({ min: 1 })
      .withMessage('El término de búsqueda no puede estar vacío'),
    
    query('role')
      .optional()
      .isIn(['BIBLIOTECARIO', 'ESTUDIANTE'])
      .withMessage('El rol debe ser un valor válido'),
  ],

  // Validación para cambiar contraseña
  changePassword: [
    param('id')
      .isString()
      .withMessage('El ID debe ser una cadena válida'),
    
    body('currentPassword')
      .notEmpty()
      .withMessage('La contraseña actual es requerida'),
    
    body('newPassword')
      .isLength({ min: 6 })
      .withMessage('La nueva contraseña debe tener al menos 6 caracteres'),
  ],

  // Validación para registro
  validateRegister: [
    body('username')
      .trim()
      .isLength({ min: 3, max: 50 })
      .withMessage('El nombre de usuario debe tener entre 3 y 50 caracteres')
      .matches(/^[a-zA-Z0-9_]+$/)
      .withMessage('El nombre de usuario solo puede contener letras, números y guiones bajos'),
    
    body('email')
      .optional()
      .isEmail()
      .withMessage('El email debe ser válido')
      .normalizeEmail(),
    
    body('password')
      .isLength({ min: 6 })
      .withMessage('La contraseña debe tener al menos 6 caracteres'),
    
    body('name')
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage('El nombre debe tener entre 2 y 100 caracteres'),
    
    body('role')
      .optional()
      .isIn(['BIBLIOTECARIO', 'ESTUDIANTE'])
      .withMessage('El rol debe ser BIBLIOTECARIO o ESTUDIANTE'),
  ],

  // Validación para login
  validateLogin: [
    body('username')
      .trim()
      .notEmpty()
      .withMessage('El nombre de usuario es requerido'),
    
    body('password')
      .notEmpty()
      .withMessage('La contraseña es requerida'),
  ],

  // Validación para actualizar usuario
  validateUpdate: [
    param('id')
      .isString()
      .withMessage('El ID debe ser una cadena válida'),
    
    body('username')
      .optional()
      .trim()
      .isLength({ min: 3, max: 50 })
      .withMessage('El nombre de usuario debe tener entre 3 y 50 caracteres')
      .matches(/^[a-zA-Z0-9_]+$/)
      .withMessage('El nombre de usuario solo puede contener letras, números y guiones bajos'),
    
    body('email')
      .optional()
      .isEmail()
      .withMessage('El email debe ser válido')
      .normalizeEmail(),
    
    body('name')
      .optional()
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage('El nombre debe tener entre 2 y 100 caracteres'),
    
    body('role')
      .optional()
      .isIn(['BIBLIOTECARIO', 'ESTUDIANTE'])
      .withMessage('El rol debe ser un valor válido'),
    
    body('isActive')
      .optional()
      .isBoolean()
      .withMessage('isActive debe ser un valor booleano'),
  ],
};

module.exports = userValidator;
