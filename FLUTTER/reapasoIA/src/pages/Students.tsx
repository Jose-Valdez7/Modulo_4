import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../config/api';
import { User, Loan } from '../types';
import { 
  Users, 
  Search, 
  Mail, 
  User as UserIcon,
  FileText,
  Calendar
} from 'lucide-react';

const Students: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 6;
  const { user } = useAuth();
    const [students, setStudents] = useState<User[]>([]); // Siempre array
    const [loans, setLoans] = useState<Loan[]>([]); // Siempre array
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Traer todos los estudiantes
      const studentsData = await api.getUsers();
      // Para cada estudiante, traer sus préstamos
      const loansPromises = studentsData.map((student: User) => api.getStudentLoans(student.id));
      const loansArrays = await Promise.all(loansPromises);
      // Unir todos los préstamos en un solo array
      const allLoans = loansArrays.flat();
      setStudents(studentsData);
      setLoans(allLoans);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStudentLoans = (studentId: string) => {
    return loans.filter(loan => loan.studentId === studentId);
  };

  const getActiveLoans = (studentId: string) => {
    return loans.filter(loan => loan.studentId === studentId && loan.status === 'ACTIVE');
  };

  const getOverdueLoans = (studentId: string) => {
    const activeLoans = getActiveLoans(studentId);
    return activeLoans.filter(loan => new Date(loan.returnDate) < new Date());
  };

  const filteredStudents = Array.isArray(students)
    ? students.filter(student =>
        student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (student.username && student.username.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : [];

  // Paginación robusta

  // Paginación robusta

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 pt-5 pb-5 bg-light" style={{ background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)' }}>
      <div className="container">
        {/* Banner decorativo */}
        <div className="mb-5 position-relative">
          <img src="/logo512.png" alt="Banner estudiantes" className="w-100 rounded-4 shadow-lg object-fit-cover" style={{ maxHeight: 180, objectFit: 'cover', filter: 'brightness(0.92)' }} />
          <div className="position-absolute top-50 start-50 translate-middle text-center" style={{ zIndex: 2 }}>
            <h2 className="display-5 fw-bold text-primary mb-3" style={{ textShadow: '0 4px 24px #fff' }}>Estudiantes</h2>
          </div>
        </div>
        <div className="row mb-4 align-items-center">
          <div className="col-md-6 mb-2 mb-md-0">
            <input type="text" className="form-control form-control-lg" placeholder="Buscar estudiante..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>
        </div>
        <div className="row g-4 justify-content-center">
          {filteredStudents.map(student => (
            <div className="col-12 col-md-6 col-lg-4 d-flex" key={student.id}>
              <div className="card shadow border-0 flex-fill d-flex flex-column p-4 align-items-center" style={{ borderRadius: 20 }}>
                {/* Avatar del estudiante */}
                <img src={student.avatar || '/avatars/default.png'} alt={student.name} className="mb-3 rounded-circle shadow" style={{ width: 80, height: 80, objectFit: 'cover', border: '3px solid #4f8cff' }} />
                <div className="d-flex align-items-center mb-2">
                  <UserIcon className="me-2 text-primary" size={28} />
                  <span className="fw-bold text-primary fs-5">{student.name}</span>
                </div>
                <div className="text-secondary mb-2"><Mail className="me-2" size={18} />{student.email}</div>
                <div className="mb-2"><FileText className="me-2 text-secondary" size={18} />Préstamos: {getStudentLoans(student.id).length}</div>
                <div className="mb-2"><Calendar className="me-2 text-secondary" size={18} />Activos: {getActiveLoans(student.id).length}</div>
                {getOverdueLoans(student.id).length > 0 && (
                  <div className="mt-2 p-2 bg-danger bg-opacity-10 border border-danger rounded-md">
                    <span className="text-danger fw-bold">Préstamos vencidos: {getOverdueLoans(student.id).length}</span>
                  </div>
                )}
                {/* Mostrar libros prestados y fechas */}
                {getStudentLoans(student.id).length > 0 && (
                  <div className="mt-3">
                    <div className="fw-bold text-primary mb-2">Libros prestados:</div>
                    <ul className="list-group list-group-flush">
                      {getStudentLoans(student.id).map(loan => (
                        <li key={loan.id} className="list-group-item px-0 py-1 d-flex align-items-center gap-2">
                          <span className="text-secondary">{loan.bookTitle}</span>
                          <span className="badge bg-info text-dark ms-auto">{loan.status}</span>
                          <span className="ms-2 text-secondary">{loan.dueDate ? `Vence: ${new Date(loan.dueDate).toLocaleDateString()}` : ''}</span>
                          {loan.returnedDate && <span className="ms-2 text-success">Devuelto: {new Date(loan.returnedDate).toLocaleDateString()}</span>}
                        </li>
                      ))}
                    </ul>
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

export default Students;
