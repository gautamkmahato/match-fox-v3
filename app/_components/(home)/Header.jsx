'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, TriangleDashed, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="text-gray-700">
      <div className="bg-purple-800 max-w-4xl mx-auto px-4 sm:px-6 lg:px-4 border-2 border-purple-800 rounded-full shadow">
        <div className="flex items-center justify-between h-16">
          {/* Mobile Menu Button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 text-gray-100 flex items-center justify-center sm:justify-start flex-1 sm:flex-none">
            <Link href="/" className="flex gap-2 items-center justify-center font-bold text-xl">
              <TriangleDashed className='w-4 h-4' />
              <span>Blocks</span>
            </Link>
          </div>

          {/* Navigation Links (Desktop) */}
          <div className="hidden sm:flex sm:items-center sm:justify-center flex-1">
            <div className="flex items-center gap-6 text-sm">
              <Link href="/home" className="text-gray-100 transition hover:text-gray-100/75">
                Home
              </Link>
              <Link href="/about" className="text-gray-100 transition hover:text-gray-100/75">
                About
              </Link>
              <Link href="/services" className="text-gray-100 transition hover:text-gray-100/75">
                Services
              </Link>
              <Link href="/contact" className="text-gray-100 transition hover:text-gray-700/75">
                Contact
              </Link>
            </div>
          </div>

          {/* Login Button (Right) */}
          <Link
            className="block rounded-full bg-gradient-to-br bg-purple-50 px-6 py-3 text-xs font-semibold text-gray-800  hover:text-neutral-100 transition hover:bg-purple-900"
            href="#"
          >
            Login
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link href="/home" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-100">
            Home
          </Link>
          <Link href="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-100 hover:bg-gray-100">
            About
          </Link>
          <Link href="/services" className="block px-3 py-2 rounded-md text-base font-medium text-gray-100 hover:bg-gray-100">
            Services
          </Link>
          <Link href="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-100 hover:bg-gray-100">
            Contact
          </Link>
          <Link href="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;