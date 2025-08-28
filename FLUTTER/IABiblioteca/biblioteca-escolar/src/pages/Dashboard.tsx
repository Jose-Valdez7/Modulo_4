import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../config/api';
import { Book, Loan } from '../types';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Users, 
  FileText, 
  Clock,
  TrendingUp,
  AlertCircle,
  Star,
  Award,
  Calendar,
  CheckCircle,
  ArrowUpRight,
  BookMarked,
  GraduationCap,
  Library,
  Sparkles
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalLoans: 0,
    activeLoans: 0,
    overdueLoans: 0,
    myLoans: 0
  });
  const [recentLoans, setRecentLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [books, loans] = await Promise.all([
          api.getBooks(),
          user?.role === 'ESTUDIANTE' 
            ? api.getStudentLoans(user.id)
            : api.getLoans()
        ]);

        const activeLoans = loans.filter(loan => loan.status === 'ACTIVE');
        const overdueLoans = activeLoans.filter(loan => 
          new Date(loan.returnDate) < new Date()
        );

        setStats({
          totalBooks: books.length,
          totalLoans: loans.length,
          activeLoans: activeLoans.length,
          overdueLoans: overdueLoans.length,
          myLoans: user?.role === 'ESTUDIANTE' ? activeLoans.length : 0
        });

        setRecentLoans(loans.slice(0, 5));
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full"
        />
      </div>
    );
  }

  const isBibliotecario = user?.role === 'BIBLIOTECARIO';
  const isEstudiante = user?.role === 'ESTUDIANTE';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <motion.section 
        className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-800 text-white py-20 lg:py-32"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 lg:w-24 lg:h-24 bg-white/20 backdrop-blur-sm rounded-3xl mb-6">
              <Library className="w-10 h-10 lg:w-12 lg:h-12 text-white" />
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              ¡Bienvenido a BiblioTech!
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Tu portal digital para explorar, gestionar y descubrir el mundo de los libros
            </p>
          </motion.div>

          {/* Quick Stats */}
          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 lg:p-6">
              <div className="text-2xl lg:text-3xl font-bold">{stats.totalBooks}</div>
              <div className="text-sm text-blue-100">Libros Disponibles</div>
            </motion.div>
            <motion.div variants={itemVariants} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 lg:p-6">
              <div className="text-2xl lg:text-3xl font-bold">{stats.activeLoans}</div>
              <div className="text-sm text-blue-100">Préstamos Activos</div>
            </motion.div>
            <motion.div variants={itemVariants} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 lg:p-6">
              <div className="text-2xl lg:text-3xl font-bold">{stats.totalLoans}</div>
              <div className="text-sm text-blue-100">Total Préstamos</div>
            </motion.div>
            <motion.div variants={itemVariants} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 lg:p-6">
              <div className="text-2xl lg:text-3xl font-bold">{stats.overdueLoans}</div>
              <div className="text-sm text-blue-100">Vencidos</div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12"
        >
          {/* Welcome Card */}
          <motion.div 
            variants={cardVariants}
            className="lg:col-span-2 bg-white rounded-3xl shadow-xl p-8 border border-gray-100"
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  ¡Hola, {user?.name}! 👋
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {isBibliotecario 
                    ? 'Como bibliotecario, tienes acceso completo a todas las funciones del sistema. Gestiona libros, préstamos y estudiantes desde tu panel de control.'
                    : 'Como estudiante, puedes explorar nuestro catálogo de libros, gestionar tus préstamos y mantener un historial de tu actividad en la biblioteca.'
                  }
                </p>
                <div className="mt-6 flex items-center space-x-4">
                  <motion.div 
                    className="flex items-center space-x-2 text-sm text-gray-500"
                    whileHover={{ scale: 1.05 }}
                  >
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Cuenta verificada</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center space-x-2 text-sm text-gray-500"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>Usuario activo</span>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div 
            variants={cardVariants}
            className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Sparkles className="w-5 h-5 text-blue-600 mr-2" />
              Acciones Rápidas
            </h3>
            <div className="space-y-3">
              <motion.a
                href="/catalog"
                className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 rounded-xl transition-all duration-200 group"
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-medium text-gray-900">Explorar Catálogo</span>
                </div>
                <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors duration-200" />
              </motion.a>

              {isEstudiante && (
                <motion.a
                  href="/my-loans"
                  className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 rounded-xl transition-all duration-200 group"
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
                      <BookMarked className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-medium text-gray-900">Mis Préstamos</span>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors duration-200" />
                </motion.a>
              )}

              {isBibliotecario && (
                <motion.a
                  href="/loans"
                  className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-violet-50 hover:from-purple-100 hover:to-violet-100 rounded-xl transition-all duration-200 group"
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-medium text-gray-900">Gestionar Préstamos</span>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors duration-200" />
                </motion.a>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Statistics Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Libros</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalBooks}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>+12% este mes</span>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {isBibliotecario ? 'Préstamos Activos' : 'Mis Préstamos'}
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {isBibliotecario ? stats.activeLoans : stats.myLoans}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-blue-600">
              <Clock className="w-4 h-4 mr-1" />
              <span>En tiempo real</span>
            </div>
          </motion.div>

          {isBibliotecario && (
            <>
              <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Préstamos</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalLoans}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm text-purple-600">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>Historial completo</span>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Préstamos Vencidos</p>
                    <p className="text-3xl font-bold text-red-600">{stats.overdueLoans}</p>
                  </div>
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-red-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm text-red-600">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  <span>Requieren atención</span>
                </div>
              </motion.div>
            </>
          )}

          {isEstudiante && (
            <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Límite de Préstamos</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.myLoans}/3</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-yellow-600">
                <Star className="w-4 h-4 mr-1" />
                <span>Mantén tu cuenta activa</span>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Recent Activity */}
        <motion.div 
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center">
              <Clock className="w-6 h-6 text-blue-600 mr-3" />
              {isBibliotecario ? 'Préstamos Recientes' : 'Mis Préstamos Recientes'}
            </h3>
            <motion.button
              className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-2 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Ver todos</span>
              <ArrowUpRight className="w-4 h-4" />
            </motion.button>
          </div>

          {recentLoans.length > 0 ? (
            <div className="space-y-4">
              {recentLoans.map((loan, index) => (
                <motion.div
                  key={loan.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors duration-200"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{loan.bookTitle}</h4>
                      {isBibliotecario && (
                        <p className="text-sm text-gray-500">{loan.studentName}</p>
                      )}
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(loan.loanDate).toLocaleDateString()}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {new Date(loan.returnDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      loan.status === 'ACTIVE'
                        ? 'bg-green-100 text-green-800'
                        : loan.status === 'RETURNED'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {loan.status === 'ACTIVE' ? 'Activo' :
                       loan.status === 'RETURNED' ? 'Devuelto' : 'Vencido'}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-gray-400" />
              </div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">No hay préstamos recientes</h4>
              <p className="text-gray-500">
                {isBibliotecario 
                  ? 'Los préstamos aparecerán aquí cuando se registren nuevos.'
                  : 'Visita el catálogo para solicitar tu primer libro.'
                }
              </p>
            </div>
          )}
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl shadow-xl p-8 text-white text-center mb-12"
        >
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">¿Listo para explorar?</h3>
            <p className="text-blue-100 text-lg mb-6">
              Descubre nuevos libros, gestiona tus préstamos y aprovecha al máximo tu experiencia en la biblioteca.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/catalog"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Explorar Catálogo
              </motion.a>
              {isEstudiante && (
                <motion.a
                  href="/my-loans"
                  className="inline-flex items-center justify-center px-6 py-3 bg-white/20 text-white font-semibold rounded-xl hover:bg-white/30 transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <BookMarked className="w-5 h-5 mr-2" />
                  Mis Préstamos
                </motion.a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
