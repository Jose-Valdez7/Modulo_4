const bookService = require('../services/bookService');
const { validationResult } = require('express-validator');

class BookController {
  // POST /api/books
  async createBook(req, res) {
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

      // Validar datos del libro
      const validationErrors = bookService.validateBookData(req.body);
      if (validationErrors.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'Datos del libro inválidos',
          errors: validationErrors,
        });
      }

      const bookData = req.body;
      const book = await bookService.createBook(bookData);

      res.status(201).json({
        success: true,
        message: 'Libro creado exitosamente',
        data: book,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // GET /api/books/:id
  async getBookById(req, res) {
    try {
      const { id } = req.params;
      const book = await bookService.getBookById(id);

      res.status(200).json({
        success: true,
        data: book,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  // GET /api/books/isbn/:isbn
  async getBookByIsbn(req, res) {
    try {
      const { isbn } = req.params;
      const book = await bookService.getBookByIsbn(isbn);

      res.status(200).json({
        success: true,
        data: book,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  // GET /api/books
  async getAllBooks(req, res) {
    try {
      const { page = 1, limit = 10, search = '', category = '', available = false } = req.query;
      const result = await bookService.getAllBooks(
        parseInt(page),
        parseInt(limit),
        search,
        category,
        available === 'true'
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

  // GET /api/books/category/:category
  async getBooksByCategory(req, res) {
    try {
      const { category } = req.params;
      const { page = 1, limit = 10 } = req.query;
      const result = await bookService.getBooksByCategory(
        category,
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

  // GET /api/books/available
  async getAvailableBooks(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const result = await bookService.getAvailableBooks(
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

  // PUT /api/books/:id
  async updateBook(req, res) {
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
      const book = await bookService.updateBook(id, updateData);

      res.status(200).json({
        success: true,
        message: 'Libro actualizado exitosamente',
        data: book,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // DELETE /api/books/:id
  async deleteBook(req, res) {
    try {
      const { id } = req.params;
      const book = await bookService.deleteBook(id);

      res.status(200).json({
        success: true,
        message: 'Libro eliminado exitosamente',
        data: book,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // PUT /api/books/:id/restore
  async restoreBook(req, res) {
    try {
      const { id } = req.params;
      const book = await bookService.restoreBook(id);

      res.status(200).json({
        success: true,
        message: 'Libro restaurado exitosamente',
        data: book,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // PUT /api/books/:id/stock
  async updateStock(req, res) {
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
      const { quantity } = req.body;
      
      if (quantity === undefined || quantity === null) {
        return res.status(400).json({
          success: false,
          message: 'Cantidad requerida',
        });
      }

      const book = await bookService.updateStock(id, parseInt(quantity));

      res.status(200).json({
        success: true,
        message: 'Stock actualizado exitosamente',
        data: book,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // GET /api/books/:id/availability
  async checkAvailability(req, res) {
    try {
      const { id } = req.params;
      const isAvailable = await bookService.checkAvailability(id);

      res.status(200).json({
        success: true,
        data: {
          bookId: id,
          isAvailable,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // GET /api/books/stats/overview
  async getBookStats(req, res) {
    try {
      const stats = await bookService.getBookStats();

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

  // GET /api/books/popular
  async getPopularBooks(req, res) {
    try {
      const { limit = 10 } = req.query;
      const books = await bookService.getPopularBooks(parseInt(limit));

      res.status(200).json({
        success: true,
        data: books,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // GET /api/books/year/:year
  async getBooksByYear(req, res) {
    try {
      const { year } = req.params;
      const { page = 1, limit = 10 } = req.query;
      const result = await bookService.getBooksByYear(
        parseInt(year),
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

  // GET /api/books/search
  async searchBooks(req, res) {
    try {
      const { q: searchTerm, page = 1, limit = 10 } = req.query;
      
      if (!searchTerm) {
        return res.status(400).json({
          success: false,
          message: 'Término de búsqueda requerido',
        });
      }

      const result = await bookService.searchBooks(
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

  // GET /api/books/categories
  async getCategories(req, res) {
    try {
      const categories = await bookService.getCategories();

      res.status(200).json({
        success: true,
        data: categories,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // GET /api/books/years
  async getPublicationYears(req, res) {
    try {
      const years = await bookService.getPublicationYears();

      res.status(200).json({
        success: true,
        data: years,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // GET /api/books/export
  async exportBooks(req, res) {
    try {
      const { format = 'json', category = '', available = false } = req.query;
      
      // Por ahora solo soportamos JSON, pero aquí se podría implementar CSV, Excel, etc.
      if (format !== 'json') {
        return res.status(400).json({
          success: false,
          message: 'Formato no soportado. Solo se admite JSON',
        });
      }

      const result = await bookService.getAllBooks(1, 1000, '', category, available === 'true');

      res.status(200).json({
        success: true,
        data: result.books,
        exportInfo: {
          format,
          totalBooks: result.total,
          exportDate: new Date().toISOString(),
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new BookController();
