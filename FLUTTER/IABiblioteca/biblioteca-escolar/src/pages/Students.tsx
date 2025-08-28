import React, { useEffect, useState } from 'react';
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
  const { user } = useAuth();
  const [students, setStudents] = useState<User[]>([]);
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [studentsData, loansData] = await Promise.all([
        api.getUsers(),
        api.getLoans()
      ]);
      setStudents(studentsData);
      setLoans(loansData);
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

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Estudiantes</h1>
        <p className="mt-1 text-sm text-gray-500">
          Gestiona la información de los estudiantes registrados
        </p>
      </div>

      {/* Filtros */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar estudiantes por nombre o email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          
          <div className="text-sm text-gray-500 flex items-center">
            <Users className="h-4 w-4 mr-1" />
            {filteredStudents.length} estudiante{filteredStudents.length !== 1 ? 's' : ''} encontrado{filteredStudents.length !== 1 ? 's' : ''}
          </div>
        </div>
      </div>

      {/* Lista de estudiantes */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        {filteredStudents.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {filteredStudents.map((student) => {
              const studentLoans = getStudentLoans(student.id);
              const activeLoans = getActiveLoans(student.id);
              const overdueLoans = getOverdueLoans(student.id);

              return (
                <li key={student.id} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 truncate">
                            {student.name}
                          </h3>
                          <p className="text-sm text-gray-500 flex items-center">
                            <Mail className="h-4 w-4 mr-1" />
                            {student.email}
                          </p>
                          <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <FileText className="h-4 w-4 mr-1" />
                              Total préstamos: {studentLoans.length}
                            </span>
                            <span className="flex items-center">
                              <UserIcon className="h-4 w-4 mr-1" />
                              Activos: {activeLoans.length}/3
                            </span>
                            {overdueLoans.length > 0 && (
                              <span className="flex items-center text-red-600">
                                <Calendar className="h-4 w-4 mr-1" />
                                Vencidos: {overdueLoans.length}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="ml-4 flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        activeLoans.length >= 3 
                          ? 'bg-red-100 text-red-800' 
                          : activeLoans.length > 0 
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {activeLoans.length >= 3 ? 'Límite alcanzado' : 
                         activeLoans.length > 0 ? 'Con préstamos' : 'Sin préstamos'}
                      </span>
                    </div>
                  </div>
                  
                  {/* Préstamos activos del estudiante */}
                  {activeLoans.length > 0 && (
                    <div className="mt-3 bg-gray-50 p-3 rounded-md">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">
                        Préstamos Activos:
                      </h4>
                      <div className="space-y-2">
                        {activeLoans.map((loan) => {
                          const isOverdue = new Date(loan.returnDate) < new Date();
                          return (
                            <div key={loan.id} className="flex items-center justify-between text-sm">
                              <span className="text-gray-700">{loan.bookTitle}</span>
                              <div className="flex items-center space-x-2">
                                <span className="text-gray-500">
                                  Devuelve: {new Date(loan.returnDate).toLocaleDateString()}
                                </span>
                                {isOverdue && (
                                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                                    Vencido
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No se encontraron estudiantes</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm 
                ? 'Intenta ajustar los términos de búsqueda'
                : 'No hay estudiantes registrados'
              }
            </p>
          </div>
        )}
      </div>

      {/* Estadísticas generales */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Estudiantes
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {students.length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Con Préstamos Activos
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {students.filter(student => getActiveLoans(student.id).length > 0).length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Calendar className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Con Préstamos Vencidos
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {students.filter(student => getOverdueLoans(student.id).length > 0).length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Students;
