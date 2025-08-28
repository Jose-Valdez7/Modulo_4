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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '20rem', background: 'linear-gradient(135deg, #dbeafe 60%, #fca5a5 100%)' }}>
        <div style={{ animation: 'spin 1s linear infinite', borderRadius: '50%', height: '4rem', width: '4rem', borderBottom: '6px solid #2563eb', borderTop: '6px solid #fbbf24', borderLeft: '6px solid #ef4444', borderRight: '6px solid #60a5fa' }}></div>
      </div>
    );
  }

  return (
  <div style={{ padding: '6rem 0 3rem 0', background: 'linear-gradient(135deg, #dbeafe 60%, #fca5a5 100%)', minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2.5rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div>
          <h1 style={{ fontSize: '2.7rem', fontWeight: 'bold', color: '#2563eb', textShadow: '0 2px 8px #fca5a5' }}>Catálogo de Libros</h1>
          <p style={{ marginTop: '0.7rem', fontSize: '1.2rem', color: '#ef4444', fontWeight: 'bold' }}>
            {isBibliotecario ? 'Gestiona el catálogo de libros de la biblioteca' : 'Explora los libros disponibles'}
          </p>
        </div>
        {isBibliotecario && (
          <button
            onClick={() => setShowForm(true)}
            style={{ padding: '1rem 2.5rem', borderRadius: '1.2rem', background: 'linear-gradient(90deg, #2563eb 60%, #ef4444 100%)', color: '#fff', fontWeight: 'bold', fontSize: '1.3rem', boxShadow: '0 2px 8px #2563eb', border: '2px solid #fbbf24', marginLeft: '2rem', transition: 'background 0.2s' }}
          >
            <Plus style={{ height: '1.7rem', width: '1.7rem', marginRight: '0.7rem' }} />
            Agregar Libro
          </button>
        )}
      </div>

      {/* Filtros */}
      <div style={{ background: 'linear-gradient(90deg, #e0f2fe 60%, #fee2e2 100%)', padding: '2rem', borderRadius: '2rem', boxShadow: '0 2px 12px #fbbf24', maxWidth: '1200px', margin: '0 auto 2.5rem auto' }}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '2.5rem', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '1.5rem', color: '#2563eb' }} />
            <input
              type="text"
              placeholder="Buscar por título, autor o ISBN..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', borderRadius: '1rem', border: '2px solid #2563eb', fontSize: '1.2rem', fontWeight: '500', background: '#e0f2fe', color: '#2563eb', boxShadow: '0 2px 8px #fbbf24' }}
            />
          </div>
          <div style={{ position: 'relative', flex: 1 }}>
            <Filter style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '1.5rem', color: '#ef4444' }} />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', borderRadius: '1rem', border: '2px solid #ef4444', fontSize: '1.2rem', fontWeight: '500', background: '#fee2e2', color: '#ef4444', boxShadow: '0 2px 8px #fbbf24' }}
            >
              <option value="">Todas las categorías</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div style={{ fontSize: '1.2rem', color: '#fbbf24', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BookOpen style={{ height: '1.7rem', width: '1.7rem', marginRight: '0.7rem', color: '#fbbf24' }} />
            {filteredBooks.length} libro{filteredBooks.length !== 1 ? 's' : ''} encontrado{filteredBooks.length !== 1 ? 's' : ''}
          </div>
        </div>
      </div>

      {/* Lista de libros */}
      <div style={{ background: 'transparent', maxWidth: '1200px', margin: '0 auto' }}>
        {filteredBooks.length > 0 ? (
          <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2.5rem' }}>
            {filteredBooks.map((book) => (
              <li key={book.id} style={{ background: 'linear-gradient(135deg, #60a5fa 60%, #fca5a5 100%)', borderRadius: '2rem', boxShadow: '0 4px 16px #fbbf24', padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.2rem', fontSize: '1.2rem', border: '4px solid #ef4444' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                  <h3 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2563eb', marginBottom: '0.5rem', textShadow: '0 2px 8px #fca5a5' }}>{book.title}</h3>
                  <p style={{ color: '#ef4444', fontWeight: 'bold', fontSize: '1.1rem' }}>{book.author} • {book.isbn}</p>
                  <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'center', fontSize: '1.1rem', fontWeight: 'bold' }}>
                    <span style={{ background: '#fbbf24', color: '#2563eb', borderRadius: '1rem', padding: '0.5rem 1.2rem', fontWeight: 'bold', fontSize: '1rem' }}>{book.category}</span>
                    <span style={{ color: '#fbbf24' }}>{book.publishedYear}</span>
                    <span style={{ display: 'flex', alignItems: 'center', color: '#2563eb' }}>
                      <BookOpen style={{ height: '1.2rem', width: '1.2rem', marginRight: '0.5rem', color: '#2563eb' }} />
                      {book.available}/{book.stock} disponibles
                    </span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                  <button
                    onClick={() => {
                      setSelectedBook(book);
                      setShowBookModal(true);
                    }}
                    style={{ padding: '0.9rem 2rem', borderRadius: '1rem', background: 'linear-gradient(90deg, #2563eb 60%, #fbbf24 100%)', color: '#fff', fontWeight: 'bold', fontSize: '1.1rem', boxShadow: '0 2px 8px #2563eb', border: '2px solid #fbbf24', transition: 'background 0.2s' }}
                  >
                    <Eye style={{ height: '1.2rem', width: '1.2rem', marginRight: '0.5rem' }} />
                    Ver
                  </button>
                  {isBibliotecario && (
                    <>
                      <button
                        onClick={() => {
                          setEditingBook(book);
                          setShowForm(true);
                        }}
                        style={{ padding: '0.9rem 2rem', borderRadius: '1rem', background: 'linear-gradient(90deg, #fbbf24 60%, #2563eb 100%)', color: '#fff', fontWeight: 'bold', fontSize: '1.1rem', boxShadow: '0 2px 8px #fbbf24', border: '2px solid #2563eb', transition: 'background 0.2s' }}
                      >
                        <Edit style={{ height: '1.2rem', width: '1.2rem', marginRight: '0.5rem' }} />
                        Editar
                      </button>
                      <button
                        onClick={() => handleDeleteBook(book.id)}
                        style={{ padding: '0.9rem 2rem', borderRadius: '1rem', background: 'linear-gradient(90deg, #ef4444 60%, #fca5a5 100%)', color: '#fff', fontWeight: 'bold', fontSize: '1.1rem', boxShadow: '0 2px 8px #ef4444', border: '2px solid #fbbf24', transition: 'background 0.2s' }}
                      >
                        <Trash2 style={{ height: '1.2rem', width: '1.2rem', marginRight: '0.5rem' }} />
                        Eliminar
                      </button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div style={{ textAlign: 'center', padding: '6rem 0' }}>
            <BookOpen style={{ margin: '0 auto', height: '4rem', width: '4rem', color: '#ef4444' }} />
            <h3 style={{ marginTop: '1.2rem', fontSize: '1.5rem', fontWeight: 'bold', color: '#2563eb' }}>No se encontraron libros</h3>
            <p style={{ marginTop: '0.7rem', fontSize: '1.1rem', color: '#ef4444', fontWeight: 'bold' }}>
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
  );
};

export default Catalog;
