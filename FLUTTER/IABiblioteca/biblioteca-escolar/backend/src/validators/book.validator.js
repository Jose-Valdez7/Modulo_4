const { body, param, query } = require('express-validator');

const bookValidator = {
  // Validación para crear libro
  create: [
    body('title')
      .trim()
      .isLength({ min: 1, max: 200 })
      .withMessage('El título debe tener entre 1 y 200 caracteres'),
    
    body('author')
      .trim()
      .isLength({ min: 1, max: 100 })
      .withMessage('El autor debe tener entre 1 y 100 caracteres'),
    
    body('isbn')
      .trim()
      .isLength({ min: 10, max: 13 })
      .withMessage('El ISBN debe tener entre 10 y 13 caracteres')
      .matches(/^[0-9-]+$/)
      .withMessage('El ISBN solo puede contener números y guiones'),
    
    body('description')
      .optional()
      .trim()
      .isLength({ max: 1000 })
      .withMessage('La descripción no puede exceder 1000 caracteres'),
    
    body('category')
      .trim()
      .isLength({ min: 1, max: 50 })
      .withMessage('La categoría debe tener entre 1 y 50 caracteres'),
    
    body('publishedYear')
      .isInt({ min: 1800, max: new Date().getFullYear() })
      .withMessage(`El año de publicación debe estar entre 1800 y ${new Date().getFullYear()}`),
    
    body('stock')
      .isInt({ min: 0 })
      .withMessage('El stock debe ser un número entero mayor o igual a 0'),
  ],

  // Validación para actualizar libro
  update: [
    param('id')
      .isString()
      .withMessage('El ID debe ser una cadena válida'),
    
    body('title')
      .optional()
      .trim()
      .isLength({ min: 1, max: 200 })
      .withMessage('El título debe tener entre 1 y 200 caracteres'),
    
    body('author')
      .optional()
      .trim()
      .isLength({ min: 1, max: 100 })
      .withMessage('El autor debe tener entre 1 y 100 caracteres'),
    
    body('isbn')
      .optional()
      .trim()
      .isLength({ min: 10, max: 13 })
      .withMessage('El ISBN debe tener entre 10 y 13 caracteres')
      .matches(/^[0-9-]+$/)
      .withMessage('El ISBN solo puede contener números y guiones'),
    
    body('description')
      .optional()
      .trim()
      .isLength({ max: 1000 })
      .withMessage('La descripción no puede exceder 1000 caracteres'),
    
    body('category')
      .optional()
      .trim()
      .isLength({ min: 1, max: 50 })
      .withMessage('La categoría debe tener entre 1 y 50 caracteres'),
    
    body('publishedYear')
      .optional()
      .isInt({ min: 1800, max: new Date().getFullYear() })
      .withMessage(`El año de publicación debe estar entre 1800 y ${new Date().getFullYear()}`),
    
    body('stock')
      .optional()
      .isInt({ min: 0 })
      .withMessage('El stock debe ser un número entero mayor o igual a 0'),
    
    body('isActive')
      .optional()
      .isBoolean()
      .withMessage('isActive debe ser un valor booleano'),
  ],

  // Validación para obtener libro por ID
  getById: [
    param('id')
      .isString()
      .withMessage('El ID debe ser una cadena válida'),
  ],

  // Validación para listar libros
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
    
    query('category')
      .optional()
      .trim()
      .isLength({ min: 1 })
      .withMessage('La categoría no puede estar vacía'),
    
    query('author')
      .optional()
      .trim()
      .isLength({ min: 1 })
      .withMessage('El autor no puede estar vacío'),
    
    query('available')
      .optional()
      .isBoolean()
      .withMessage('available debe ser un valor booleano'),
  ],

  // Validación para actualizar stock
  stockUpdate: [
    param('id')
      .isString()
      .withMessage('El ID debe ser una cadena válida'),
    
    body('stock')
      .isInt({ min: 0 })
      .withMessage('El stock debe ser un número entero mayor o igual a 0'),
    
    body('reason')
      .optional()
      .trim()
      .isLength({ max: 200 })
      .withMessage('La razón no puede exceder 200 caracteres'),
  ],
};

module.exports = bookValidator;
