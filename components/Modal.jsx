'use client';

import React from 'react';

export default function Modal({ isOpen, onClose, children, width }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-50">
      <div className={`bg-white rounded-xl shadow-xl p-6 w-full ${width || 'max-w-lg'} relative`}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 cursor-pointer text-gray-400 hover:text-gray-700 text-2xl"
        >
          &times;
        </button>

        {/* Modal Content */}
        {children}
      </div>
    </div>
  );
}
