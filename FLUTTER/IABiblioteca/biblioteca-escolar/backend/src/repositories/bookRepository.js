const prisma = require('../database/client');

class BookRepository {
  // Crear libro
  async create(bookData) {
    return await prisma.book.create({
      data: bookData,
    });
  }

  // Buscar libro por ID
  async findById(id) {
    return await prisma.book.findUnique({
      where: { id },
      include: {
        loans: {
          include: {
            user: true,
          },
        },
      },
    });
  }

  // Buscar libro por ISBN
  async findByIsbn(isbn) {
    return await prisma.book.findUnique({
      where: { isbn },
    });
  }

  // Obtener todos los libros con paginación y filtros
  async findAll(page = 1, limit = 10, search = '', category = '', availableOnly = false) {
    const skip = (page - 1) * limit;
    
    const where = {
      isActive: true,
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { author: { contains: search, mode: 'insensitive' } },
          { isbn: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ],
      }),
      ...(category && { category }),
      ...(availableOnly && { availableStock: { gt: 0 } }),
    };

    const [books, total] = await Promise.all([
      prisma.book.findMany({
        where,
        skip,
        take: limit,
        orderBy: { title: 'asc' },
        include: {
          _count: {
            select: { loans: true },
          },
        },
      }),
      prisma.book.count({ where }),
    ]);

    return {
      books,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  // Obtener libros por categoría
  async findByCategory(category, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    
    const [books, total] = await Promise.all([
      prisma.book.findMany({
        where: { 
          category,
          isActive: true,
        },
        skip,
        take: limit,
        orderBy: { title: 'asc' },
        include: {
          _count: {
            select: { loans: true },
          },
        },
      }),
      prisma.book.count({ 
        where: { 
          category,
          isActive: true,
        } 
      }),
    ]);

    return {
      books,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  // Obtener libros disponibles
  async findAvailable(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    
    const [books, total] = await Promise.all([
      prisma.book.findMany({
        where: {
          isActive: true,
          availableStock: { gt: 0 },
        },
        skip,
        take: limit,
        orderBy: { title: 'asc' },
        include: {
          _count: {
            select: { loans: true },
          },
        },
      }),
      prisma.book.count({
        where: {
          isActive: true,
          availableStock: { gt: 0 },
        },
      }),
    ]);

    return {
      books,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  // Actualizar libro
  async update(id, bookData) {
    return await prisma.book.update({
      where: { id },
      data: bookData,
    });
  }

  // Eliminar libro (soft delete)
  async delete(id) {
    return await prisma.book.update({
      where: { id },
      data: { isActive: false },
    });
  }

  // Restaurar libro
  async restore(id) {
    return await prisma.book.update({
      where: { id },
      data: { isActive: true },
    });
  }

  // Actualizar stock disponible
  async updateStock(id, quantity) {
    const book = await prisma.book.findUnique({ where: { id } });
    if (!book) throw new Error('Libro no encontrado');

    const newAvailableStock = Math.max(0, book.availableStock + quantity);
    
    return await prisma.book.update({
      where: { id },
      data: { availableStock: newAvailableStock },
    });
  }

  // Verificar disponibilidad
  async checkAvailability(id) {
    const book = await prisma.book.findUnique({
      where: { id },
      select: { availableStock: true, stock: true, isActive: true },
    });

    if (!book || !book.isActive) return false;
    return book.availableStock > 0;
  }

  // Obtener estadísticas de libros
  async getStats() {
    const [totalBooks, activeBooks, totalStock, availableStock, categories] = await Promise.all([
      prisma.book.count(),
      prisma.book.count({ where: { isActive: true } }),
      prisma.book.aggregate({
        where: { isActive: true },
        _sum: { stock: true },
      }),
      prisma.book.aggregate({
        where: { isActive: true },
        _sum: { availableStock: true },
      }),
      prisma.book.groupBy({
        by: ['category'],
        where: { isActive: true },
        _count: { id: true },
        _sum: { stock: true, availableStock: true },
      }),
    ]);

    return {
      totalBooks,
      activeBooks,
      totalStock: totalStock._sum.stock || 0,
      availableStock: availableStock._sum.availableStock || 0,
      borrowedStock: (totalStock._sum.stock || 0) - (availableStock._sum.availableStock || 0),
      categories: categories.map(cat => ({
        name: cat.category,
        count: cat._count.id,
        totalStock: cat._sum.stock,
        availableStock: cat._sum.availableStock,
      })),
    };
  }

  // Verificar si ISBN existe
  async isbnExists(isbn, excludeId = null) {
    const where = { isbn };
    if (excludeId) {
      where.id = { not: excludeId };
    }
    
    const book = await prisma.book.findFirst({ where });
    return !!book;
  }

  // Buscar libros populares (por número de préstamos)
  async findPopular(limit = 10) {
    return await prisma.book.findMany({
      where: { isActive: true },
      include: {
        _count: {
          select: { loans: true },
        },
      },
      orderBy: {
        loans: {
          _count: 'desc',
        },
      },
      take: limit,
    });
  }

  // Buscar libros por año de publicación
  async findByYear(year, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    
    const [books, total] = await Promise.all([
      prisma.book.findMany({
        where: {
          publishedYear: year,
          isActive: true,
        },
        skip,
        take: limit,
        orderBy: { title: 'asc' },
        include: {
          _count: {
            select: { loans: true },
          },
        },
      }),
      prisma.book.count({
        where: {
          publishedYear: year,
          isActive: true,
        },
      }),
    ]);

    return {
      books,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}

module.exports = new BookRepository();
