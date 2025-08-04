'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-custom-bg shadow-sm border-b border-accent-brown">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-primary-text">
              Kickoff Booking
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-secondary-text hover:text-primary-text px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-secondary-text hover:text-primary-text px-3 py-2 rounded-md text-sm font-medium transition-colors">
              About
            </Link>
            <Link href="/services" className="text-secondary-text hover:text-primary-text px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Services
            </Link>
            <Link href="/contact" className="text-secondary-text hover:text-primary-text px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Contact
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/book"
              className="bg-accent-yellow hover:bg-yellow-500 text-primary-text px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Book Now
            </Link>
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
              <Link href="/about" className="text-secondary-text hover:text-primary-text block px-3 py-2 rounded-md text-base font-medium transition-colors">
                About
              </Link>
              <Link href="/services" className="text-secondary-text hover:text-primary-text block px-3 py-2 rounded-md text-base font-medium transition-colors">
                Services
              </Link>
              <Link href="/contact" className="text-secondary-text hover:text-primary-text block px-3 py-2 rounded-md text-base font-medium transition-colors">
                Contact
              </Link>
              <Link href="/book" className="bg-accent-yellow hover:bg-yellow-500 text-primary-text block px-3 py-2 rounded-md text-base font-medium transition-colors">
                Book Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
} 