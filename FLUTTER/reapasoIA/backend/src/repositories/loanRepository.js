const prisma = require('../database/client');

class LoanRepository {
  // Crear préstamo
  async create(loanData) {
    return await prisma.loan.create({
      data: loanData,
      include: {
        book: true,
        user: true,
        createdBy: true,
      },
    });
  }

  // Buscar préstamo por ID
  async findById(id) {
    return await prisma.loan.findUnique({
      where: { id },
      include: {
        book: true,
        user: true,
        createdBy: true,
      },
    });
  }

  // Obtener todos los préstamos con paginación y filtros
  async findAll(page = 1, limit = 10, status = '', userId = '', bookId = '') {
    const skip = (page - 1) * limit;
    
    const where = {};
    if (status) where.status = status;
    if (userId) where.userId = userId;
    if (bookId) where.bookId = bookId;

    const [loans, total] = await Promise.all([
      prisma.loan.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          book: true,
          user: true,
          createdBy: true,
        },
      }),
      prisma.loan.count({ where }),
    ]);

    return {
      loans,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  // Obtener préstamos por usuario
  async findByUser(userId, page = 1, limit = 10, status = '') {
    const skip = (page - 1) * limit;
    
    const where = { userId };
    if (status) where.status = status;

    const [loans, total] = await Promise.all([
      prisma.loan.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          book: true,
          createdBy: true,
        },
      }),
      prisma.loan.count({ where }),
    ]);

    return {
      loans,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  // Obtener préstamos por libro
  async findByBook(bookId, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    
    const [loans, total] = await Promise.all([
      prisma.loan.findMany({
        where: { bookId },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: true,
          createdBy: true,
        },
      }),
      prisma.loan.count({ where: { bookId } }),
    ]);

    return {
      loans,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  // Obtener préstamos activos
  async findActive(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    
    const [loans, total] = await Promise.all([
      prisma.loan.findMany({
        where: { status: 'ACTIVO' },
        skip,
        take: limit,
        orderBy: { dueDate: 'asc' },
        include: {
          book: true,
          user: true,
          createdBy: true,
        },
      }),
      prisma.loan.count({ where: { status: 'ACTIVO' } }),
    ]);

    return {
      loans,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  // Obtener préstamos vencidos
  async findOverdue(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const today = new Date();
    
    const [loans, total] = await Promise.all([
      prisma.loan.findMany({
        where: {
          status: 'ACTIVO',
          dueDate: { lt: today },
        },
        skip,
        take: limit,
        orderBy: { dueDate: 'asc' },
        include: {
          book: true,
          user: true,
          createdBy: true,
        },
      }),
      prisma.loan.count({
        where: {
          status: 'ACTIVO',
          dueDate: { lt: today },
        },
      }),
    ]);

    return {
      loans,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  // Actualizar préstamo
  async update(id, loanData) {
    return await prisma.loan.update({
      where: { id },
      data: loanData,
      include: {
        book: true,
        user: true,
        createdBy: true,
      },
    });
  }

  // Devolver libro
  async returnBook(id, returnDate = new Date(), notes = '') {
    const loan = await prisma.loan.findUnique({
      where: { id },
      include: { book: true },
    });

    if (!loan) throw new Error('Préstamo no encontrado');
    if (loan.status !== 'ACTIVO') throw new Error('El préstamo no está activo');

    // Actualizar estado del préstamo
    const updatedLoan = await prisma.loan.update({
      where: { id },
      data: {
        status: 'DEVUELTO',
        returnDate,
        notes: notes || loan.notes,
      },
      include: {
        book: true,
        user: true,
        createdBy: true,
      },
    });

    // Incrementar stock disponible del libro
    await prisma.book.update({
      where: { id: loan.bookId },
      data: {
        availableStock: {
          increment: 1,
        },
      },
    });

    return updatedLoan;
  }

  // Marcar libro como perdido
  async markAsLost(id, notes = '') {
    const loan = await prisma.loan.findUnique({
      where: { id },
      include: { book: true },
    });

    if (!loan) throw new Error('Préstamo no encontrado');
    if (loan.status !== 'ACTIVO') throw new Error('El préstamo no está activo');

    // Actualizar estado del préstamo
    const updatedLoan = await prisma.loan.update({
      where: { id },
      data: {
        status: 'PERDIDO',
        notes: notes || loan.notes,
      },
      include: {
        book: true,
        user: true,
        createdBy: true,
      },
    });

    // Reducir stock total del libro (no disponible)
    await prisma.book.update({
      where: { id: loan.bookId },
      data: {
        stock: {
          decrement: 1,
        },
      },
    });

    return updatedLoan;
  }

  // Renovar préstamo
  async renewLoan(id, newDueDate) {
    const loan = await prisma.loan.findUnique({
      where: { id },
    });

    if (!loan) throw new Error('Préstamo no encontrado');
    if (loan.status !== 'ACTIVO') throw new Error('El préstamo no está activo');

    return await prisma.loan.update({
      where: { id },
      data: { dueDate: newDueDate },
      include: {
        book: true,
        user: true,
        createdBy: true,
      },
    });
  }

  // Eliminar préstamo
  async delete(id) {
    return await prisma.loan.delete({
      where: { id },
    });
  }

  // Obtener estadísticas de préstamos
  async getStats() {
    const today = new Date();
    
    const [totalLoans, activeLoans, returnedLoans, overdueLoans, lostLoans] = await Promise.all([
      prisma.loan.count(),
      prisma.loan.count({ where: { status: 'ACTIVO' } }),
      prisma.loan.count({ where: { status: 'DEVUELTO' } }),
      prisma.loan.count({
        where: {
          status: 'ACTIVO',
          dueDate: { lt: today },
        },
      }),
      prisma.loan.count({ where: { status: 'PERDIDO' } }),
    ]);

    // Obtener préstamos por mes (últimos 12 meses)
    const monthlyLoans = await prisma.loan.groupBy({
      by: ['createdAt'],
      where: {
        createdAt: {
          gte: new Date(today.getFullYear(), today.getMonth() - 11, 1),
        },
      },
      _count: { id: true },
    });

    // Obtener libros más prestados
    const popularBooks = await prisma.loan.groupBy({
      by: ['bookId'],
      _count: { id: true },
      orderBy: {
        _count: {
          id: 'desc',
        },
      },
      take: 10,
    });

    return {
      totalLoans,
      activeLoans,
      returnedLoans,
      overdueLoans,
      lostLoans,
      monthlyLoans: monthlyLoans.map(month => ({
        month: month.createdAt.toISOString().slice(0, 7),
        count: month._count.id,
      })),
      popularBooks,
    };
  }

  // Verificar si usuario puede prestar más libros
  async canUserBorrow(userId, maxLoans = 3) {
    const activeLoans = await prisma.loan.count({
      where: {
        userId,
        status: 'ACTIVO',
      },
    });

    return activeLoans < maxLoans;
  }

  // Obtener préstamos próximos a vencer
  async findExpiringSoon(days = 3) {
    const today = new Date();
    const expiringDate = new Date(today.getTime() + (days * 24 * 60 * 60 * 1000));
    
    return await prisma.loan.findMany({
      where: {
        status: 'ACTIVO',
        dueDate: {
          gte: today,
          lte: expiringDate,
        },
      },
      include: {
        book: true,
        user: true,
        createdBy: true,
      },
      orderBy: { dueDate: 'asc' },
    });
  }

  // Buscar préstamos por rango de fechas
  async findByDateRange(startDate, endDate, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    
    const [loans, total] = await Promise.all([
      prisma.loan.findMany({
        where: {
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          book: true,
          user: true,
          createdBy: true,
        },
      }),
      prisma.loan.count({
        where: {
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        },
      }),
    ]);

    return {
      loans,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}

module.exports = new LoanRepository();
