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

  return (
    <div className="modal fade show d-block" tabIndex={-1} style={{ background: 'rgba(0,0,0,0.4)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content shadow-lg rounded-4 border-0">
          <div className="modal-header d-flex justify-content-between align-items-center border-0 pb-0">
            <h3 className="modal-title fs-4 fw-bold text-primary">
              Registrar Nuevo Préstamo
            </h3>
            <button type="button" className="btn-close" aria-label="Cerrar" onClick={onCancel}></button>
          </div>
          <div className="modal-body pt-2">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label htmlFor="bookId" className="form-label fw-semibold">Libro</label>
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0"><BookOpen size={20} /></span>
                  <select {...register('bookId')} className={`form-select ${errors.bookId ? 'is-invalid' : ''} border-start-0`}>
                    <option value="">Selecciona un libro</option>
                    {books.map(book => (
                      <option key={book.id} value={book.id}>{book.title}</option>
                    ))}
                  </select>
                  {errors.bookId && <div className="invalid-feedback">{errors.bookId.message}</div>}
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="studentId" className="form-label fw-semibold">Estudiante</label>
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0"><UserIcon size={20} /></span>
                  <select {...register('studentId')} className={`form-select ${errors.studentId ? 'is-invalid' : ''} border-start-0`}>
                    <option value="">Selecciona un estudiante</option>
                    {students.map(student => (
                      <option key={student.id} value={student.id}>{student.name}</option>
                    ))}
                  </select>
                  {errors.studentId && <div className="invalid-feedback">{errors.studentId.message}</div>}
                </div>
              </div>
              <div className="d-flex justify-content-end gap-2 pt-2">
                <button type="button" onClick={onCancel} className="btn btn-outline-secondary">Cancelar</button>
                <button type="submit" className="btn btn-primary shadow-sm">Registrar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanForm;
