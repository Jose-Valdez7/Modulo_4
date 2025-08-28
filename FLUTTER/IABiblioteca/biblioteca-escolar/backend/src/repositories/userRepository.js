const prisma = require('../database/client');

class UserRepository {
  // Crear usuario
  async create(userData) {
    return await prisma.user.create({
      data: userData,
    });
  }

  // Buscar usuario por ID
  async findById(id) {
    return await prisma.user.findUnique({
      where: { id },
      include: {
        loans: {
          include: {
            book: true,
          },
        },
      },
    });
  }

  // Buscar usuario por username
  async findByUsername(username) {
    return await prisma.user.findUnique({
      where: { username },
    });
  }

  // Buscar usuario por email
  async findByEmail(email) {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  // Obtener todos los usuarios con paginación
  async findAll(page = 1, limit = 10, search = '') {
    const skip = (page - 1) * limit;
    
    const where = search ? {
      OR: [
        { name: { contains: search, mode: 'insensitive' } },
        { username: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ],
    } : {};

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          _count: {
            select: { loans: true },
          },
        },
      }),
      prisma.user.count({ where }),
    ]);

    return {
      users,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  // Obtener usuarios por rol
  async findByRole(role, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where: { role },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          _count: {
            select: { loans: true },
          },
        },
      }),
      prisma.user.count({ where: { role } }),
    ]);

    return {
      users,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  // Actualizar usuario
  async update(id, userData) {
    return await prisma.user.update({
      where: { id },
      data: userData,
    });
  }

  // Eliminar usuario (soft delete)
  async delete(id) {
    return await prisma.user.update({
      where: { id },
      data: { isActive: false },
    });
  }

  // Restaurar usuario
  async restore(id) {
    return await prisma.user.update({
      where: { id },
      data: { isActive: true },
    });
  }

  // Obtener estadísticas de usuarios
  async getStats() {
    const [totalUsers, activeUsers, students, librarians] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { isActive: true } }),
      prisma.user.count({ where: { role: 'ESTUDIANTE' } }),
      prisma.user.count({ where: { role: 'BIBLIOTECARIO' } }),
    ]);

    return {
      totalUsers,
      activeUsers,
      students,
      librarians,
      inactiveUsers: totalUsers - activeUsers,
    };
  }

  // Verificar si username existe
  async usernameExists(username, excludeId = null) {
    const where = { username };
    if (excludeId) {
      where.id = { not: excludeId };
    }
    
    const user = await prisma.user.findFirst({ where });
    return !!user;
  }

  // Verificar si email existe
  async emailExists(email, excludeId = null) {
    if (!email) return false;
    
    const where = { email };
    if (excludeId) {
      where.id = { not: excludeId };
    }
    
    const user = await prisma.user.findFirst({ where });
    return !!user;
  }
}

module.exports = new UserRepository();
