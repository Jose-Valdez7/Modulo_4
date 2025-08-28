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
    <div className="login-bg" style={{ background: 'linear-gradient(135deg, #dbeafe 60%, #fca5a5 100%)', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      {/* Contadores en la parte superior, alineados horizontalmente y más grandes */}
      <div style={{ display: 'flex', gap: '3rem', justifyContent: 'center', marginTop: '3rem', marginBottom: '2.5rem', zIndex: 10 }}>
        <div className="login-contador contador-libros" style={{ background: 'linear-gradient(135deg, #60a5fa 60%, #fbbf24 100%)', color: '#fff', border: '4px solid #2563eb', width: '120px', height: '120px', fontSize: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px #60a5fa', borderRadius: '50%' }}>
          <Book style={{ fontSize: '3.5rem', color: '#fff', marginBottom: '0.2rem' }} />
          <span style={{ fontWeight: 'bold', fontSize: '2rem', color: '#1e293b', textShadow: '0 2px 8px #fbbf24' }}>{stats.books}</span>
          <span style={{ fontSize: '1.1rem', color: '#1e293b', fontWeight: 'bold', textShadow: '0 2px 8px #fbbf24' }}>Libros</span>
        </div>
        <div className="login-contador contador-prestamos" style={{ background: 'linear-gradient(135deg, #fbbf24 60%, #fca5a5 100%)', color: '#fff', border: '4px solid #fbbf24', width: '120px', height: '120px', fontSize: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px #fbbf24', borderRadius: '50%' }}>
          <ClipboardList style={{ fontSize: '3.5rem', color: '#fff', marginBottom: '0.2rem' }} />
          <span style={{ fontWeight: 'bold', fontSize: '2rem', color: '#1e293b', textShadow: '0 2px 8px #fca5a5' }}>{stats.loans}</span>
          <span style={{ fontSize: '1.1rem', color: '#1e293b', fontWeight: 'bold', textShadow: '0 2px 8px #fca5a5' }}>Préstamos</span>
        </div>
        <div className="login-contador contador-usuarios" style={{ background: 'linear-gradient(135deg, #fca5a5 60%, #60a5fa 100%)', color: '#fff', border: '4px solid #ef4444', width: '120px', height: '120px', fontSize: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px #ef4444', borderRadius: '50%' }}>
          <Users style={{ fontSize: '3.5rem', color: '#fff', marginBottom: '0.2rem' }} />
          <span style={{ fontWeight: 'bold', fontSize: '2rem', color: '#1e293b', textShadow: '0 2px 8px #60a5fa' }}>{stats.users}</span>
          <span style={{ fontSize: '1.1rem', color: '#1e293b', fontWeight: 'bold', textShadow: '0 2px 8px #60a5fa' }}>Usuarios</span>
        </div>
      </div>
      {/* Card más grande, moderna y llamativa */}
      <div className="login-card" style={{ background: 'linear-gradient(135deg, #60a5fa 60%, #fca5a5 100%)', border: '6px solid #ef4444', boxShadow: '0 16px 48px rgba(0,0,0,0.22)', maxWidth: '600px', width: '100%', padding: '4rem 3rem', borderRadius: '3rem', zIndex: 20 }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ margin: '0 auto', height: '100px', width: '100px', background: 'linear-gradient(135deg, #fbbf24 60%, #ef4444 100%)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 24px rgba(0,0,0,0.16)' }}>
            <BookOpen style={{ fontSize: '3.2rem', color: '#fff', filter: 'drop-shadow(0 2px 4px #ef4444)' }} />
          </div>
          <div style={{ fontSize: '3.2rem', fontWeight: 'bold', color: '#2563eb', marginTop: '1.5rem', letterSpacing: '1.5px', textShadow: '0 2px 12px #fca5a5' }}>Biblioteca Virtual</div>
          <div style={{ fontSize: '1.7rem', color: '#ef4444', fontWeight: '700', marginTop: '0.7rem', textShadow: '0 2px 12px #fbbf24' }}>¡Bienvenido! Ingresa tus datos para acceder</div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '2.2rem' }}>
          <label htmlFor="username" style={{ fontWeight: 'bold', color: '#2563eb', marginBottom: '0.5rem', marginLeft: '2rem', fontSize: '1.5rem' }}>Usuario</label>
          <div style={{ position: 'relative' }}>
            <User style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)', fontSize: '2rem', color: '#2563eb' }} />
            <input
              {...register('username')}
              id="username"
              type="text"
              className="login-input"
              placeholder="Ingresa tu usuario"
              style={{ paddingLeft: '3.2rem', fontSize: '1.5rem', border: '3px solid #fbbf24', background: '#e0f2fe', color: '#2563eb', fontWeight: '500', borderRadius: '1.2rem', boxShadow: '0 2px 12px #fbbf24', height: '3.2rem' }}
            />
          </div>
          {errors.username && (
            <p style={{ color: '#ef4444', fontWeight: 'bold', marginLeft: '2rem', marginTop: '0.5rem', fontSize: '1.1rem' }}>{errors.username.message}</p>
          )}
          <label htmlFor="password" style={{ fontWeight: 'bold', color: '#ef4444', marginBottom: '0.5rem', marginLeft: '2rem', fontSize: '1.5rem' }}>Contraseña</label>
          <div style={{ position: 'relative' }}>
            <Lock style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)', fontSize: '2rem', color: '#ef4444' }} />
            <input
              {...register('password')}
              id="password"
              type="password"
              className="login-input"
              placeholder="Ingresa tu contraseña"
              style={{ paddingLeft: '3.2rem', fontSize: '1.5rem', border: '3px solid #ef4444', background: '#fee2e2', color: '#ef4444', fontWeight: '500', borderRadius: '1.2rem', boxShadow: '0 2px 12px #ef4444', height: '3.2rem' }}
            />
          </div>
          {errors.password && (
            <p style={{ color: '#ef4444', fontWeight: 'bold', marginLeft: '2rem', marginTop: '0.5rem', fontSize: '1.1rem' }}>{errors.password.message}</p>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="login-btn"
            style={{ background: 'linear-gradient(90deg, #fbbf24 60%, #ef4444 100%)', color: '#fff', fontWeight: 'bold', fontSize: '1.5rem', border: '3px solid #2563eb', borderRadius: '1.2rem', boxShadow: '0 2px 12px #fbbf24', marginTop: '1.5rem', padding: '1.2rem 0' }}
          >
            {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
          <div className="login-cred" style={{ background: 'linear-gradient(90deg, #e0f2fe 60%, #fee2e2 100%)', border: '3px solid #fbbf24', borderRadius: '1.2rem', padding: '1.5rem', marginTop: '2rem', color: '#2563eb', fontSize: '1.2rem', width: '100%' }}>
            <strong>Credenciales de acceso:</strong><br />
            <span><strong>Bibliotecario:</strong> usuario: <span style={{ color: '#2563eb' }}>bibliotecario</span>, contraseña: <span style={{ color: '#ef4444' }}>password123</span></span><br />
            <span><strong>Estudiante 1:</strong> usuario: <span style={{ color: '#2563eb' }}>estudiante1</span>, contraseña: <span style={{ color: '#ef4444' }}>password123</span></span><br />
            <span><strong>Estudiante 2:</strong> usuario: <span style={{ color: '#2563eb' }}>estudiante2</span>, contraseña: <span style={{ color: '#ef4444' }}>password123</span></span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
