class BookDTO {
  static toResponse(book) {
    return {
      id: book.id,
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      description: book.description,
      category: book.category,
      publishedYear: book.publishedYear,
      stock: book.stock,
      availableStock: book.availableStock,
      isActive: book.isActive,
      createdAt: book.createdAt,
      updatedAt: book.updatedAt,
    };
  }

  static toCreate(data) {
    return {
      title: data.title,
      author: data.author,
      isbn: data.isbn,
      description: data.description,
      category: data.category,
      publishedYear: parseInt(data.publishedYear),
      stock: parseInt(data.stock),
      availableStock: parseInt(data.stock), // Inicialmente igual al stock
    };
  }

  static toUpdate(data) {
    const updateData = {};
    
    if (data.title) updateData.title = data.title;
    if (data.author) updateData.author = data.author;
    if (data.isbn) updateData.isbn = data.isbn;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.category) updateData.category = data.category;
    if (data.publishedYear) updateData.publishedYear = parseInt(data.publishedYear);
    if (data.stock !== undefined) {
      updateData.stock = parseInt(data.stock);
      // Recalcular availableStock basado en préstamos activos
      updateData.availableStock = parseInt(data.stock);
    }
    if (data.isActive !== undefined) updateData.isActive = data.isActive;
    
    return updateData;
  }

  static toList(books) {
    return books.map(book => this.toResponse(book));
  }
}

module.exports = BookDTO;
