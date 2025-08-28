import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../config/api';
import { Loan } from '../types';
import { 
  FileText, 
  Calendar, 
  Clock, 
  AlertCircle,
  CheckCircle,
  BookOpen
} from 'lucide-react';

const MyLoans: React.FC = () => {
  const { user } = useAuth();
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchMyLoans();
    }
  }, [user]);

  const fetchMyLoans = async () => {
    try {
      const loansData = await api.getStudentLoans(user!.id);
      setLoans(loansData);
    } catch (error) {
      console.error('Error fetching loans:', error);
    } finally {
      setLoading(false);
    }
  };

  const isOverdue = (returnDate: string) => {
    return new Date(returnDate) < new Date();
  };

  const getDaysRemaining = (returnDate: string) => {
    const today = new Date();
    const returnDateObj = new Date(returnDate);
    const diffTime = returnDateObj.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusColor = (loan: Loan) => {
    if (loan.status === 'RETURNED') {
      return 'bg-blue-100 text-blue-800';
    }
    if (isOverdue(loan.returnDate)) {
      return 'bg-red-100 text-red-800';
    }
    return 'bg-green-100 text-green-800';
  };

  const getStatusText = (loan: Loan) => {
    if (loan.status === 'RETURNED') {
      return 'Devuelto';
    }
    if (isOverdue(loan.returnDate)) {
      return 'Vencido';
    }
    return 'Activo';
  };

  const getStatusIcon = (loan: Loan) => {
    if (loan.status === 'RETURNED') {
      return <CheckCircle className="h-4 w-4" />;
    }
    if (isOverdue(loan.returnDate)) {
      return <AlertCircle className="h-4 w-4" />;
    }
    return <Clock className="h-4 w-4" />;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const activeLoans = loans.filter(loan => loan.status === 'ACTIVE');
  const returnedLoans = loans.filter(loan => loan.status === 'RETURNED');
  const overdueLoans = activeLoans.filter(loan => isOverdue(loan.returnDate));

  return (
    <div className="min-vh-100 pt-5 pb-5 bg-light" style={{ background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)' }}>
      <div className="container">
        <h2 className="display-5 fw-bold text-center text-primary mb-5">Mis Préstamos</h2>
        <div className="row g-4 justify-content-center">
          {loans.map(loan => (
            <div className="col-12 col-md-6 col-lg-4 d-flex" key={loan.id}>
              <div className={`card shadow border-0 flex-fill d-flex flex-column p-4 ${getStatusColor(loan)}`} style={{ borderRadius: 20 }}>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="fw-bold text-primary">{loan.bookTitle}</span>
                  <span className={`px-3 py-1 rounded-pill fw-bold ${getStatusColor(loan)}`}>{getStatusText(loan)}</span>
                </div>
                <div className="text-secondary fw-semibold mb-1"><BookOpen className="me-1" size={18} />{loan.bookTitle}</div>
                <div className="text-muted mb-2"><Calendar className="me-1" size={16} />Préstamo: {loan.loanDate ? new Date(loan.loanDate).toLocaleDateString() : ''}</div>
                <div className="text-muted mb-2"><Calendar className="me-1" size={16} />Devolución: {loan.returnDate ? new Date(loan.returnDate).toLocaleDateString() : ''}</div>
                {isOverdue(loan.returnDate) && loan.status !== 'RETURNED' && (
                  <div className="mt-2 p-2 bg-danger bg-opacity-10 border border-danger rounded-md">
                    <AlertCircle className="me-2 text-danger" size={18} />
                    <span className="text-danger fw-bold">¡Préstamo vencido!</span>
                  </div>
                )}
                {loan.status === 'RETURNED' && (
                  <div className="mt-2 p-2 bg-info bg-opacity-10 border border-info rounded-md">
                    <CheckCircle className="me-2 text-info" size={18} />
                    <span className="text-info fw-bold">Devuelto</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyLoans;
