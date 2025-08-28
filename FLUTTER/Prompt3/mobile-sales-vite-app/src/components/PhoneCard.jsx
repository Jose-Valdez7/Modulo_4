import React from 'react';

const PhoneCard = ({ model, image, price, description }) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
            <img className="w-full" src={image} alt={model} />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{model}</div>
                <p className="text-gray-700 text-base">{description}</p>
                <p className="text-gray-900 font-bold text-xl mt-2">{price}</p>
            </div>
            <div className="px-6 pt-4 pb-2">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Buy
                </button>
            </div>
        </div>
    );
};

export default PhoneCard;