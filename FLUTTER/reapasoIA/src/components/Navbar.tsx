import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    // Aquí podrías limpiar el estado de autenticación si lo necesitas
    navigate('/');
  };

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="navbar navbar-expand-lg navbar-light bg-white shadow-lg fixed-top py-2"
      style={{ background: 'linear-gradient(90deg, #4f8cff 0%, #f8ffae 100%)' }}
    >
      <div className="container-fluid d-flex align-items-center justify-content-between px-4">
        <div className="d-flex align-items-center gap-2">
          <img src="/logo192.png" alt="Logo" className="me-2" style={{ height: 40, width: 40 }} />
          <span className="navbar-brand mb-0 h1 fw-bold fs-3 text-dark">Biblioteca Escolar</span>
        </div>
        <div className="d-flex gap-4 align-items-center">
          <a href="/home" className="nav-link fs-5 fw-semibold text-dark px-2 py-1 rounded hover-effect">Inicio</a>
          <a href="/catalogo" className="nav-link fs-5 fw-semibold text-dark px-2 py-1 rounded hover-effect">Catálogo</a>
          <a href="/perfil" className="nav-link fs-5 fw-semibold text-dark px-2 py-1 rounded hover-effect">Perfil</a>
          <button className="btn btn-outline-danger ms-3 fw-bold" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </div>
      <style>{`
        .hover-effect:hover {
          background: var(--secondary, #ff6f61);
          color: #fff !important;
          transition: background 0.3s, color 0.3s;
        }
        @media (max-width: 768px) {
          .container-fluid {
            flex-direction: column;
            gap: 0.5rem;
          }
        }
      `}</style>
    </motion.nav>
  );
}
