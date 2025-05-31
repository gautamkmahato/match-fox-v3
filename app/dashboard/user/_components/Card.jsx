// components/Card.tsx
import { Pencil } from 'lucide-react';
import React from 'react';


const Card = ({ title, children, editAction }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-dark-gray-text">{title}</h2>
        {editAction && (
          <button onClick={editAction} className="flex items-center text-primary-purple text-sm">
            <Pencil className="w-4 h-4 mr-1" /> Edit
          </button>
        )}
      </div>
      {children}
    </div>
  );
};

export default Card;