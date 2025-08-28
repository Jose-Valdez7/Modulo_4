import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../config/api';
import { Loan, Book, User, LoanFormData } from '../types';
import { toast } from 'react-toastify';
import { 
  Plus, 
  Search, 
  RotateCcw, 
  FileText,
  Filter,
  Calendar,
  User as UserIcon,
  BookOpen,
  Download
} from 'lucide-react';
import LoanForm from '../components/LoanForm';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

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
      const [loansData, booksData, studentsData] = await Promise.all([
        api.getLoans(),
        api.getBooks(),
        api.getUsers()
      ]);
      setLoans(loansData);
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

  const exportToPDF = () => {
    const doc = new jsPDF();
    
    // Título
    doc.setFontSize(18);
    doc.text('Reporte de Préstamos Activos', 14, 22);
    doc.setFontSize(12);
    doc.text(`Generado el: ${new Date().toLocaleDateString()}`, 14, 32);

    // Tabla
    const activeLoans = loans.filter(loan => loan.status === 'ACTIVE');
    const tableData = activeLoans.map(loan => [
      loan.bookTitle,
      loan.studentName,
      new Date(loan.loanDate).toLocaleDateString(),
      new Date(loan.returnDate).toLocaleDateString(),
      loan.status === 'ACTIVE' ? 'Activo' : 'Devuelto'
    ]);

    (doc as any).autoTable({
      head: [['Libro', 'Estudiante', 'Fecha Préstamo', 'Fecha Devolución', 'Estado']],
      body: tableData,
      startY: 40,
      styles: {
        fontSize: 10,
        cellPadding: 3,
      },
      headStyles: {
        fillColor: [59, 130, 246],
        textColor: 255,
        fontStyle: 'bold',
      },
    });

    doc.save('prestamos-activos.pdf');
    toast.success('Reporte exportado exitosamente');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'returned':
        return 'bg-blue-100 text-blue-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Activo';
      case 'returned':
        return 'Devuelto';
      case 'overdue':
        return 'Vencido';
      default:
        return status;
    }
  };

  const isOverdue = (returnDate: string) => {
    return new Date(returnDate) < new Date();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Préstamos</h1>
          <p className="mt-1 text-sm text-gray-500">
            Administra los préstamos y devoluciones de libros
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button
            onClick={exportToPDF}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Download className="h-4 w-4 mr-2" />
            Exportar PDF
          </button>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Préstamo
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar por libro o estudiante..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-5 w-5 text-gray-400" />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">Todos los estados</option>
              <option value="active">Activos</option>
              <option value="returned">Devueltos</option>
              <option value="overdue">Vencidos</option>
            </select>
          </div>

          <div className="text-sm text-gray-500 flex items-center">
            <FileText className="h-4 w-4 mr-1" />
            {filteredLoans.length} préstamo{filteredLoans.length !== 1 ? 's' : ''} encontrado{filteredLoans.length !== 1 ? 's' : ''}
          </div>
        </div>
      </div>

      {/* Lista de préstamos */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        {filteredLoans.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {filteredLoans.map((loan) => (
              <li key={loan.id} className="px-6 py-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 truncate">
                          {loan.bookTitle}
                        </h3>
                        <p className="text-sm text-gray-500 flex items-center">
                          <UserIcon className="h-4 w-4 mr-1" />
                          {loan.studentName}
                        </p>
                        <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            Préstamo: {new Date(loan.loanDate).toLocaleDateString()}
                          </span>
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            Devolución: {new Date(loan.returnDate).toLocaleDateString()}
                          </span>
                          {loan.returnedDate && (
                            <span className="flex items-center">
                              <RotateCcw className="h-4 w-4 mr-1" />
                              Devuelto: {new Date(loan.returnedDate).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(loan.status)}`}>
                      {getStatusText(loan.status)}
                    </span>
                    
                    {loan.status === 'ACTIVE' && (
                      <button
                        onClick={() => handleReturnLoan(loan.id)}
                        className="inline-flex items-center px-3 py-1 border border-green-300 shadow-sm text-sm leading-4 font-medium rounded-md text-green-700 bg-white hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        <RotateCcw className="h-4 w-4 mr-1" />
                        Devolver
                      </button>
                    )}
                  </div>
                </div>
                
                {loan.status === 'ACTIVE' && isOverdue(loan.returnDate) && (
                  <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-sm text-red-700">
                      ⚠️ Este préstamo está vencido desde {new Date(loan.returnDate).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No se encontraron préstamos</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || statusFilter 
                ? 'Intenta ajustar los filtros de búsqueda'
                : 'No hay préstamos registrados'
              }
            </p>
          </div>
        )}
      </div>

      {/* Modal de formulario */}
      {showForm && (
        <LoanForm
          books={books}
          students={students}
          onSubmit={handleCreateLoan}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default Loans;
