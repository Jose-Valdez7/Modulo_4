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
    } : undefined,
  });

  const isEditing = !!book;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">
            {isEditing ? 'Editar Libro' : 'Agregar Libro'}
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
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Título
            </label>
            <input
              {...register('title')}
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ingresa el título del libro"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-700">
              Autor
            </label>
            <input
              {...register('author')}
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ingresa el autor del libro"
            />
            {errors.author && (
              <p className="mt-1 text-sm text-red-600">{errors.author.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="isbn" className="block text-sm font-medium text-gray-700">
              ISBN
            </label>
            <input
              {...register('isbn')}
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ingresa el ISBN del libro"
            />
            {errors.isbn && (
              <p className="mt-1 text-sm text-red-600">{errors.isbn.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                Stock
              </label>
              <input
                {...register('stock', { valueAsNumber: true })}
                type="number"
                min="1"
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Cantidad"
              />
              {errors.stock && (
                <p className="mt-1 text-sm text-red-600">{errors.stock.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="publishedYear" className="block text-sm font-medium text-gray-700">
                Año de Publicación
              </label>
              <input
                {...register('publishedYear', { valueAsNumber: true })}
                type="number"
                min="1800"
                max={new Date().getFullYear()}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Año"
              />
              {errors.publishedYear && (
                <p className="mt-1 text-sm text-red-600">{errors.publishedYear.message}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Categoría
            </label>
            <select
              {...register('category')}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
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
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Descripción (opcional)
            </label>
            <textarea
              {...register('description')}
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ingresa una descripción del libro"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>

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
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {isEditing ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookForm;
