import { motion } from 'framer-motion';
import { Home, BookOpen, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  // ...existing code...
  const { logout, isAuthenticated } = useAuth();
  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };
  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-gradient-to-r from-blue-600 via-yellow-300 to-blue-900 shadow-lg fixed w-full z-50"
      style={{ top: 0, left: 0 }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <img src="/logo192.png" alt="Logo" className="h-12 w-12" />
          <span className="text-3xl font-bold text-black tracking-wide">Biblioteca Escolar</span>
        </div>
        <div className="flex gap-24 items-center justify-center">
          <a href="/home" title="Inicio" className="hover:scale-110 transition-transform">
            <Home className="h-20 w-20 text-blue-900 hover:text-yellow-500" />
          </a>
          <a href="/catalogo" title="Catálogo" className="hover:scale-110 transition-transform">
            <BookOpen className="h-20 w-20 text-blue-900 hover:text-yellow-500" />
          </a>
          <a href="/perfil" title="Perfil" className="hover:scale-110 transition-transform">
            <User className="h-20 w-20 text-blue-900 hover:text-yellow-500" />
          </a>
          {isAuthenticated && (
            <button onClick={handleLogout} title="Cerrar sesión" className="ml-12 px-8 py-4 rounded-3xl bg-gradient-to-r from-red-500 via-yellow-400 to-red-500 text-white font-extrabold shadow-lg hover:scale-105 transition-all flex items-center gap-4 border-4 border-yellow-400 text-2xl">
              <LogOut className="h-14 w-14" />
              <span className="hidden md:inline text-2xl">Cerrar sesión</span>
            </button>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
