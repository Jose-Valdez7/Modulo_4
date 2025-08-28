// ...existing code...
import React from 'react';
import { BookOpen, Users, FileText } from 'lucide-react';

const Home: React.FC = () => {
  const navigate = require('react-router-dom').useNavigate();
  return (
    <div className="min-vh-100 pt-5 pb-5 bg-light" style={{ background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)' }}>
      <div className="container">
        <div className="row justify-content-center align-items-center mb-5">
          <div className="col-12 col-md-8 text-center">
            <img src="/logo512.png" alt="Logo" style={{ width: 120 }} className="mb-3" />
            <h1 className="display-4 fw-bold text-primary mb-3">Bienvenido a la Biblioteca Inteligente</h1>
            <p className="lead text-secondary mb-4">Gestiona tus libros, préstamos y usuarios de forma moderna y eficiente.</p>
          </div>
        </div>
        <div className="row g-4 justify-content-center">
          <div className="col-12 col-md-4 d-flex">
            <div className="card shadow border-0 flex-fill d-flex flex-column align-items-center p-4" style={{ borderRadius: 20 }}>
              <BookOpen className="mb-2 text-primary" size={48} />
              <h3 className="fw-bold text-primary">Catálogo</h3>
              <span className="fs-5 text-secondary">Explora los libros disponibles</span>
            </div>
          </div>
          <div className="col-12 col-md-4 d-flex">
            <div className="card shadow border-0 flex-fill d-flex flex-column align-items-center p-4" style={{ borderRadius: 20, cursor: 'pointer' }} onClick={() => navigate('/students')}>
              <Users className="mb-2 text-primary" size={48} />
              <h3 className="fw-bold text-primary">Estudiantes</h3>
              <span className="fs-5 text-secondary">Gestiona los usuarios</span>
            </div>
          </div>
          <div className="col-12 col-md-4 d-flex">
            <div className="card shadow border-0 flex-fill d-flex flex-column align-items-center p-4" style={{ borderRadius: 20 }}>
              <FileText className="mb-2 text-primary" size={48} />
              <h3 className="fw-bold text-primary">Préstamos</h3>
              <span className="fs-5 text-secondary">Administra los préstamos</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

