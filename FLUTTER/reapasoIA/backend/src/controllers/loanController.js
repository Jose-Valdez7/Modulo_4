const loanService = require('../services/loanService');
const { validationResult } = require('express-validator');

class LoanController {
  // POST /api/loans
  async createLoan(req, res) {
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

      // Validar datos del préstamo
      const validationErrors = loanService.validateLoanData(req.body);
      if (validationErrors.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'Datos del préstamo inválidos',
          errors: validationErrors,
        });
      }

      const loanData = req.body;
      const createdById = req.user.id; // ID del usuario autenticado
      const loan = await loanService.createLoan(loanData, createdById);

      res.status(201).json({
        success: true,
        message: 'Préstamo creado exitosamente',
        data: loan,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // GET /api/loans/:id
  async getLoanById(req, res) {
    try {
      const { id } = req.params;
      const loan = await loanService.getLoanById(id);

      res.status(200).json({
        success: true,
        data: loan,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  // GET /api/loans
  async getAllLoans(req, res) {
    try {
      const { page = 1, limit = 10, status = '', userId = '', bookId = '' } = req.query;
      const result = await loanService.getAllLoans(
        parseInt(page),
        parseInt(limit),
        status,
        userId,
        bookId
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

  // GET /api/loans/user/:userId
  async getLoansByUser(req, res) {
    try {
      const { userId } = req.params;
      const { page = 1, limit = 10, status = '' } = req.query;
      const result = await loanService.getLoansByUser(
        userId,
        parseInt(page),
        parseInt(limit),
        status
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

  // GET /api/loans/book/:bookId
  async getLoansByBook(req, res) {
    try {
      const { bookId } = req.params;
      const { page = 1, limit = 10 } = req.query;
      const result = await loanService.getLoansByBook(
        bookId,
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

  // GET /api/loans/active
  async getActiveLoans(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const result = await loanService.getActiveLoans(
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

  // GET /api/loans/overdue
  async getOverdueLoans(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const result = await loanService.getOverdueLoans(
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

  // PUT /api/loans/:id/return
  async returnBook(req, res) {
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
      const { returnDate, notes } = req.body;
      
      const returnDateObj = returnDate ? new Date(returnDate) : new Date();
      const loan = await loanService.returnBook(id, returnDateObj, notes);

      res.status(200).json({
        success: true,
        message: 'Libro devuelto exitosamente',
        data: loan,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // PUT /api/loans/:id/lost
  async markBookAsLost(req, res) {
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
      const { notes } = req.body;
      
      const loan = await loanService.markBookAsLost(id, notes);

      res.status(200).json({
        success: true,
        message: 'Libro marcado como perdido exitosamente',
        data: loan,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // PUT /api/loans/:id/renew
  async renewLoan(req, res) {
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
      const { newDueDate } = req.body;
      
      if (!newDueDate) {
        return res.status(400).json({
          success: false,
          message: 'Nueva fecha de vencimiento requerida',
        });
      }

      const loan = await loanService.renewLoan(id, new Date(newDueDate));

      res.status(200).json({
        success: true,
        message: 'Préstamo renovado exitosamente',
        data: loan,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // PUT /api/loans/:id
  async updateLoan(req, res) {
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
      const loan = await loanService.updateLoan(id, updateData);

      res.status(200).json({
        success: true,
        message: 'Préstamo actualizado exitosamente',
        data: loan,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // DELETE /api/loans/:id
  async deleteLoan(req, res) {
    try {
      const { id } = req.params;
      const result = await loanService.deleteLoan(id);

      res.status(200).json({
        success: true,
        message: 'Préstamo eliminado exitosamente',
        data: result,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // GET /api/loans/stats/overview
  async getLoanStats(req, res) {
    try {
      const stats = await loanService.getLoanStats();

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

  // GET /api/loans/can-borrow/:userId
  async canUserBorrow(req, res) {
    try {
      const { userId } = req.params;
      const canBorrow = await loanService.canUserBorrow(userId);

      res.status(200).json({
        success: true,
        data: {
          userId,
          canBorrow,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // GET /api/loans/expiring-soon
  async getExpiringLoans(req, res) {
    try {
      const { days = 3 } = req.query;
      const loans = await loanService.getExpiringLoans(parseInt(days));

      res.status(200).json({
        success: true,
        data: loans,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // GET /api/loans/date-range
  async getLoansByDateRange(req, res) {
    try {
      const { startDate, endDate, page = 1, limit = 10 } = req.query;
      
      if (!startDate || !endDate) {
        return res.status(400).json({
          success: false,
          message: 'Fechas de inicio y fin son requeridas',
        });
      }

      const result = await loanService.getLoansByDateRange(
        new Date(startDate),
        new Date(endDate),
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

  // GET /api/loans/user/:userId/history
  async getUserLoanHistory(req, res) {
    try {
      const { userId } = req.params;
      const { page = 1, limit = 10 } = req.query;
      const result = await loanService.getUserLoanHistory(
        userId,
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

  // GET /api/loans/status/:status
  async getLoansByStatus(req, res) {
    try {
      const { status } = req.params;
      const { page = 1, limit = 10 } = req.query;
      const result = await loanService.getLoansByStatus(
        status,
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

  // GET /api/loans/my-loans
  async getMyLoans(req, res) {
    try {
      const userId = req.user.id;
      const { page = 1, limit = 10, status = '' } = req.query;
      const result = await loanService.getLoansByUser(
        userId,
        parseInt(page),
        parseInt(limit),
        status
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

  // GET /api/loans/export
  async exportLoans(req, res) {
    try {
      const { format = 'json', status = '', startDate = '', endDate = '' } = req.query;
      
      // Por ahora solo soportamos JSON
      if (format !== 'json') {
        return res.status(400).json({
          success: false,
          message: 'Formato no soportado. Solo se admite JSON',
        });
      }

      let result;
      if (startDate && endDate) {
        result = await loanService.getLoansByDateRange(
          new Date(startDate),
          new Date(endDate),
          1,
          1000
        );
      } else if (status) {
        result = await loanService.getLoansByStatus(status, 1, 1000);
      } else {
        result = await loanService.getAllLoans(1, 1000);
      }

      res.status(200).json({
        success: true,
        data: result.loans,
        exportInfo: {
          format,
          totalLoans: result.total,
          exportDate: new Date().toISOString(),
          filters: {
            status,
            startDate,
            endDate,
          },
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // GET /api/loans/overdue-days/:loanId
  async getOverdueDays(req, res) {
    try {
      const { loanId } = req.params;
      const loan = await loanService.getLoanById(loanId);
      
      if (!loan) {
        return res.status(404).json({
          success: false,
          message: 'Préstamo no encontrado',
        });
      }

      const overdueDays = loanService.calculateOverdueDays(loan.dueDate);
      const isOverdue = loanService.isOverdue(loan.dueDate);

      res.status(200).json({
        success: true,
        data: {
          loanId,
          dueDate: loan.dueDate,
          overdueDays,
          isOverdue,
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

module.exports = new LoanController();
