// components/Layout.tsx
import React from 'react';
import { ChevronDown, Search, Bell, Settings } from 'lucide-react'; // Example icons for header


const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-light-gray-bg">
      {/* Sidebar (Placeholder for now) */}
      <aside className="w-64 bg-white shadow-sm p-4 hidden md:block">
        <div className="flex items-center space-x-2 mb-8">
          {/* Replace with your logo */}
          <span className="text-xl font-bold text-primary-purple">coderspace</span>
          <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-500">ADMIN</span>
        </div>
        <nav>
          <ul>
            <li className="mb-2">
              <a href="#" className="flex items-center p-2 rounded-md hover:bg-gray-100 text-dark-gray-text">
                Homepage
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="flex items-center p-2 rounded-md bg-primary-purple text-white">
                Candidates
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="flex items-center p-2 rounded-md hover:bg-gray-100 text-dark-gray-text">
                Positions
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-end p-4 bg-white shadow-sm z-10">
          <div className="flex items-center space-x-4">
            <span className="text-dark-gray-text">Ahmet Heygör</span>
            <img src="/ahmet-heygoer.jpg" alt="Ahmet Heygör" className="w-8 h-8 rounded-full" />
            <ChevronDown className="w-4 h-4 text-gray-500" />
            <span className="text-gray-500">EN</span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </div>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;