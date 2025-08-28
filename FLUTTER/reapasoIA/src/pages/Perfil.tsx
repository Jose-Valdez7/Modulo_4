import React from 'react';
import { User, Mail, BookOpen, Calendar } from 'lucide-react';

const user = {
  name: 'Juan Pérez',
  email: 'juan.perez@email.com',
  loans: 3,
  memberSince: '2022-01-15',
  avatar: '/avatars/juan.png',
};

const prestamos = [
  { id: 1, title: 'El Quijote', author: 'Miguel de Cervantes', fecha: '2025-08-01', estado: 'Activo' },
  { id: 2, title: '1984', author: 'George Orwell', fecha: '2025-07-15', estado: 'Devuelto' },
];

const Perfil: React.FC = () => {
  return (
    <div className="min-vh-100 pt-5 pb-5 bg-light" style={{ background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)' }}>
      <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <div className="card shadow border-0 p-5 d-flex flex-column align-items-center" style={{ borderRadius: 24, maxWidth: 420 }}>
          <img src={user.avatar} alt={user.name} className="mb-3 rounded-circle shadow" style={{ width: 120, height: 120, objectFit: 'cover' }} />
          <h2 className="fw-bold text-primary mb-1">{user.name}</h2>
          <div className="mb-2 text-secondary d-flex align-items-center gap-2">
            <Mail size={20} className="me-1 text-primary" />
            {user.email}
          </div>
          <div className="mb-2 text-secondary d-flex align-items-center gap-2">
            <BookOpen size={20} className="me-1 text-primary" />
            Préstamos activos: <span className="fw-bold ms-1">{user.loans}</span>
          </div>
          <div className="mb-2 text-secondary d-flex align-items-center gap-2">
            <Calendar size={20} className="me-1 text-primary" />
            Miembro desde: <span className="fw-bold ms-1">{user.memberSince}</span>
          </div>
          <h4 className="fw-bold text-secondary mb-3 mt-4">Libros Prestados</h4>
          <ul className="list-unstyled w-100">
            {prestamos.map(p => (
              <li
                key={p.id}
                className="bg-primary bg-opacity-10 rounded-3 p-3 mb-3 d-flex justify-content-between align-items-center shadow-sm"
              >
                <div>
                  <span className="fw-bold text-primary">{p.title}</span> <span className="text-secondary">({p.author})</span>
                  <div className="text-muted small">Fecha: {p.fecha}</div>
                </div>
                <span className={`px-3 py-1 rounded-pill fw-bold ${p.estado === 'Activo' ? 'bg-warning text-dark' : 'bg-secondary text-white'}`}>
                  {p.estado}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
