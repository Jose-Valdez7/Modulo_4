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
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Mis Préstamos</h1>
        <p className="mt-1 text-sm text-gray-500">
          Consulta el estado de tus libros prestados
        </p>
      </div>

      {/* Resumen */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Préstamos Activos
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {activeLoans.length}
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
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Préstamos Vencidos
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {overdueLoans.length}
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
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Libros Devueltos
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {returnedLoans.length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Préstamos Activos */}
      {activeLoans.length > 0 && (
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Préstamos Activos
            </h3>
            <div className="space-y-4">
              {activeLoans.map((loan) => (
                <div key={loan.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-lg font-medium text-gray-900">
                        {loan.bookTitle}
                      </h4>
                      <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          Préstamo: {new Date(loan.loanDate).toLocaleDateString()}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          Devolución: {new Date(loan.returnDate).toLocaleDateString()}
                        </span>
                      </div>
                      
                      {isOverdue(loan.returnDate) ? (
                        <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-md">
                          <p className="text-sm text-red-700 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            ⚠️ Este préstamo está vencido desde {new Date(loan.returnDate).toLocaleDateString()}
                          </p>
                        </div>
                      ) : (
                        <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded-md">
                          <p className="text-sm text-blue-700 flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            Te quedan {getDaysRemaining(loan.returnDate)} días para devolver el libro
                          </p>
                        </div>
                      )}
                    </div>
                    
                    <div className="ml-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(loan)}`}>
                        {getStatusIcon(loan)}
                        <span className="ml-1">{getStatusText(loan)}</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Préstamos Devueltos */}
      {returnedLoans.length > 0 && (
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Historial de Préstamos
            </h3>
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Libro
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha Préstamo
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha Devolución
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {returnedLoans.map((loan) => (
                    <tr key={loan.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {loan.bookTitle}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(loan.loanDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {loan.returnedDate ? new Date(loan.returnedDate).toLocaleDateString() : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(loan)}`}>
                          {getStatusIcon(loan)}
                          <span className="ml-1">{getStatusText(loan)}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Sin préstamos */}
      {loans.length === 0 && (
        <div className="text-center py-12">
          <FileText className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No tienes préstamos</h3>
          <p className="mt-1 text-sm text-gray-500">
            Visita el catálogo para solicitar libros
          </p>
        </div>
      )}

      {/* Información adicional */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-blue-900 mb-2">Información Importante</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Puedes tener hasta 3 libros prestados simultáneamente</li>
          <li>• El plazo de préstamo es de 30 días</li>
          <li>• Los libros vencidos deben devolverse lo antes posible</li>
          <li>• Para renovar un préstamo, contacta al bibliotecario</li>
        </ul>
      </div>
    </div>
  );
};

export default MyLoans;
