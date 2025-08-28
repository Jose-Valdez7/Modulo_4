const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed de la base de datos...');

  try {
    // Limpiar base de datos
    await prisma.loan.deleteMany();
    await prisma.book.deleteMany();
    await prisma.user.deleteMany();

    console.log('🧹 Base de datos limpiada');

    // Crear usuarios de prueba
    const hashedPassword = await bcrypt.hash('password123', 12);

    const librarian = await prisma.user.create({
      data: {
        username: 'bibliotecario',
        email: 'bibliotecario@escuela.edu',
        password: hashedPassword,
        name: 'María González',
        role: 'BIBLIOTECARIO',
        isActive: true,
      },
    });

    const student1 = await prisma.user.create({
      data: {
        username: 'estudiante1',
        email: 'estudiante1@escuela.edu',
        password: hashedPassword,
        name: 'Juan Pérez',
        role: 'ESTUDIANTE',
        isActive: true,
      },
    });

    const student2 = await prisma.user.create({
      data: {
        username: 'estudiante2',
        email: 'estudiante2@escuela.edu',
        password: hashedPassword,
        name: 'Ana Rodríguez',
        role: 'ESTUDIANTE',
        isActive: true,
      },
    });

    console.log('👥 Usuarios creados:', {
      bibliotecario: librarian.username,
      estudiante1: student1.username,
      estudiante2: student2.username,
    });

    // Crear libros de prueba
    const books = await Promise.all([
      prisma.book.create({
        data: {
          title: 'El Quijote',
          author: 'Miguel de Cervantes',
          isbn: '978-84-376-0494-7',
          description: 'Obra maestra de la literatura española',
          category: 'Literatura Clásica',
          publishedYear: 1605,
          stock: 5,
          availableStock: 5,
          isActive: true,
        },
      }),
      prisma.book.create({
        data: {
          title: 'Cien años de soledad',
          author: 'Gabriel García Márquez',
          isbn: '978-84-397-2077-7',
          description: 'Novela del realismo mágico',
          category: 'Literatura Contemporánea',
          publishedYear: 1967,
          stock: 3,
          availableStock: 3,
          isActive: true,
        },
      }),
      prisma.book.create({
        data: {
          title: 'Harry Potter y la piedra filosofal',
          author: 'J.K. Rowling',
          isbn: '978-84-9838-095-2',
          description: 'Primera novela de la saga de Harry Potter',
          category: 'Literatura Juvenil',
          publishedYear: 1997,
          stock: 8,
          availableStock: 8,
          isActive: true,
        },
      }),
      prisma.book.create({
        data: {
          title: 'El Señor de los Anillos',
          author: 'J.R.R. Tolkien',
          isbn: '978-84-450-7040-2',
          description: 'Trilogía épica de fantasía',
          category: 'Fantasía',
          publishedYear: 1954,
          stock: 4,
          availableStock: 4,
          isActive: true,
        },
      }),
      prisma.book.create({
        data: {
          title: '1984',
          author: 'George Orwell',
          isbn: '978-84-450-7040-3',
          description: 'Novela distópica sobre vigilancia y control',
          category: 'Ciencia Ficción',
          publishedYear: 1949,
          stock: 2,
          availableStock: 2,
          isActive: true,
        },
      }),
    ]);

    console.log('📚 Libros creados:', books.length);

    // Crear préstamos de prueba
    const loans = await Promise.all([
      prisma.loan.create({
        data: {
          bookId: books[0].id,
          userId: student1.id,
          createdById: librarian.id,
          loanDate: new Date('2024-01-15'),
          dueDate: new Date('2024-01-30'),
          status: 'ACTIVO',
          notes: 'Préstamo de prueba',
        },
      }),
      prisma.loan.create({
        data: {
          bookId: books[1].id,
          userId: student2.id,
          createdById: librarian.id,
          loanDate: new Date('2024-01-10'),
          dueDate: new Date('2024-01-25'),
          status: 'DEVUELTO',
          returnDate: new Date('2024-01-20'),
          notes: 'Devuelto antes de tiempo',
        },
      }),
    ]);

    // Actualizar stock disponible de los libros prestados
    await prisma.book.update({
      where: { id: books[0].id },
      data: { availableStock: 4 }, // 5 - 1 prestado
    });

    console.log('📖 Préstamos creados:', loans.length);

    console.log('✅ Seed completado exitosamente!');
    console.log('\n📋 Resumen del seed:');
    console.log(`   👥 Usuarios: ${await prisma.user.count()}`);
    console.log(`   📚 Libros: ${await prisma.book.count()}`);
    console.log(`   📖 Préstamos: ${await prisma.loan.count()}`);
    console.log('\n🔑 Credenciales de prueba:');
    console.log('   Usuario: bibliotecario, Contraseña: password123');
    console.log('   Usuario: estudiante1, Contraseña: password123');
    console.log('   Usuario: estudiante2, Contraseña: password123');

  } catch (error) {
    console.error('❌ Error durante el seed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error('❌ Error en el seed:', e);
    process.exit(1);
  });
