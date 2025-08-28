import React from 'react';

const PhoneCard = ({ phone }) => {
  const handleBuyClick = () => {
    alert(`¡Gracias por tu interés en el ${phone.name}! Esta funcionalidad estará disponible pronto.`);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img 
          src={phone.image} 
          alt={phone.name}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x300?text=Imagen+no+disponible';
          }}
        />
        <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
          Nuevo
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{phone.name}</h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">
          {phone.description}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-blue-600">
            ${phone.price.toLocaleString()}
          </span>
          <span className="text-green-600 text-sm font-medium">
            Envío gratis
          </span>
        </div>
        
        <button
          onClick={handleBuyClick}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 transform hover:scale-105"
        >
          Comprar
        </button>
      </div>
    </div>
  );
};

export default PhoneCard;

