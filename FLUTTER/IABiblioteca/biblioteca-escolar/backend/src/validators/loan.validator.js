const { body, param, query } = require('express-validator');

const loanValidator = {
  // Validación para crear préstamo
  create: [
    body('bookId')
      .isString()
      .withMessage('El ID del libro debe ser una cadena válida'),
    
    body('userId')
      .isString()
      .withMessage('El ID del usuario debe ser una cadena válida'),
    
    body('dueDate')
      .isISO8601()
      .withMessage('La fecha de devolución debe ser una fecha válida')
      .custom((value) => {
        const dueDate = new Date(value);
        const today = new Date();
        if (dueDate <= today) {
          throw new Error('La fecha de devolución debe ser posterior a hoy');
        }
        return true;
      }),
    
    body('notes')
      .optional()
      .trim()
      .isLength({ max: 500 })
      .withMessage('Las notas no pueden exceder 500 caracteres'),
  ],

  // Validación para actualizar préstamo
  update: [
    param('id')
      .isString()
      .withMessage('El ID debe ser una cadena válida'),
    
    body('dueDate')
      .optional()
      .isISO8601()
      .withMessage('La fecha de devolución debe ser una fecha válida')
      .custom((value) => {
        const dueDate = new Date(value);
        const today = new Date();
        if (dueDate <= today) {
          throw new Error('La fecha de devolución debe ser posterior a hoy');
        }
        return true;
      }),
    
    body('status')
      .optional()
      .isIn(['ACTIVO', 'DEVUELTO', 'VENCIDO', 'PERDIDO'])
      .withMessage('El estado debe ser ACTIVO, DEVUELTO, VENCIDO o PERDIDO'),
    
    body('notes')
      .optional()
      .trim()
      .isLength({ max: 500 })
      .withMessage('Las notas no pueden exceder 500 caracteres'),
  ],

  // Validación para devolver libro
  return: [
    param('id')
      .isString()
      .withMessage('El ID debe ser una cadena válida'),
    
    body('notes')
      .optional()
      .trim()
      .isLength({ max: 500 })
      .withMessage('Las notas no pueden exceder 500 caracteres'),
  ],

  // Validación para obtener préstamo por ID
  getById: [
    param('id')
      .isString()
      .withMessage('El ID debe ser una cadena válida'),
  ],

  // Validación para listar préstamos
  list: [
    query('page')
      .optional()
      .isInt({ min: 1 })
      .withMessage('La página debe ser un número entero mayor a 0'),
    
    query('limit')
      .optional()
      .isInt({ min: 1, max: 100 })
      .withMessage('El límite debe ser un número entre 1 y 100'),
    
    query('status')
      .optional()
      .isIn(['ACTIVO', 'DEVUELTO', 'VENCIDO', 'PERDIDO'])
      .withMessage('El estado debe ser ACTIVO, DEVUELTO, VENCIDO o PERDIDO'),
    
    query('userId')
      .optional()
      .isString()
      .withMessage('El ID del usuario debe ser una cadena válida'),
    
    query('bookId')
      .optional()
      .isString()
      .withMessage('El ID del libro debe ser una cadena válida'),
    
    query('overdue')
      .optional()
      .isBoolean()
      .withMessage('overdue debe ser un valor booleano'),
    
    query('startDate')
      .optional()
      .isISO8601()
      .withMessage('La fecha de inicio debe ser una fecha válida'),
    
    query('endDate')
      .optional()
      .isISO8601()
      .withMessage('La fecha de fin debe ser una fecha válida'),
  ],

  // Validación para obtener préstamos de un usuario
  getUserLoans: [
    param('userId')
      .isString()
      .withMessage('El ID del usuario debe ser una cadena válida'),
    
    query('status')
      .optional()
      .isIn(['ACTIVO', 'DEVUELTO', 'VENCIDO', 'PERDIDO'])
      .withMessage('El estado debe ser ACTIVO, DEVUELTO, VENCIDO o PERDIDO'),
  ],

  // Validación para marcar como perdido
  markAsLost: [
    param('id')
      .isString()
      .withMessage('El ID debe ser una cadena válida'),
    
    body('notes')
      .optional()
      .trim()
      .isLength({ max: 500 })
      .withMessage('Las notas no pueden exceder 500 caracteres'),
  ],

  // Validación para renovar préstamo
  renew: [
    param('id')
      .isString()
      .withMessage('El ID debe ser una cadena válida'),
    
    body('dueDate')
      .isISO8601()
      .withMessage('La nueva fecha de devolución debe ser una fecha válida')
      .custom((value) => {
        const dueDate = new Date(value);
        const today = new Date();
        if (dueDate <= today) {
          throw new Error('La nueva fecha de devolución debe ser posterior a hoy');
        }
        return true;
      }),
    
    body('notes')
      .optional()
      .trim()
      .isLength({ max: 500 })
      .withMessage('Las notas no pueden exceder 500 caracteres'),
  ],
};

module.exports = loanValidator;
