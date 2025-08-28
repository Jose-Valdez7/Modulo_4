import React from 'react';
import { BookOpen } from 'lucide-react';

const books = [
  { id: 1, title: 'El Quijote', author: 'Miguel de Cervantes', cover: '/covers/quijote.jpg' },
  { id: 2, title: 'Cien años de soledad', author: 'Gabriel García Márquez', cover: '/covers/cien_anos.jpg' },
  { id: 3, title: '1984', author: 'George Orwell', cover: '/covers/1984.jpg' },
  { id: 4, title: 'Rayuela', author: 'Julio Cortázar', cover: '/covers/rayuela.jpg' },
  { id: 5, title: 'Don Juan Tenorio', author: 'José Zorrilla', cover: '/covers/don_juan.jpg' },
  { id: 6, title: 'La Odisea', author: 'Homero', cover: '/covers/odisea.jpg' },
  { id: 7, title: 'Ficciones', author: 'Jorge Luis Borges', cover: '/covers/ficciones.jpg' },
  { id: 8, title: 'Pedro Páramo', author: 'Juan Rulfo', cover: '/covers/pedro_paramo.jpg' },
  { id: 9, title: 'El Principito', author: 'Antoine de Saint-Exupéry', cover: '/covers/principito.jpg' },
  { id: 10, title: 'Hamlet', author: 'William Shakespeare', cover: '/covers/hamlet.jpg' },
];

const Catalogo: React.FC = () => {
  return (
    <div className="min-vh-100 pt-5 pb-5 bg-light" style={{ background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)' }}>
      <div className="container">
        <h2 className="display-5 fw-bold text-center text-primary mb-5">Catálogo</h2>
        <div className="row g-4 justify-content-center">
          {books.map(book => (
            <div className="col-12 col-md-6 col-lg-4 d-flex" key={book.id}>
              <div className="card shadow border-0 flex-fill d-flex flex-column align-items-center p-4" style={{ borderRadius: 20 }}>
                <img src={book.cover} alt={book.title} className="mb-3 rounded-3 shadow" style={{ width: 120, height: 120, objectFit: 'cover' }} />
                <h3 className="fw-bold text-primary">{book.title}</h3>
                <span className="fs-5 text-secondary">{book.author}</span>
                <BookOpen className="mt-2 text-primary" size={28} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Catalogo;
