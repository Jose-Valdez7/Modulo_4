// ...existing code...
import React from 'react';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  return (
    <div style={{ minHeight: '100vh', paddingTop: '6rem', paddingBottom: '3rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', background: 'linear-gradient(135deg, #dbeafe 60%, #fca5a5 100%)' }}>
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} style={{ padding: '3rem 2rem', borderRadius: '3rem', boxShadow: '0 16px 48px rgba(0,0,0,0.18)', background: 'linear-gradient(135deg, #60a5fa 60%, #fca5a5 100%)', border: '6px solid #ef4444', margin: '0 2rem' }}>
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }} style={{ fontSize: '3.5rem', fontWeight: 'bold', color: '#2563eb', marginBottom: '2rem', textAlign: 'center', letterSpacing: '2px', textShadow: '0 2px 12px #fca5a5' }}>
          Biblioteca Escolar
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.7 }} style={{ fontSize: '1.7rem', color: '#ef4444', fontWeight: '700', marginBottom: '2.5rem', textAlign: 'center', textShadow: '0 2px 12px #fbbf24' }}>
          Un sistema moderno y confiable para la gestión de libros, préstamos y usuarios. Descubre una experiencia digital pensada para estudiantes y profesores.
        </motion.p>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '3rem', justifyContent: 'center', alignItems: 'center' }}>
          <motion.div whileHover={{ scale: 1.07 }} style={{ background: 'linear-gradient(135deg, #fbbf24 60%, #60a5fa 100%)', borderRadius: '2rem', padding: '2.5rem 2rem', boxShadow: '0 4px 16px #fbbf24', transition: 'transform 0.3s', minWidth: '320px', maxWidth: '400px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 'bold', color: '#2563eb', marginBottom: '1rem', textShadow: '0 2px 8px #fca5a5' }}>Catálogo de Libros</h2>
            <p style={{ color: '#ef4444', fontSize: '1.2rem', marginBottom: '1.5rem', fontWeight: 'bold' }}>Explora cientos de títulos y autores en nuestra biblioteca digital.</p>
            <a href="/catalogo" style={{ padding: '1rem 2.5rem', borderRadius: '1.2rem', background: 'linear-gradient(90deg, #2563eb 60%, #ef4444 100%)', color: '#fff', fontWeight: 'bold', fontSize: '1.3rem', boxShadow: '0 2px 8px #2563eb', border: '2px solid #fbbf24', textDecoration: 'none', display: 'inline-block', transition: 'background 0.2s' }}>Ver Catálogo</a>
          </motion.div>
          <motion.div whileHover={{ scale: 1.07 }} style={{ background: 'linear-gradient(135deg, #ef4444 60%, #fbbf24 100%)', borderRadius: '2rem', padding: '2.5rem 2rem', boxShadow: '0 4px 16px #ef4444', transition: 'transform 0.3s', minWidth: '320px', maxWidth: '400px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 'bold', color: '#2563eb', marginBottom: '1rem', textShadow: '0 2px 8px #fca5a5' }}>Perfil de Usuario</h2>
            <p style={{ color: '#fbbf24', fontSize: '1.2rem', marginBottom: '1.5rem', fontWeight: 'bold' }}>Consulta tus préstamos, historial y libros favoritos.</p>
            <a href="/perfil" style={{ padding: '1rem 2.5rem', borderRadius: '1.2rem', background: 'linear-gradient(90deg, #2563eb 60%, #fbbf24 100%)', color: '#fff', fontWeight: 'bold', fontSize: '1.3rem', boxShadow: '0 2px 8px #2563eb', border: '2px solid #ef4444', textDecoration: 'none', display: 'inline-block', transition: 'background 0.2s' }}>Ver Perfil</a>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default Home;

