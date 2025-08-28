import { motion } from 'framer-motion';

const books = [
  { id: 1, title: 'El Quijote', author: 'Miguel de Cervantes', description: 'Obra maestra de la literatura española.', cover: '/covers/quijote.jpg' },
  { id: 2, title: 'Cien años de soledad', author: 'Gabriel García Márquez', description: 'Novela del realismo mágico.', cover: '/covers/cien_anos.jpg' },
  { id: 3, title: '1984', author: 'George Orwell', description: 'Distopía política y social.', cover: '/covers/1984.jpg' },
  { id: 4, title: 'Rayuela', author: 'Julio Cortázar', description: 'Novela experimental.', cover: '/covers/rayuela.jpg' },
  { id: 5, title: 'Don Juan Tenorio', author: 'José Zorrilla', description: 'Drama romántico.', cover: '/covers/don_juan.jpg' },
  { id: 6, title: 'La Odisea', author: 'Homero', description: 'Poema épico griego.', cover: '/covers/odisea.jpg' },
  { id: 7, title: 'Ficciones', author: 'Jorge Luis Borges', description: 'Relatos fantásticos.', cover: '/covers/ficciones.jpg' },
  { id: 8, title: 'Pedro Páramo', author: 'Juan Rulfo', description: 'Novela mexicana.', cover: '/covers/pedro_paramo.jpg' },
  { id: 9, title: 'El Principito', author: 'Antoine de Saint-Exupéry', description: 'Cuento filosófico.', cover: '/covers/principito.jpg' },
  { id: 10, title: 'Hamlet', author: 'William Shakespeare', description: 'Tragedia clásica.', cover: '/covers/hamlet.jpg' },
];

export default function Catalogo() {
  return (
    <div className="min-h-screen pt-32 pb-16 bg-gradient-to-br from-blue-100 via-yellow-50 to-blue-900">
      <h2 className="text-4xl font-bold text-center text-blue-900 mb-10">Catálogo de Libros</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {books.map(book => (
          <motion.div
            key={book.id}
            whileHover={{ scale: 1.05, boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}
            className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col"
          >
            <img src={book.cover} alt={book.title} className="h-48 w-full object-cover" />
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-bold text-blue-900 mb-2">{book.title}</h3>
              <p className="text-blue-700 font-semibold mb-1">{book.author}</p>
              <p className="text-gray-600 mb-4">{book.description}</p>
              <a href={`/libro/${book.id}`} className="mt-auto px-4 py-2 rounded-lg bg-yellow-400 text-black font-bold shadow hover:bg-yellow-300 transition text-center">
                Ver más
              </a>
              <button
                className="mt-2 px-4 py-2 rounded-lg bg-blue-600 text-white font-bold shadow hover:bg-blue-700 transition"
                onClick={() => alert('Solicitud de préstamo enviada')}
              >
                Prestar
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
