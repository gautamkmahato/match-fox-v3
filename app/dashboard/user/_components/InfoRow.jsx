// components/InfoRow.tsx
import React from 'react';



const InfoRow = ({ icon, label, value }) => {
  return (
    <div className="flex items-center px-2 py-2 border border-gray-50 shadow-sm rounded-xl">
      <div className="w-8 h-8 flex items-center justify-center text-gray-500 mr-4">
        {icon}
      </div>
      <div>
        <p className="text-xs text-light-gray-text text-gray-500">{label}</p>
        <p className="text-sm text-dark-gray-text text-gray-700 font-semibold">{value}</p>
      </div>
    </div>
  );
};

export default InfoRow;