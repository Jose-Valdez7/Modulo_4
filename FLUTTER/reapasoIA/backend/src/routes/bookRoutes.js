const express = require('express');
const bookController = require('../controllers/bookController');
const bookValidator = require('../validators/book.validator');
const { authenticateToken, requireLibrarian } = require('../middleware/auth');

const router = express.Router();

// Rutas públicas (sin autenticación) - solo lectura
router.get('/', bookController.getAllBooks);
router.get('/available', bookController.getAvailableBooks);
router.get('/categories', bookController.getCategories);
router.get('/years', bookController.getPublicationYears);
router.get('/search', bookController.searchBooks);
router.get('/:id', bookController.getBookById);
router.get('/isbn/:isbn', bookController.getBookByIsbn);
router.get('/category/:category', bookController.getBooksByCategory);
router.get('/year/:year', bookController.getBooksByYear);
router.get('/popular', bookController.getPopularBooks);
router.get('/:id/availability', bookController.checkAvailability);

// Rutas protegidas (requieren autenticación)
router.use(authenticateToken);

// Rutas solo para bibliotecarios
router.post('/', requireLibrarian, bookValidator.create, bookController.createBook);
router.put('/:id', requireLibrarian, bookValidator.update, bookController.updateBook);
router.delete('/:id', requireLibrarian, bookController.deleteBook);
router.put('/:id/restore', requireLibrarian, bookController.restoreBook);
router.put('/:id/stock', requireLibrarian, bookValidator.stockUpdate, bookController.updateStock);
router.get('/stats/overview', requireLibrarian, bookController.getBookStats);
router.get('/export', requireLibrarian, bookController.exportBooks);

module.exports = router;
