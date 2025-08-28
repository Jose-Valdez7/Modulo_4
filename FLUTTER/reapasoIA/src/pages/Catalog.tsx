import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import type { Book, BookFormData } from '../types';
import { toast } from 'react-toastify';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  BookOpen,
  Filter,
  Eye
} from 'lucide-react';
import BookForm from '../components/BookForm';
import BookModal from '../components/BookModal';

const Catalog: React.FC = () => {
  const { user } = useAuth();
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [showBookModal, setShowBookModal] = useState(false);

  const isBibliotecario = user?.role === 'BIBLIOTECARIO';

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    filterBooks();
  }, [books, searchTerm, selectedCategory]);

  const fetchBooks = async () => {
    try {
      const booksData = await api.getBooks();
      setBooks(booksData);
    } catch (error) {
      toast.error('Error al cargar los libros');
    } finally {
      setLoading(false);
    }
  };

  const filterBooks = () => {
    let filtered = books;

    if (searchTerm) {
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.isbn.includes(searchTerm)
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(book => book.category === selectedCategory);
    }

    setFilteredBooks(filtered);
  };

  const handleCreateBook = async (bookData: BookFormData) => {
    try {
      await api.createBook(bookData);
      toast.success('Libro creado exitosamente');
      setShowForm(false);
      fetchBooks();
    } catch (error) {
      toast.error('Error al crear el libro');
    }
  };

  const handleUpdateBook = async (bookData: BookFormData) => {
    if (!editingBook) return;
    
    try {
      await api.updateBook(editingBook.id, bookData);
      toast.success('Libro actualizado exitosamente');
      setShowForm(false);
      setEditingBook(null);
      fetchBooks();
    } catch (error) {
      toast.error('Error al actualizar el libro');
    }
  };

  const handleDeleteBook = async (bookId: string) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este libro?')) {
      return;
    }

    try {
      await api.deleteBook(bookId);
      toast.success('Libro eliminado exitosamente');
      fetchBooks();
    } catch (error) {
      toast.error('Error al eliminar el libro');
    }
  };

  const categories = Array.from(new Set(books.map(book => book.category)));

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 pt-5 pb-5 bg-light" style={{ background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)' }}>
      <div className="container">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-5">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Catálogo de Libros</h1>
            <p className="mt-1 text-sm text-gray-500">
              {isBibliotecario ? 'Gestiona el catálogo de libros de la biblioteca' : 'Explora los libros disponibles'}
            </p>
          </div>
          {isBibliotecario && (
            <button
              onClick={() => setShowForm(true)}
              className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="h-4 w-4 mr-2" />
              Agregar Libro
            </button>
          )}
        </div>

        {/* Filtros */}
        <div className="bg-white p-4 rounded-lg shadow mb-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Buscar por título, autor o ISBN..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-5 w-5 text-gray-400" />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="">Todas las categorías</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="text-sm text-gray-500 flex items-center">
              <BookOpen className="h-4 w-4 mr-1" />
              {filteredBooks.length} libro{filteredBooks.length !== 1 ? 's' : ''} encontrado{filteredBooks.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>

        {/* Lista de libros */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          {filteredBooks.length > 0 ? (
            <div className="row g-4 justify-content-center">
              {filteredBooks.map((book) => (
                <div className="col-12 col-md-6 col-lg-4 d-flex" key={book.id}>
                  <div className="card shadow border-0 flex-fill d-flex flex-column align-items-center p-4" style={{ borderRadius: 20 }}>
                    <img src={book.cover} alt={book.title} className="mb-3 rounded-3 shadow" style={{ width: 120, height: 120, objectFit: 'cover' }} />
                    <h3 className="fw-bold text-primary">{book.title}</h3>
                    <span className="fs-5 text-secondary">{book.author}</span>
                    <div className="mt-auto">
                      <button
                        onClick={() => {
                          setSelectedBook(book);
                          setShowBookModal(true);
                        }}
                        className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-2"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Ver
                      </button>
                      
                      {isBibliotecario && (
                        <>
                          <button
                            onClick={() => {
                              setEditingBook(book);
                              setShowForm(true);
                            }}
                            className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-2"
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Editar
                          </button>
                          <button
                            onClick={() => handleDeleteBook(book.id)}
                            className="inline-flex items-center px-3 py-1 border border-red-300 shadow-sm text-sm leading-4 font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Eliminar
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No se encontraron libros</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || selectedCategory 
                  ? 'Intenta ajustar los filtros de búsqueda'
                  : 'No hay libros en el catálogo'
                }
              </p>
            </div>
          )}
        </div>

        {/* Modal de formulario */}
        {showForm && (
          <BookForm
            book={editingBook}
            onSubmit={editingBook ? handleUpdateBook : handleCreateBook}
            onCancel={() => {
              setShowForm(false);
              setEditingBook(null);
            }}
          />
        )}

        {/* Modal de detalles del libro */}
        {showBookModal && selectedBook && (
          <BookModal
            book={selectedBook}
            onClose={() => {
              setShowBookModal(false);
              setSelectedBook(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Catalog;
