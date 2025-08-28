const loanRepository = require('../repositories/loanRepository');
const bookRepository = require('../repositories/bookRepository');
const userRepository = require('../repositories/userRepository');
const LoanDTO = require('../dto/loan.dto');
const config = require('../config');

class LoanService {
  // Crear préstamo
  async createLoan(loanData, createdById) {
    try {
      // Verificar si el usuario existe y está activo
      const user = await userRepository.findById(loanData.userId);
      if (!user) {
        throw new Error('Usuario no encontrado');
      }
      if (!user.isActive) {
        throw new Error('Usuario inactivo');
      }

      // Verificar si el libro existe y está activo
      const book = await bookRepository.findById(loanData.bookId);
      if (!book) {
        throw new Error('Libro no encontrado');
      }
      if (!book.isActive) {
        throw new Error('Libro inactivo');
      }

      // Verificar disponibilidad del libro
      if (book.availableStock <= 0) {
        throw new Error('No hay ejemplares disponibles de este libro');
      }

      // Verificar si el usuario puede prestar más libros
      const canBorrow = await loanRepository.canUserBorrow(loanData.userId, config.business.maxLoansPerStudent);
      if (!canBorrow) {
        throw new Error(`El usuario ya tiene el máximo de ${config.business.maxLoansPerStudent} préstamos activos`);
      }

      // Calcular fecha de vencimiento
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + config.business.defaultLoanDays);

      // Crear el préstamo
      const loan = await loanRepository.create({
        ...loanData,
        createdById,
        dueDate,
        status: 'ACTIVO',
      });

      // Reducir stock disponible del libro
      await bookRepository.updateStock(loanData.bookId, -1);

      return LoanDTO.toResponse(loan);
    } catch (error) {
      throw error;
    }
  }

  // Obtener préstamo por ID
  async getLoanById(id) {
    try {
      const loan = await loanRepository.findById(id);
      if (!loan) {
        throw new Error('Préstamo no encontrado');
      }

      return LoanDTO.toResponse(loan);
    } catch (error) {
      throw error;
    }
  }

  // Obtener todos los préstamos
  async getAllLoans(page = 1, limit = 10, status = '', userId = '', bookId = '') {
    try {
      const result = await loanRepository.findAll(page, limit, status, userId, bookId);
      
      return {
        ...result,
        loans: result.loans.map(loan => LoanDTO.toResponse(loan)),
      };
    } catch (error) {
      throw error;
    }
  }

  // Obtener préstamos por usuario
  async getLoansByUser(userId, page = 1, limit = 10, status = '') {
    try {
      const result = await loanRepository.findByUser(userId, page, limit, status);
      
      return {
        ...result,
        loans: result.loans.map(loan => LoanDTO.toResponse(loan)),
      };
    } catch (error) {
      throw error;
    }
  }

  // Obtener préstamos por libro
  async getLoansByBook(bookId, page = 1, limit = 10) {
    try {
      const result = await loanRepository.findByBook(bookId, page, limit);
      
      return {
        ...result,
        loans: result.loans.map(loan => LoanDTO.toResponse(loan)),
      };
    } catch (error) {
      throw error;
    }
  }

  // Obtener préstamos activos
  async getActiveLoans(page = 1, limit = 10) {
    try {
      const result = await loanRepository.findActive(page, limit);
      
      return {
        ...result,
        loans: result.loans.map(loan => LoanDTO.toResponse(loan)),
      };
    } catch (error) {
      throw error;
    }
  }

  // Obtener préstamos vencidos
  async getOverdueLoans(page = 1, limit = 10) {
    try {
      const result = await loanRepository.findOverdue(page, limit);
      
      return {
        ...result,
        loans: result.loans.map(loan => LoanDTO.toResponse(loan)),
      };
    } catch (error) {
      throw error;
    }
  }

  // Devolver libro
  async returnBook(loanId, returnDate = new Date(), notes = '') {
    try {
      const loan = await loanRepository.findById(loanId);
      if (!loan) {
        throw new Error('Préstamo no encontrado');
      }

      if (loan.status !== 'ACTIVO') {
        throw new Error('El préstamo no está activo');
      }

      // Devolver el libro
      const returnedLoan = await loanRepository.returnBook(loanId, returnDate, notes);
      
      return LoanDTO.toResponse(returnedLoan);
    } catch (error) {
      throw error;
    }
  }

  // Marcar libro como perdido
  async markBookAsLost(loanId, notes = '') {
    try {
      const loan = await loanRepository.findById(loanId);
      if (!loan) {
        throw new Error('Préstamo no encontrado');
      }

      if (loan.status !== 'ACTIVO') {
        throw new Error('El préstamo no está activo');
      }

      // Marcar como perdido
      const lostLoan = await loanRepository.markAsLost(loanId, notes);
      
      return LoanDTO.toResponse(lostLoan);
    } catch (error) {
      throw error;
    }
  }

  // Renovar préstamo
  async renewLoan(loanId, newDueDate) {
    try {
      const loan = await loanRepository.findById(loanId);
      if (!loan) {
        throw new Error('Préstamo no encontrado');
      }

      if (loan.status !== 'ACTIVO') {
        throw new Error('El préstamo no está activo');
      }

      // Verificar que la nueva fecha no sea anterior a la fecha actual
      const today = new Date();
      if (newDueDate <= today) {
        throw new Error('La nueva fecha de vencimiento debe ser posterior a la fecha actual');
      }

      // Renovar el préstamo
      const renewedLoan = await loanRepository.renewLoan(loanId, newDueDate);
      
      return LoanDTO.toResponse(renewedLoan);
    } catch (error) {
      throw error;
    }
  }

  // Actualizar préstamo
  async updateLoan(id, updateData) {
    try {
      const loan = await loanRepository.findById(id);
      if (!loan) {
        throw new Error('Préstamo no encontrado');
      }

      // Validar cambios permitidos
      if (updateData.status && !['ACTIVO', 'DEVUELTO', 'VENCIDO', 'PERDIDO'].includes(updateData.status)) {
        throw new Error('Estado de préstamo inválido');
      }

      // Si se cambia el estado a DEVUELTO, manejar stock
      if (updateData.status === 'DEVUELTO' && loan.status === 'ACTIVO') {
        await bookRepository.updateStock(loan.bookId, 1);
      }

      // Si se cambia el estado a PERDIDO, manejar stock
      if (updateData.status === 'PERDIDO' && loan.status === 'ACTIVO') {
        // El stock ya se maneja en markAsLost, pero aquí también lo manejamos
        await bookRepository.updateStock(loan.bookId, -1);
      }

      const updatedLoan = await loanRepository.update(id, updateData);
      return LoanDTO.toResponse(updatedLoan);
    } catch (error) {
      throw error;
    }
  }

  // Eliminar préstamo
  async deleteLoan(id) {
    try {
      const loan = await loanRepository.findById(id);
      if (!loan) {
        throw new Error('Préstamo no encontrado');
      }

      // Si el préstamo está activo, restaurar stock
      if (loan.status === 'ACTIVO') {
        await bookRepository.updateStock(loan.bookId, 1);
      }

      await loanRepository.delete(id);
      return { message: 'Préstamo eliminado correctamente' };
    } catch (error) {
      throw error;
    }
  }

  // Obtener estadísticas de préstamos
  async getLoanStats() {
    try {
      return await loanRepository.getStats();
    } catch (error) {
      throw error;
    }
  }

  // Verificar si usuario puede prestar
  async canUserBorrow(userId) {
    try {
      return await loanRepository.canUserBorrow(userId, config.business.maxLoansPerStudent);
    } catch (error) {
      throw error;
    }
  }

  // Obtener préstamos próximos a vencer
  async getExpiringLoans(days = 3) {
    try {
      const loans = await loanRepository.findExpiringSoon(days);
      return loans.map(loan => LoanDTO.toResponse(loan));
    } catch (error) {
      throw error;
    }
  }

  // Buscar préstamos por rango de fechas
  async getLoansByDateRange(startDate, endDate, page = 1, limit = 10) {
    try {
      const result = await loanRepository.findByDateRange(startDate, endDate, page, limit);
      
      return {
        ...result,
        loans: result.loans.map(loan => LoanDTO.toResponse(loan)),
      };
    } catch (error) {
      throw error;
    }
  }

  // Obtener historial de préstamos de un usuario
  async getUserLoanHistory(userId, page = 1, limit = 10) {
    try {
      const result = await loanRepository.findByUser(userId, page, limit);
      
      return {
        ...result,
        loans: result.loans.map(loan => LoanDTO.toResponse(loan)),
      };
    } catch (error) {
      throw error;
    }
  }

  // Obtener préstamos por estado
  async getLoansByStatus(status, page = 1, limit = 10) {
    try {
      const result = await loanRepository.findAll(page, limit, status);
      
      return {
        ...result,
        loans: result.loans.map(loan => LoanDTO.toResponse(loan)),
      };
    } catch (error) {
      throw error;
    }
  }

  // Validar datos del préstamo
  validateLoanData(loanData) {
    const errors = [];

    if (!loanData.userId) {
      errors.push('El ID del usuario es obligatorio');
    }

    if (!loanData.bookId) {
      errors.push('El ID del libro es obligatorio');
    }

    if (loanData.dueDate) {
      const dueDate = new Date(loanData.dueDate);
      const today = new Date();
      if (dueDate <= today) {
        errors.push('La fecha de vencimiento debe ser posterior a la fecha actual');
      }
    }

    if (loanData.status && !['ACTIVO', 'DEVUELTO', 'VENCIDO', 'PERDIDO'].includes(loanData.status)) {
      errors.push('Estado de préstamo inválido');
    }

    return errors;
  }

  // Calcular días de retraso
  calculateOverdueDays(dueDate) {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = today - due;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  }

  // Verificar si un préstamo está vencido
  isOverdue(dueDate) {
    const today = new Date();
    const due = new Date(dueDate);
    return today > due;
  }
}

module.exports = new LoanService();
