'use client';

import Link from 'next/link';
import { useState } from 'react';
import SearchOverlay from './SearchOverlay';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearchClick = () => {
    setIsSearchOpen(true);
  };

  const handleSearchClose = () => {
    setIsSearchOpen(false);
  };

  return (
    <>
      <header className="bg-custom-bg shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo - Moved more to the left */}
            <div className="flex-shrink-0">
              <Link href="/" className="text-2xl font-bold text-primary-text -ml-4">
                Kickoff Booking
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-secondary-text hover:text-primary-text px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Home
              </Link>
              <Link href="/courts" className="text-secondary-text hover:text-primary-text px-3 py-2 rounded-md text-sm font-medium transition-colors">
                All Courts
              </Link>
              <Link href="/bookings" className="text-secondary-text hover:text-primary-text px-3 py-2 rounded-md text-sm font-medium transition-colors">
                My Bookings
              </Link>
              <Link href="/contact" className="text-secondary-text hover:text-primary-text px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Contact Us
              </Link>
            </nav>

            {/* Search and Profile Icons */}
            <div className="hidden md:flex items-center space-x-4">
              <button 
                onClick={handleSearchClick}
                className="text-secondary-text hover:text-primary-text p-2 transition-colors"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <button className="text-secondary-text hover:text-primary-text p-2 transition-colors">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-secondary-text hover:text-primary-text p-2 transition-colors"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Link href="/" className="text-secondary-text hover:text-primary-text block px-3 py-2 rounded-md text-base font-medium transition-colors">
                  Home
                </Link>
                <Link href="/courts" className="text-secondary-text hover:text-primary-text block px-3 py-2 rounded-md text-base font-medium transition-colors">
                  All Courts
                </Link>
                <Link href="/bookings" className="text-secondary-text hover:text-primary-text block px-3 py-2 rounded-md text-base font-medium transition-colors">
                  My Bookings
                </Link>
                <Link href="/contact" className="text-secondary-text hover:text-primary-text block px-3 py-2 rounded-md text-base font-medium transition-colors">
                  Contact Us
                </Link>
                {/* Search and Profile icons for mobile */}
                <div className="flex space-x-2 px-3 py-2">
                  <button 
                    onClick={handleSearchClick}
                    className="text-secondary-text hover:text-primary-text p-2 transition-colors"
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                  <button className="text-secondary-text hover:text-primary-text p-2 transition-colors">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* SearchOverlay */}
      <SearchOverlay isOpen={isSearchOpen} onClose={handleSearchClose} />
    </>
  );
} 