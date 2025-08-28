import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  BookOpen, 
  Users, 
  BookMarked, 
  LogOut, 
  Menu, 
  X,
  Home,
  FileText,
  UserCheck
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isBibliotecario = user?.role === 'BIBLIOTECARIO';
  const isEstudiante = user?.role === 'ESTUDIANTE';

  const navigation = [
    { name: 'Inicio', href: '/', icon: Home },
    ...(isBibliotecario ? [
      { name: 'Catálogo', href: '/catalog', icon: BookMarked },
      { name: 'Préstamos', href: '/loans', icon: FileText },
      { name: 'Estudiantes', href: '/students', icon: Users },
    ] : []),
    ...(isEstudiante ? [
      { name: 'Catálogo', href: '/catalog', icon: BookMarked },
      { name: 'Mis Préstamos', href: '/my-loans', icon: FileText },
    ] : []),
  ];

  return (
    <div className="main-layout">
      {/* Sidebar para móvil */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="flex items-center">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-semibold text-gray-900">Biblioteca</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="sidebar-nav">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`sidebar-link ${isActive ? 'active' : ''}`}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Sidebar para desktop */}
      <div className="sidebar hidden lg:block">
        <div className="sidebar-header">
          <div className="flex items-center">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-semibold text-gray-900">Biblioteca Escolar</span>
          </div>
        </div>
        <nav className="sidebar-nav">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`sidebar-link ${isActive ? 'active' : ''}`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Contenido principal */}
      <div className="main-content">
        {/* Header */}
        <div className="header">
          <div className="header-content">
            <button
              type="button"
              className="lg:hidden text-gray-700"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <UserCheck className="h-5 w-5 text-gray-400" />
                <span className="text-sm font-medium text-gray-900">{user?.name}</span>
                <span className="badge badge-blue">
                  {user?.role}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                <LogOut className="h-5 w-5" />
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>

        {/* Contenido de la página */}
        <main className="p-6">
          <div className="container">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
