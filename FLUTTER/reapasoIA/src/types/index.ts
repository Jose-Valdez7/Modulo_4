export interface User {
  id: string;
  username: string;
  name: string;
  role: 'BIBLIOTECARIO' | 'ESTUDIANTE';
  email: string;
  isActive: boolean;
  avatar?: string; // URL de la imagen de perfil
  createdAt: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  stock: number;
  available: number;
  category: string;
  publishedYear: number;
  description?: string;
  cover?: string; // URL de la imagen de portada
  createdAt: string;
  updatedAt: string;
}

export interface Loan {
  id: string;
  bookId: string;
  bookTitle: string;
  studentId: string;
  studentName: string;
  loanDate: string;
  returnDate: string;
  status: 'ACTIVE' | 'RETURNED' | 'OVERDUE' | 'LOST';
  returnedDate?: string;
  createdAt: string;
  updatedAt: string;
  cover?: string; // URL de la portada del libro
  dueDate?: string; // Fecha de vencimiento
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface BookFormData {
  title: string;
  author: string;
  isbn: string;
  stock: number;
  category: string;
  publishedYear: number;
  description?: string;
}

export interface LoanFormData {
  bookId: string;
  studentId: string;
}

export interface UserFormData {
  username: string;
  name: string;
  email: string;
  password: string;
  role: 'BIBLIOTECARIO' | 'ESTUDIANTE';
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginatedResponse<T> {
  users?: T[];
  books?: T[];
  loans?: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
