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
    <div className="min-vh-100 pt-5 pb-5 bg-light" style={{ background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)' }}>
      <div className="container">
        <h2 className="display-5 fw-bold text-center text-primary mb-5">Panel de Control</h2>
        <div className="row g-4 justify-content-center">
          <div className="col-12 col-md-6 col-lg-3 d-flex">
            <div className="card shadow border-0 flex-fill d-flex flex-column align-items-center p-4" style={{ borderRadius: 20 }}>
              <BookOpen className="mb-2 text-primary" size={48} />
              <h3 className="fw-bold text-primary">Libros</h3>
              <span className="fs-4 text-secondary">Gestión de catálogo</span>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-3 d-flex">
            <div className="card shadow border-0 flex-fill d-flex flex-column align-items-center p-4" style={{ borderRadius: 20 }}>
              <Users className="mb-2 text-primary" size={48} />
              <h3 className="fw-bold text-primary">Estudiantes</h3>
              <span className="fs-4 text-secondary">Gestión de usuarios</span>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-3 d-flex">
            <div className="card shadow border-0 flex-fill d-flex flex-column align-items-center p-4" style={{ borderRadius: 20 }}>
              <FileText className="mb-2 text-primary" size={48} />
              <h3 className="fw-bold text-primary">Préstamos</h3>
              <span className="fs-4 text-secondary">Gestión de préstamos</span>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-3 d-flex">
            <div className="card shadow border-0 flex-fill d-flex flex-column align-items-center p-4" style={{ borderRadius: 20 }}>
              <Calendar className="mb-2 text-primary" size={48} />
              <h3 className="fw-bold text-primary">Calendario</h3>
              <span className="fs-4 text-secondary">Fechas importantes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
