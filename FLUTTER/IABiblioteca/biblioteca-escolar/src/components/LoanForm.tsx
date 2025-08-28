import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Book, User, LoanFormData } from '../types';
import { X, BookOpen, User as UserIcon } from 'lucide-react';

const schema = yup.object({
  bookId: yup.string().required('El libro es requerido'),
  studentId: yup.string().required('El estudiante es requerido'),
}).required();

interface LoanFormProps {
  books: Book[];
  students: User[];
  onSubmit: (data: LoanFormData) => void;
  onCancel: () => void;
}

const LoanForm: React.FC<LoanFormProps> = ({ books, students, onSubmit, onCancel }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoanFormData>({
    resolver: yupResolver(schema),
  });

  const selectedBookId = watch('bookId');
  const selectedStudentId = watch('studentId');

  const selectedBook = books.find(book => book.id === selectedBookId);
  const selectedStudent = students.find(student => student.id === selectedStudentId);

  // Verificar si el estudiante ya tiene 3 préstamos activos
  const studentActiveLoans = students.find(student => student.id === selectedStudentId) ? 0 : 0; // Esto se calcularía con los préstamos reales

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">
            Registrar Nuevo Préstamo
          </h3>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="bookId" className="block text-sm font-medium text-gray-700">
              Libro
            </label>
            <select
              {...register('bookId')}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Selecciona un libro</option>
              {books
                .filter(book => book.available > 0)
                .map(book => (
                  <option key={book.id} value={book.id}>
                    {book.title} - {book.author} ({book.available} disponibles)
                  </option>
                ))}
            </select>
            {errors.bookId && (
              <p className="mt-1 text-sm text-red-600">{errors.bookId.message}</p>
            )}
          </div>

          {selectedBook && (
            <div className="bg-blue-50 p-3 rounded-md">
              <div className="flex items-start">
                <BookOpen className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-blue-900">{selectedBook.title}</h4>
                  <p className="text-sm text-blue-700">{selectedBook.author}</p>
                  <p className="text-xs text-blue-600">
                    ISBN: {selectedBook.isbn} • Categoría: {selectedBook.category}
                  </p>
                  <p className="text-xs text-blue-600">
                    {selectedBook.available} de {selectedBook.stock} ejemplares disponibles
                  </p>
                </div>
              </div>
            </div>
          )}

          <div>
            <label htmlFor="studentId" className="block text-sm font-medium text-gray-700">
              Estudiante
            </label>
            <select
              {...register('studentId')}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Selecciona un estudiante</option>
              {students.map(student => (
                <option key={student.id} value={student.id}>
                  {student.name} ({student.email})
                </option>
              ))}
            </select>
            {errors.studentId && (
              <p className="mt-1 text-sm text-red-600">{errors.studentId.message}</p>
            )}
          </div>

          {selectedStudent && (
            <div className="bg-green-50 p-3 rounded-md">
              <div className="flex items-start">
                <UserIcon className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-green-900">{selectedStudent.name}</h4>
                  <p className="text-sm text-green-700">{selectedStudent.email}</p>
                  <p className="text-xs text-green-600">
                    Préstamos activos: {studentActiveLoans}/3
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Información del préstamo */}
          <div className="bg-gray-50 p-4 rounded-md">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Información del Préstamo</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Fecha de préstamo:</span>
                <span className="font-medium">{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Fecha de devolución:</span>
                <span className="font-medium">
                  {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Duración:</span>
                <span className="font-medium">30 días</span>
              </div>
            </div>
          </div>

          {/* Advertencias */}
          {selectedBook && selectedBook.available <= 0 && (
            <div className="bg-red-50 p-3 rounded-md">
              <p className="text-sm text-red-700">
                ⚠️ No hay ejemplares disponibles de este libro
              </p>
            </div>
          )}

          {selectedStudent && studentActiveLoans >= 3 && (
            <div className="bg-red-50 p-3 rounded-md">
              <p className="text-sm text-red-700">
                ⚠️ Este estudiante ya tiene 3 libros prestados (límite máximo)
              </p>
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!selectedBookId || !selectedStudentId || (selectedBook && selectedBook.available <= 0) || studentActiveLoans >= 3}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Registrar Préstamo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoanForm;
