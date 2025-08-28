const express = require('express');
const loanController = require('../controllers/loanController');
const loanValidator = require('../validators/loan.validator');
const { 
  authenticateToken, 
  requireLibrarian, 
  canModifyLoan, 
  canCreateLoan, 
  canAccessResource 
} = require('../middleware/auth');

const router = express.Router();

// Todas las rutas requieren autenticación
router.use(authenticateToken);

// Rutas para todos los usuarios autenticados
router.get('/my-loans', loanController.getMyLoans);
router.get('/:id', canModifyLoan, loanController.getLoanById);

// Rutas para crear préstamos (con autorización)
router.post('/', canCreateLoan, loanValidator.create, loanController.createLoan);

// Rutas para modificar préstamos (con autorización)
router.put('/:id/return', canModifyLoan, loanValidator.return, loanController.returnBook);
router.put('/:id/lost', canModifyLoan, loanValidator.markAsLost, loanController.markBookAsLost);
router.put('/:id/renew', canModifyLoan, loanValidator.renew, loanController.renewLoan);
router.put('/:id', canModifyLoan, loanValidator.update, loanController.updateLoan);

// Rutas solo para bibliotecarios
router.get('/', requireLibrarian, loanController.getAllLoans);
router.get('/active', requireLibrarian, loanController.getActiveLoans);
router.get('/overdue', requireLibrarian, loanController.getOverdueLoans);
router.get('/expiring-soon', requireLibrarian, loanController.getExpiringLoans);
router.get('/stats/overview', requireLibrarian, loanController.getLoanStats);
router.get('/export', requireLibrarian, loanController.exportLoans);

// Rutas para usuarios específicos (con autorización)
router.get('/user/:userId', canAccessResource('loan'), loanController.getLoansByUser);
router.get('/user/:userId/history', canAccessResource('loan'), loanController.getUserLoanHistory);
router.get('/book/:bookId', requireLibrarian, loanController.getLoansByBook);

// Rutas para filtros y búsquedas
router.get('/status/:status', requireLibrarian, loanController.getLoansByStatus);
router.get('/date-range', requireLibrarian, loanController.getLoansByDateRange);

// Rutas para verificación y utilidades
router.get('/can-borrow/:userId', requireLibrarian, loanController.canUserBorrow);
router.get('/overdue-days/:loanId', canModifyLoan, loanController.getOverdueDays);

// Ruta para eliminar préstamos (solo bibliotecarios)
router.delete('/:id', requireLibrarian, loanController.deleteLoan);

module.exports = router;
