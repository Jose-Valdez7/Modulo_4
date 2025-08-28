import React from 'react';
import phones from './data/phones';
import PhoneCard from './components/PhoneCard';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4 text-center">
        <h1 className="text-2xl font-bold">Tienda de Celulares</h1>
      </header>
      <main className="flex-grow p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {phones.map((phone) => (
            <PhoneCard
              key={phone.id}
              modelName={phone.modelName}
              image={phone.image}
              price={phone.price}
              description={phone.description}
            />
          ))}
        </div>
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>© 2025 Tienda de Celulares - Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default App;