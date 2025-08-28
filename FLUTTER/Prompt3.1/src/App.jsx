import React from 'react';
import PhoneCard from './components/PhoneCard';
import { phones } from './data/phones';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl md:text-4xl font-bold text-center">
            📱 Tienda de Celulares
          </h1>
          <p className="text-center mt-2 text-blue-100">
            Los mejores smartphones al mejor precio
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Catálogo de Celulares
          </h2>
          <p className="text-gray-600">
            Descubre nuestra selección de los mejores smartphones del mercado
          </p>
        </div>

        {/* Phone Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {phones.map((phone) => (
            <PhoneCard key={phone.id} phone={phone} />
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600">{phones.length}</div>
              <div className="text-gray-600">Modelos disponibles</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">Gratis</div>
              <div className="text-gray-600">Envío a todo el país</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">24/7</div>
              <div className="text-gray-600">Soporte técnico</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-sm">
              © 2025 Tienda de Celulares - Todos los derechos reservados
            </p>
            <div className="mt-4 flex justify-center space-x-6 text-sm text-gray-300">
              <a href="#" className="hover:text-white transition-colors">Política de Privacidad</a>
              <a href="#" className="hover:text-white transition-colors">Términos y Condiciones</a>
              <a href="#" className="hover:text-white transition-colors">Contacto</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

