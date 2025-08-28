class LoanDTO {
  static toResponse(loan) {
    return {
      id: loan.id,
      bookId: loan.bookId,
      userId: loan.userId,
      createdById: loan.createdById,
      loanDate: loan.loanDate,
      dueDate: loan.dueDate,
      returnDate: loan.returnDate,
      status: loan.status,
      notes: loan.notes,
      createdAt: loan.createdAt,
      updatedAt: loan.updatedAt,
      // Incluir datos relacionados si están disponibles
      book: loan.book ? {
        id: loan.book.id,
        title: loan.book.title,
        author: loan.book.author,
        isbn: loan.book.isbn,
      } : undefined,
      user: loan.user ? {
        id: loan.user.id,
        name: loan.user.name,
        username: loan.user.username,
      } : undefined,
      createdBy: loan.createdBy ? {
        id: loan.createdBy.id,
        name: loan.createdBy.name,
        username: loan.createdBy.username,
      } : undefined,
    };
  }

  static toCreate(data) {
    return {
      bookId: data.bookId,
      userId: data.userId,
      createdById: data.createdById,
      dueDate: new Date(data.dueDate),
      notes: data.notes,
    };
  }

  static toUpdate(data) {
    const updateData = {};
    
    if (data.dueDate) updateData.dueDate = new Date(data.dueDate);
    if (data.returnDate) updateData.returnDate = new Date(data.returnDate);
    if (data.status) updateData.status = data.status;
    if (data.notes !== undefined) updateData.notes = data.notes;
    
    return updateData;
  }

  static toList(loans) {
    return loans.map(loan => this.toResponse(loan));
  }

  static toReturn(loanId) {
    return {
      returnDate: new Date(),
      status: 'DEVUELTO',
    };
  }
}

module.exports = LoanDTO;
