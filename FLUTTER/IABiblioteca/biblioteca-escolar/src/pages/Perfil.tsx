import { motion } from 'framer-motion';

const prestamos = [
  { id: 1, title: 'El Quijote', author: 'Miguel de Cervantes', fecha: '2025-08-01', estado: 'Activo' },
  { id: 2, title: '1984', author: 'George Orwell', fecha: '2025-07-15', estado: 'Devuelto' },
];

export default function Perfil() {
  return (
  <div style={{ minHeight: '100vh', paddingTop: '6rem', paddingBottom: '3rem', background: 'linear-gradient(135deg, #dbeafe 60%, #fca5a5 100%)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
      <h2 style={{ fontSize: '3rem', fontWeight: 'bold', textAlign: 'center', color: '#2563eb', marginBottom: '2.5rem', textShadow: '0 2px 12px #fca5a5' }}>Mi Perfil</h2>
      <div style={{ maxWidth: '700px', margin: '0 auto', background: 'linear-gradient(135deg, #60a5fa 60%, #fbbf24 100%)', borderRadius: '2.5rem', boxShadow: '0 12px 32px rgba(0,0,0,0.18)', padding: '3rem 2.5rem', border: '5px solid #ef4444' }}>
        <h3 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ef4444', marginBottom: '2rem', textShadow: '0 2px 8px #fbbf24' }}>Libros Prestados</h3>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {prestamos.map(p => (
            <motion.li
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ background: 'linear-gradient(90deg, #e0f2fe 60%, #fee2e2 100%)', borderRadius: '1.5rem', padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 12px #fbbf24', fontSize: '1.3rem' }}
            >
              <div>
                <span style={{ fontWeight: 'bold', color: '#2563eb', fontSize: '1.4rem' }}>{p.title}</span> <span style={{ color: '#ef4444', fontWeight: 'bold' }}>({p.author})</span>
                <div style={{ fontSize: '1rem', color: '#fbbf24', fontWeight: 'bold' }}>Fecha: {p.fecha}</div>
              </div>
              <span style={{ padding: '0.7rem 2rem', borderRadius: '1rem', fontWeight: 'bold', fontSize: '1.2rem', background: p.estado === 'Activo' ? 'linear-gradient(90deg, #fbbf24 60%, #60a5fa 100%)' : '#e5e7eb', color: p.estado === 'Activo' ? '#2563eb' : '#6b7280', boxShadow: p.estado === 'Activo' ? '0 2px 8px #fbbf24' : 'none' }}>
                {p.estado}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}
