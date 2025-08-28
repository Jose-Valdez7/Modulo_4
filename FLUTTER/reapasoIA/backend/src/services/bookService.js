const bookRepository = require('../repositories/bookRepository');
const BookDTO = require('../dto/book.dto');

class BookService {
  // Crear libro
  async createBook(bookData) {
    try {
      // Verificar si ISBN ya existe
      const isbnExists = await bookRepository.isbnExists(bookData.isbn);
      if (isbnExists) {
        throw new Error('El ISBN ya existe en el sistema');
      }

      // Validar stock inicial
      if (bookData.stock < 0) {
        throw new Error('El stock no puede ser negativo');
      }

      // Establecer stock disponible igual al stock total inicialmente
      const book = await bookRepository.create({
        ...bookData,
        availableStock: bookData.stock,
      });

      return BookDTO.toResponse(book);
    } catch (error) {
      throw error;
    }
  }

  // Obtener libro por ID
  async getBookById(id) {
    try {
      const book = await bookRepository.findById(id);
      if (!book) {
        throw new Error('Libro no encontrado');
      }

      return BookDTO.toResponse(book);
    } catch (error) {
      throw error;
    }
  }

  // Obtener libro por ISBN
  async getBookByIsbn(isbn) {
    try {
      const book = await bookRepository.findByIsbn(isbn);
      if (!book) {
        throw new Error('Libro no encontrado');
      }

      return BookDTO.toResponse(book);
    } catch (error) {
      throw error;
    }
  }

  // Obtener todos los libros
  async getAllBooks(page = 1, limit = 10, search = '', category = '', availableOnly = false) {
    try {
      const result = await bookRepository.findAll(page, limit, search, category, availableOnly);
      
      return {
        ...result,
        books: result.books.map(book => BookDTO.toResponse(book)),
      };
    } catch (error) {
      throw error;
    }
  }

  // Obtener libros por categoría
  async getBooksByCategory(category, page = 1, limit = 10) {
    try {
      const result = await bookRepository.findByCategory(category, page, limit);
      
      return {
        ...result,
        books: result.books.map(book => BookDTO.toResponse(book)),
      };
    } catch (error) {
      throw error;
    }
  }

  // Obtener libros disponibles
  async getAvailableBooks(page = 1, limit = 10) {
    try {
      const result = await bookRepository.findAvailable(page, limit);
      
      return {
        ...result,
        books: result.books.map(book => BookDTO.toResponse(book)),
      };
    } catch (error) {
      throw error;
    }
  }

  // Actualizar libro
  async updateBook(id, updateData) {
    try {
      // Verificar si el libro existe
      const existingBook = await bookRepository.findById(id);
      if (!existingBook) {
        throw new Error('Libro no encontrado');
      }

      // Verificar ISBN único si se está actualizando
      if (updateData.isbn && updateData.isbn !== existingBook.isbn) {
        const isbnExists = await bookRepository.isbnExists(updateData.isbn, id);
        if (isbnExists) {
          throw new Error('El ISBN ya existe en el sistema');
        }
      }

      // Validar stock si se está actualizando
      if (updateData.stock !== undefined) {
        if (updateData.stock < 0) {
          throw new Error('El stock no puede ser negativo');
        }

        // Calcular diferencia de stock
        const stockDifference = updateData.stock - existingBook.stock;
        
        // Si se reduce el stock, verificar que no sea menor al stock prestado
        if (stockDifference < 0) {
          const borrowedStock = existingBook.stock - existingBook.availableStock;
          if (updateData.stock < borrowedStock) {
            throw new Error(`No se puede reducir el stock a ${updateData.stock} porque hay ${borrowedStock} libros prestados`);
          }
        }

        // Actualizar stock disponible
        updateData.availableStock = existingBook.availableStock + stockDifference;
        if (updateData.availableStock < 0) {
          updateData.availableStock = 0;
        }
      }

      // Actualizar libro
      const updatedBook = await bookRepository.update(id, updateData);
      return BookDTO.toResponse(updatedBook);
    } catch (error) {
      throw error;
    }
  }

  // Eliminar libro (soft delete)
  async deleteBook(id) {
    try {
      const book = await bookRepository.findById(id);
      if (!book) {
        throw new Error('Libro no encontrado');
      }

      // Verificar si hay libros prestados
      if (book.stock > book.availableStock) {
        throw new Error('No se puede eliminar el libro porque tiene ejemplares prestados');
      }

      const deletedBook = await bookRepository.delete(id);
      return BookDTO.toResponse(deletedBook);
    } catch (error) {
      throw error;
    }
  }

  // Restaurar libro
  async restoreBook(id) {
    try {
      const book = await bookRepository.findById(id);
      if (!book) {
        throw new Error('Libro no encontrado');
      }

      if (book.isActive) {
        throw new Error('El libro ya está activo');
      }

      const restoredBook = await bookRepository.restore(id);
      return BookDTO.toResponse(restoredBook);
    } catch (error) {
      throw error;
    }
  }

  // Actualizar stock
  async updateStock(id, quantity) {
    try {
      const book = await bookRepository.findById(id);
      if (!book) {
        throw new Error('Libro no encontrado');
      }

      if (!book.isActive) {
        throw new Error('No se puede actualizar el stock de un libro inactivo');
      }

      const newStock = book.stock + quantity;
      if (newStock < 0) {
        throw new Error('El stock no puede ser negativo');
      }

      // Verificar que el nuevo stock no sea menor al stock prestado
      const borrowedStock = book.stock - book.availableStock;
      if (newStock < borrowedStock) {
        throw new Error(`No se puede reducir el stock a ${newStock} porque hay ${borrowedStock} libros prestados`);
      }

      // Calcular nuevo stock disponible
      const newAvailableStock = Math.max(0, book.availableStock + quantity);

      const updatedBook = await bookRepository.update(id, {
        stock: newStock,
        availableStock: newAvailableStock,
      });

      return BookDTO.toResponse(updatedBook);
    } catch (error) {
      throw error;
    }
  }

  // Verificar disponibilidad
  async checkAvailability(id) {
    try {
      return await bookRepository.checkAvailability(id);
    } catch (error) {
      throw error;
    }
  }

  // Obtener estadísticas de libros
  async getBookStats() {
    try {
      return await bookRepository.getStats();
    } catch (error) {
      throw error;
    }
  }

  // Obtener libros populares
  async getPopularBooks(limit = 10) {
    try {
      const books = await bookRepository.findPopular(limit);
      return books.map(book => BookDTO.toResponse(book));
    } catch (error) {
      throw error;
    }
  }

  // Obtener libros por año de publicación
  async getBooksByYear(year, page = 1, limit = 10) {
    try {
      const result = await bookRepository.findByYear(year, page, limit);
      
      return {
        ...result,
        books: result.books.map(book => BookDTO.toResponse(book)),
      };
    } catch (error) {
      throw error;
    }
  }

  // Buscar libros
  async searchBooks(searchTerm, page = 1, limit = 10) {
    try {
      const result = await bookRepository.findAll(page, limit, searchTerm);
      
      return {
        ...result,
        books: result.books.map(book => BookDTO.toResponse(book)),
      };
    } catch (error) {
      throw error;
    }
  }

  // Obtener categorías disponibles
  async getCategories() {
    try {
      const stats = await bookRepository.getStats();
      return stats.categories.map(cat => cat.name);
    } catch (error) {
      throw error;
    }
  }

  // Obtener años de publicación disponibles
  async getPublicationYears() {
    try {
      // Esta funcionalidad requeriría una consulta adicional en el repositorio
      // Por ahora retornamos un rango de años común
      const currentYear = new Date().getFullYear();
      const years = [];
      for (let year = currentYear; year >= 1900; year--) {
        years.push(year);
      }
      return years;
    } catch (error) {
      throw error;
    }
  }

  // Validar datos del libro
  validateBookData(bookData) {
    const errors = [];

    if (!bookData.title || bookData.title.trim().length < 1) {
      errors.push('El título es obligatorio');
    }

    if (!bookData.author || bookData.author.trim().length < 1) {
      errors.push('El autor es obligatorio');
    }

    if (!bookData.isbn || bookData.isbn.trim().length < 10) {
      errors.push('El ISBN debe tener al menos 10 caracteres');
    }

    if (!bookData.category || bookData.category.trim().length < 1) {
      errors.push('La categoría es obligatoria');
    }

    if (!bookData.publishedYear || bookData.publishedYear < 1900 || bookData.publishedYear > new Date().getFullYear()) {
      errors.push('El año de publicación debe ser válido');
    }

    if (bookData.stock !== undefined && bookData.stock < 0) {
      errors.push('El stock no puede ser negativo');
    }

    return errors;
  }
}

module.exports = new BookService();
