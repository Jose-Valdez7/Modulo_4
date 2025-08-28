// Configuración de la API - Versión simplificada
const API_BASE_URL = 'http://localhost:3001/api';

// Función helper para manejar respuestas de la API
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

// Función helper para obtener headers con token
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export const api = {
  // Autenticación
  login: async (credentials: { username: string; password: string }) => {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await handleResponse(response);
    
    if (data.success) {
      localStorage.setItem('token', data.data.token);
      return {
        user: data.data.user,
        token: data.data.token,
      };
    } else {
      throw new Error(data.message || 'Error en el login');
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Verificar token
  verifyToken: async (): Promise<any> => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No hay token');
    }

    const response = await fetch(`${API_BASE_URL}/users/me`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    const data = await handleResponse(response);
    return data.success ? data.data : null;
  },

  // Libros
  getBooks: async (): Promise<any[]> => {
    const response = await fetch(`${API_BASE_URL}/books`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    const data = await handleResponse(response);
    return data.success ? data.data.books : [];
  },

  getBook: async (id: string): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/books/${id}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    const data = await handleResponse(response);
    return data.success ? data.data : null;
  },

  createBook: async (bookData: any): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/books`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(bookData),
    });

    const data = await handleResponse(response);
    return data.success ? data.data : null;
  },

  updateBook: async (id: string, bookData: any): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/books/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(bookData),
    });

    const data = await handleResponse(response);
    return data.success ? data.data : null;
  },

  deleteBook: async (id: string): Promise<void> => {
    await fetch(`${API_BASE_URL}/books/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
  },

  // Préstamos
  getLoans: async (): Promise<any[]> => {
    const response = await fetch(`${API_BASE_URL}/loans`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    const data = await handleResponse(response);
    return data.success ? data.data.loans : [];
  },

  getStudentLoans: async (studentId: string): Promise<any[]> => {
    const response = await fetch(`${API_BASE_URL}/loans/student/${studentId}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    const data = await handleResponse(response);
    return data.success ? data.data.loans : [];
  },

  createLoan: async (loanData: any): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/loans`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(loanData),
    });

    const data = await handleResponse(response);
    return data.success ? data.data : null;
  },

  returnLoan: async (loanId: string): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/loans/${loanId}/return`, {
      method: 'PUT',
      headers: getAuthHeaders(),
    });

    const data = await handleResponse(response);
    return data.success ? data.data : null;
  },

  // Usuarios
  getUsers: async (): Promise<any[]> => {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    const data = await handleResponse(response);
    return data.success ? data.data.users : [];
  },

  // Endpoint público para usuarios
  getPublicUsers: async (): Promise<any[]> => {
    const response = await fetch(`${API_BASE_URL}/users/public`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await handleResponse(response);
    return data.success ? data.data.users : [];
  },

  // Reportes
  getActiveLoans: async (): Promise<any[]> => {
    const response = await fetch(`${API_BASE_URL}/loans/active`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    const data = await handleResponse(response);
    return data.success ? data.data.loans : [];
  },

  // Estadísticas
  getUserStats: async () => {
    const response = await fetch(`${API_BASE_URL}/users/stats/overview`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    const data = await handleResponse(response);
    return data.success ? data.data : null;
  },
};
