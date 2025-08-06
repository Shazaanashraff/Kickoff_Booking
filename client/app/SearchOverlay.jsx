'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SearchOverlay({ isOpen, onClose }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestedCourts] = useState([
    {
      id: 1,
      name: "Elite Futsal Arena",
      location: "Downtown District",
      rating: 4.8,
      price: "$85/hour",
      image: "/hero/5.jpg"
    },
    {
      id: 2,
      name: "Pro Sports Center",
      location: "Sports Complex",
      rating: 4.9,
      price: "$105/hour",
      image: "/hero/6.jpg"
    },
    {
      id: 3,
      name: "Community Futsal Hub",
      location: "Residential Area",
      rating: 4.7,
      price: "$70/hour",
      image: "/hero/1.jpg"
    }
  ]);

  // Close overlay when Escape key is pressed
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-custom-bg z-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-custom-bg shadow-sm border-b border-accent-brown/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="text-2xl font-bold text-primary-text -ml-4">
                Kickoff Booking
              </Link>
            </div>

            {/* Navigation */}
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

            {/* Close Button */}
            <button
              onClick={onClose}
              className="text-secondary-text hover:text-primary-text p-2 transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Search Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Bar */}
        <div className="mb-12">
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-6 w-6 text-secondary-text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search for futsal courts, locations, or features..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-4 border border-accent-brown/20 rounded-lg text-lg bg-white shadow-sm focus:ring-2 focus:ring-accent-yellow focus:border-transparent"
              autoFocus
            />
          </div>
        </div>

        {/* Suggested Courts */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-primary-text mb-6">Suggested Courts</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {suggestedCourts.map((court) => (
              <div
                key={court.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer"
              >
                <div className="h-32 bg-cover bg-center" style={{ backgroundImage: `url(${court.image})` }} />
                <div className="p-4">
                  <h4 className="font-semibold text-primary-text mb-1">{court.name}</h4>
                  <p className="text-sm text-secondary-text mb-2">{court.location}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="text-yellow-500 mr-1">⭐</span>
                      <span className="text-sm text-secondary-text">{court.rating}</span>
                    </div>
                    <span className="text-sm font-semibold text-accent-brown">{court.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-primary-text mb-4">Quick Actions</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/courts"
              className="bg-accent-yellow hover:bg-yellow-500 text-primary-text px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Browse All Courts
            </Link>
            <Link
              href="/bookings"
              className="border-2 border-accent-brown text-accent-brown hover:bg-accent-brown hover:text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              View My Bookings
            </Link>
            <Link
              href="/contact"
              className="border-2 border-accent-brown text-accent-brown hover:bg-accent-brown hover:text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 