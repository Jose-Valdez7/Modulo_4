import React from 'react';
import { Book } from '../types';
import { X, BookOpen, Calendar, User, Hash } from 'lucide-react';

interface BookModalProps {
  book: Book;
  onClose: () => void;
}

const BookModal: React.FC<BookModalProps> = ({ book, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">
            Detalles del Libro
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Información principal */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {book.title}
            </h2>
            <div className="flex items-center text-gray-600 mb-4">
              <User className="h-4 w-4 mr-2" />
              <span className="text-lg">{book.author}</span>
            </div>
          </div>

          {/* Detalles técnicos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <Hash className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-500">ISBN</p>
                  <p className="text-sm text-gray-900">{book.isbn}</p>
                </div>
              </div>

              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Año de Publicación</p>
                  <p className="text-sm text-gray-900">{book.publishedYear}</p>
                </div>
              </div>

              <div className="flex items-center">
                <BookOpen className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Disponibilidad</p>
                  <p className="text-sm text-gray-900">
                    {book.available} de {book.stock} ejemplares disponibles
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Categoría</p>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {book.category}
                </span>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Estado del Stock</p>
                <div className="flex items-center">
                  <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${(book.available / book.stock) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600">
                    {Math.round((book.available / book.stock) * 100)}%
                  </span>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Estado</p>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  book.available > 0 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {book.available > 0 ? 'Disponible' : 'No disponible'}
                </span>
              </div>
            </div>
          </div>

          {/* Descripción */}
          {book.description && (
            <div>
              <p className="text-sm font-medium text-gray-500 mb-2">Descripción</p>
              <p className="text-sm text-gray-700 leading-relaxed">
                {book.description}
              </p>
            </div>
          )}

          {/* Información adicional */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Información Adicional</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Total de ejemplares:</p>
                <p className="font-medium">{book.stock}</p>
              </div>
              <div>
                <p className="text-gray-500">Prestados:</p>
                <p className="font-medium">{book.stock - book.available}</p>
              </div>
              <div>
                <p className="text-gray-500">Disponibles:</p>
                <p className="font-medium">{book.available}</p>
              </div>
              <div>
                <p className="text-gray-500">Tasa de uso:</p>
                <p className="font-medium">
                  {book.stock > 0 ? Math.round(((book.stock - book.available) / book.stock) * 100) : 0}%
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookModal;
