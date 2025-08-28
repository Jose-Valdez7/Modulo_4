import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, User, Lock, Users, Book, ClipboardList } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { LoginCredentials } from '../types';
// ...existing code...
import { useNavigate } from 'react-router-dom';

const schema = yup.object({
  username: yup.string().required('El usuario es requerido'),
  password: yup.string().required('La contraseña es requerida'),
}).required();

const Login: React.FC = () => {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>({
    resolver: yupResolver(schema) as any,
  });

  const onSubmit = async (data: LoginCredentials) => {
    setIsLoading(true);
    try {
      await login(data);
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      toast.success(`Bienvenido, ${userData.name || userData.username}!`);
      setTimeout(() => {
        navigate('/home');
      }, 1000);
    } catch (error) {
      console.error('Login error:', error);
      if (error instanceof Error) {
        toast.error(`Error: ${error.message}`);
      } else {
        toast.error('Credenciales inválidas');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Contadores animados
  const [stats, setStats] = useState({ books: 120, loans: 34, users: 18 });
  useEffect(() => {
    // Aquí podrías cargar datos reales del backend
  }, []);

  return (
    <div className="login-bg d-flex align-items-center justify-content-center min-vh-100" style={{ background: 'linear-gradient(135deg, #e0eafc 60%, #fca5a5 100%)', position: 'relative' }}>
      <div className="card shadow-lg border-0 p-4" style={{ maxWidth: 420, width: '100%', borderRadius: 24 }}>
        <div className="text-center mb-4">
          <img src="/logo192.png" alt="Logo" style={{ width: 72, height: 72 }} className="mb-2" />
          <h2 className="fw-bold mb-1" style={{ color: '#4f8cff', letterSpacing: 1 }}>Bienvenido</h2>
          <p className="text-muted mb-0">Biblioteca Escolar</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Usuario</label>
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0"><User size={20} /></span>
              <input type="text" {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''} border-start-0`} placeholder="Usuario" autoFocus />
              {errors.username && <div className="invalid-feedback">{errors.username.message}</div>}
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Contraseña</label>
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0"><Lock size={20} /></span>
              <input type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''} border-start-0`} placeholder="Contraseña" />
              {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-100 fw-bold py-2 mt-2" disabled={isLoading}>
            {isLoading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
        <div className="d-flex justify-content-between align-items-center mt-4">
          <div className="d-flex align-items-center gap-2">
            <BookOpen size={20} className="text-primary" />
            <span className="fw-semibold text-secondary">Libros: <span className="text-dark">{stats.books}</span></span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <ClipboardList size={20} className="text-primary" />
            <span className="fw-semibold text-secondary">Préstamos: <span className="text-dark">{stats.loans}</span></span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <Users size={20} className="text-primary" />
            <span className="fw-semibold text-secondary">Usuarios: <span className="text-dark">{stats.users}</span></span>
          </div>
        </div>
      </div>
      <img src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80" alt="Libros" style={{ position: 'absolute', right: 0, bottom: 0, width: 180, opacity: 0.18, borderBottomRightRadius: 24 }} />
    </div>
  );
};

export default Login;
