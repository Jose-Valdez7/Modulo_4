import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../config/api';
import { Loan, Book, User, LoanFormData } from '../types';
import { toast } from 'react-toastify';
import { Plus, RotateCcw, FileText, Calendar, User as UserIcon, BookOpen } from 'lucide-react';
import LoanForm from '../components/LoanForm';

const Loans: React.FC = () => {
  const { user } = useAuth();
  const [loans, setLoans] = useState<Loan[]>([]);
  const [filteredLoans, setFilteredLoans] = useState<Loan[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [students, setStudents] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterLoans();
  }, [loans, searchTerm, statusFilter]);

  const fetchData = async () => {
    try {
      let loansData;
      const [booksData, studentsData] = await Promise.all([
        api.getBooks(),
        api.getUsers()
      ]);
      if (user?.role === 'BIBLIOTECARIO') {
        loansData = await api.getLoans();
      } else if (user?.role === 'ESTUDIANTE') {
        loansData = await api.getStudentLoans(user.id);
      } else {
        loansData = [];
      }
      // Enlazar cover y dueDate desde el libro si no vienen en el préstamo
      const loansWithDetails = loansData.map((loan: Loan) => {
        const book = booksData.find((b: Book) => b.id === loan.bookId);
        return {
          ...loan,
          cover: loan.cover || book?.cover || '',
          dueDate: loan.dueDate || loan.returnDate || '',
        };
      });
      setLoans(loansWithDetails);
      setBooks(booksData);
      setStudents(studentsData);
    } catch (error) {
      toast.error('Error al cargar los datos');
    } finally {
      setLoading(false);
    }
  };

  const filterLoans = () => {
    let filtered = loans;
    if (searchTerm) {
      filtered = filtered.filter(loan =>
        loan.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        loan.studentName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (statusFilter) {
      filtered = filtered.filter(loan => loan.status === statusFilter);
    }
    setFilteredLoans(filtered);
  };

  const handleCreateLoan = async (loanData: LoanFormData) => {
    try {
      await api.createLoan(loanData);
      toast.success('Préstamo registrado exitosamente');
      setShowForm(false);
      fetchData();
    } catch (error: any) {
      toast.error(error.message || 'Error al registrar el préstamo');
    }
  };

  const handleReturnLoan = async (loanId: string) => {
    try {
      await api.returnLoan(loanId);
      toast.success('Libro devuelto exitosamente');
      fetchData();
    } catch (error: any) {
      toast.error(error.message || 'Error al devolver el libro');
    }
  };

  return (
    <div className="min-vh-100 pt-5 pb-5 bg-light" style={{ background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)' }}>
      <div className="container">
        {/* Banner visual */}
        <div className="mb-5 position-relative">
          <img src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=80" alt="Banner préstamos" className="w-100 rounded-4 shadow-lg object-fit-cover" style={{ maxHeight: 220, objectFit: 'cover', filter: 'brightness(0.85)' }} />
          <div className="position-absolute top-50 start-50 translate-middle text-center" style={{ zIndex: 2 }}>
            <h2 className="display-5 fw-bold text-primary mb-3" style={{ textShadow: '0 4px 24px #fff' }}>Préstamos</h2>
          </div>
        </div>
        <div className="row mb-4 align-items-center">
          <div className="col-md-6 mb-2 mb-md-0">
            <input type="text" className="form-control form-control-lg" placeholder="Buscar por libro o usuario..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>
          <div className="col-md-3">
            <select className="form-select form-select-lg" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
              <option value="">Todos</option>
              <option value="ACTIVE">Activo</option>
              <option value="RETURNED">Devuelto</option>
            </select>
          </div>
          <div className="col-md-3 text-end">
            <button className="btn btn-primary btn-lg fw-bold shadow" onClick={() => setShowForm(true)}>
              <Plus className="me-2" />Nuevo Préstamo
            </button>
          </div>
        </div>
        <div className="row g-4">
          {filteredLoans.map(loan => (
            <div className="col-12 col-md-6 col-lg-4 d-flex" key={loan.id}>
              <div className="card shadow border-0 flex-fill d-flex flex-column align-items-center p-4" style={{ borderRadius: 20 }}>
                <img src={loan.cover} alt={loan.bookTitle} className="mb-3 rounded-3 shadow" style={{ width: 100, height: 100, objectFit: 'cover' }} />
                <h3 className="fw-bold text-primary d-flex align-items-center gap-2">
                  <BookOpen size={22} className="me-1 text-primary" /> {loan.bookTitle}
                </h3>
                <div className="fs-5 text-secondary d-flex align-items-center gap-2 mb-1">
                  <UserIcon size={18} className="me-1 text-primary" /> {loan.studentName}
                </div>
                <div className="fs-6 text-secondary d-flex align-items-center gap-2">
                  <Calendar size={18} className="me-1 text-primary" /> Vence: <span className="fw-bold ms-1">{loan.dueDate ? new Date(loan.dueDate).toLocaleDateString() : 'Sin fecha'}</span>
                </div>
                <FileText className="mt-2 text-primary" size={28} />
                <div className="d-flex gap-2 mt-auto">
                  <button className="btn btn-primary fw-bold" onClick={() => alert('Renovar préstamo')}><RotateCcw className="me-1" size={16} />Renovar</button>
                  {loan.status === 'ACTIVE' && (
                    <button className="btn btn-secondary fw-bold" onClick={() => handleReturnLoan(loan.id)}><FileText className="me-1" size={16} />Devolver</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showForm && (
        <LoanForm books={books} students={students} onSubmit={handleCreateLoan} onCancel={() => setShowForm(false)} />
      )}
    </div>
  );
};

export default Loans;
