import React from 'react';
import { Book } from '../types';
import { X, BookOpen, Calendar, User, Hash } from 'lucide-react';

interface BookModalProps {
  book: Book;
  onClose: () => void;
}

const BookModal: React.FC<BookModalProps> = ({ book, onClose }) => {
  return (
    <div className="modal fade show d-block" tabIndex={-1} style={{ background: 'rgba(0,0,0,0.4)' }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content shadow-lg rounded-4 border-0">
          <div className="modal-header d-flex justify-content-between align-items-center border-0 pb-0">
            <h3 className="modal-title fs-4 fw-bold text-primary">
              Detalles del Libro
            </h3>
            <button type="button" className="btn-close" aria-label="Cerrar" onClick={onClose}></button>
          </div>
          <div className="modal-body pt-2">
            <div className="row g-4 align-items-center">
              <div className="col-md-4 text-center">
                <img src={book.cover || '/covers/default.jpg'} alt={book.title} className="rounded-3 shadow" style={{ width: '100%', maxWidth: 180, objectFit: 'cover' }} />
              </div>
              <div className="col-md-8">
                <h2 className="fw-bold text-primary mb-2">{book.title}</h2>
                <div className="d-flex align-items-center mb-2">
                  <User className="me-2 text-secondary" size={20} />
                  <span className="fw-semibold text-secondary">{book.author}</span>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <Hash className="me-2 text-secondary" size={20} />
                  <span className="text-muted">ISBN: {book.isbn}</span>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <Calendar className="me-2 text-secondary" size={20} />
                  <span className="text-muted">Año: {book.publishedYear}</span>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <BookOpen className="me-2 text-secondary" size={20} />
                  <span className="text-muted">Stock: {book.stock}</span>
                </div>
                <div className="mt-3">
                  <p className="text-dark">{book.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookModal;
