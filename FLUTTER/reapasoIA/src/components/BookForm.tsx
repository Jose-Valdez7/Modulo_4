import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Book, BookFormData } from '../types';
import { X } from 'lucide-react';

const schema = yup.object({
  title: yup.string().required('El título es requerido'),
  author: yup.string().required('El autor es requerido'),
  isbn: yup.string().required('El ISBN es requerido'),
  stock: yup.number().min(1, 'El stock debe ser mayor a 0').required('El stock es requerido'),
  category: yup.string().required('La categoría es requerida'),
  publishedYear: yup.number().min(1800, 'Año inválido').max(new Date().getFullYear(), 'Año inválido').required('El año es requerido'),
  description: yup.string().optional(),
  cover: yup.string().url('Debe ser una URL válida').optional(),
}).required();

interface BookFormProps {
  book?: Book | null;
  onSubmit: (data: BookFormData) => void;
  onCancel: () => void;
}

const BookForm: React.FC<BookFormProps> = ({ book, onSubmit, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<BookFormData>({
    resolver: yupResolver(schema) as any,
    defaultValues: book ? {
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      stock: book.stock,
      category: book.category,
      publishedYear: book.publishedYear,
      description: book.description || '',
      cover: book.cover || '',
    } : undefined,
  });

  const isEditing = !!book;

  return (
    <div className="modal fade show d-block" tabIndex={-1} style={{ background: 'rgba(0,0,0,0.4)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content shadow-lg rounded-4 border-0">
          <div className="modal-header d-flex justify-content-between align-items-center border-0 pb-0">
            <h3 className="modal-title fs-4 fw-bold text-primary">
              {isEditing ? 'Editar Libro' : 'Agregar Libro'}
            </h3>
            <button type="button" className="btn-close" aria-label="Cerrar" onClick={onCancel}></button>
          </div>
          <div className="modal-body pt-2">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label fw-semibold">Título</label>
                <input {...register('title')} type="text" className={`form-control ${errors.title ? 'is-invalid' : ''}`} placeholder="Ingresa el título del libro" />
                {errors.title && <div className="invalid-feedback">{errors.title.message}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="author" className="form-label fw-semibold">Autor</label>
                <input {...register('author')} type="text" className={`form-control ${errors.author ? 'is-invalid' : ''}`} placeholder="Ingresa el autor del libro" />
                {errors.author && <div className="invalid-feedback">{errors.author.message}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="isbn" className="form-label fw-semibold">ISBN</label>
                <input {...register('isbn')} type="text" className={`form-control ${errors.isbn ? 'is-invalid' : ''}`} placeholder="Ingresa el ISBN del libro" />
                {errors.isbn && <div className="invalid-feedback">{errors.isbn.message}</div>}
              </div>
              <div className="row">
                <div className="col-6 mb-3">
                  <label htmlFor="stock" className="form-label fw-semibold">Stock</label>
                  <input {...register('stock', { valueAsNumber: true })} type="number" min="1" className={`form-control ${errors.stock ? 'is-invalid' : ''}`} placeholder="Cantidad" />
                  {errors.stock && <div className="invalid-feedback">{errors.stock.message}</div>}
                </div>
                <div className="col-6 mb-3">
                  <label htmlFor="publishedYear" className="form-label fw-semibold">Año de Publicación</label>
                  <input {...register('publishedYear', { valueAsNumber: true })} type="number" min="1800" max={new Date().getFullYear()} className={`form-control ${errors.publishedYear ? 'is-invalid' : ''}`} placeholder="Año" />
                  {errors.publishedYear && <div className="invalid-feedback">{errors.publishedYear.message}</div>}
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="category" className="form-label fw-semibold">Categoría</label>
                <select {...register('category')} className={`form-select ${errors.category ? 'is-invalid' : ''}`} >
                  <option value="">Selecciona una categoría</option>
                  <option value="Literatura Clásica">Literatura Clásica</option>
                  <option value="Literatura Latinoamericana">Literatura Latinoamericana</option>
                  <option value="Fantasía">Fantasía</option>
                  <option value="Ciencia Ficción">Ciencia Ficción</option>
                  <option value="Misterio">Misterio</option>
                  <option value="Romance">Romance</option>
                  <option value="Historia">Historia</option>
                  <option value="Ciencias">Ciencias</option>
                  <option value="Matemáticas">Matemáticas</option>
                  <option value="Filosofía">Filosofía</option>
                  <option value="Otros">Otros</option>
                </select>
                {errors.category && <div className="invalid-feedback">{errors.category.message}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label fw-semibold">Descripción (opcional)</label>
                <textarea {...register('description')} rows={3} className={`form-control ${errors.description ? 'is-invalid' : ''}`} placeholder="Ingresa una descripción del libro" />
                {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="cover" className="form-label fw-semibold">Portada (URL)</label>
                <input
                  {...register('cover')}
                  type="text"
                  className={`form-control ${errors.cover ? 'is-invalid' : ''}`}
                  placeholder="URL de la imagen de portada"
                />
                {errors.cover && <div className="invalid-feedback">{errors.cover.message}</div>}
                {watch('cover') && (
                  <div className="mt-2 text-center">
                    <img src={watch('cover')} alt="Portada" style={{ maxWidth: 120, borderRadius: 12, boxShadow: '0 2px 8px #4f8cff' }} />
                  </div>
                )}
              </div>
              <div className="d-flex justify-content-end gap-2 pt-2">
                <button type="button" onClick={onCancel} className="btn btn-outline-secondary">Cancelar</button>
                <button type="submit" className="btn btn-primary shadow-sm">{isEditing ? 'Actualizar' : 'Crear'}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookForm;
