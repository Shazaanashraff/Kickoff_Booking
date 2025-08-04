'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function FindCourts() {
  const sectionRef = useRef(null);
  const mapRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLocation, setCurrentLocation] = useState(null);
  const [locationsFound, setLocationsFound] = useState(29);

  // Mock data for courts near the user
  const nearbyCourts = [
    {
      id: 1,
      name: 'Colombo Futsal Arena',
      address: '123 Main Street, Colombo 03, Sri Lanka',
      image: '/hero/1.jpg',
      distance: '0.5 km',
      rating: 4.8,
      price: 'Rs. 3,500/hour'
    },
    {
      id: 2,
      name: 'Indoor Sports Complex',
      address: '456 Sports Avenue, Colombo 05, Sri Lanka',
      image: '/hero/4.jpg',
      distance: '1.2 km',
      rating: 4.6,
      price: 'Rs. 3,000/hour'
    },
    {
      id: 3,
      name: 'Elite Training Center',
      address: '789 Training Road, Colombo 07, Sri Lanka',
      image: '/hero/2.jpg',
      distance: '2.1 km',
      rating: 4.9,
      price: 'Rs. 2,500/hour'
    },
    {
      id: 4,
      name: 'Pro Futsal Court',
      address: '321 Court Street, Colombo 04, Sri Lanka',
      image: '/hero/5.jpg',
      distance: '1.8 km',
      rating: 4.7,
      price: 'Rs. 3,200/hour'
    },
    {
      id: 5,
      name: 'Community Sports Hub',
      address: '654 Community Lane, Colombo 06, Sri Lanka',
      image: '/hero/6.jpg',
      distance: '3.2 km',
      rating: 4.5,
      price: 'Rs. 2,800/hour'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the section when it comes into view
      gsap.fromTo(sectionRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
          }
        }
      );
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          // In a real app, you would use these coordinates to find nearby courts
          setLocationsFound(29);
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get your current location. Please enter a location manually.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  return (
    <section ref={sectionRef} className="py-16 bg-custom-bg font-mozilla">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-text mb-4">
            Find a Court Near You
          </h2>
          <p className="text-lg text-secondary-text max-w-2xl mx-auto">
            Discover futsal courts and indoor facilities in your area. Get directions, check availability, and book instantly.
          </p>
        </div>

        {/* Map and Search Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Map */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden h-[600px]">
            <div ref={mapRef} className="w-full h-full bg-gray-200 relative">
              {/* Mock Map - In a real app, you'd integrate with Mapbox or Google Maps */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent-brown rounded-full flex items-center justify-center mb-4 mx-auto">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-primary-text mb-2">Interactive Map</h3>
                  <p className="text-secondary-text text-sm">Map integration coming soon</p>
                </div>
              </div>
              
              {/* Location Markers */}
              <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-accent-yellow rounded-full border-2 border-white shadow-lg"></div>
              <div className="absolute top-1/3 right-1/3 w-4 h-4 bg-accent-yellow rounded-full border-2 border-white shadow-lg"></div>
              <div className="absolute bottom-1/3 left-1/2 w-4 h-4 bg-accent-yellow rounded-full border-2 border-white shadow-lg"></div>
              <div className="absolute bottom-1/4 right-1/4 w-4 h-4 bg-accent-yellow rounded-full border-2 border-white shadow-lg"></div>
              
              {/* Mapbox Logo */}
              <div className="absolute bottom-4 left-4">
                <span className="text-xs text-secondary-text">mapbox</span>
              </div>
            </div>
          </div>

          {/* Right Side - Search and Results */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            {/* Search Header */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-primary-text mb-4">
                Find a court or indoor facility near me
              </h3>
              
              {/* Search Bar */}
              <div className="relative mb-4">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-secondary-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Enter city, ZIP, or location"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-yellow focus:border-transparent"
                />
              </div>

              {/* Results Summary and Current Location */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm text-secondary-text">
                  {locationsFound} locations found
                </span>
                <button
                  onClick={handleUseCurrentLocation}
                  className="flex items-center text-sm text-accent-brown hover:text-accent-brown/80 transition-colors"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Use my current location
                </button>
              </div>
            </div>

            {/* Results List */}
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {nearbyCourts.map((court) => (
                <div key={court.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:border-accent-yellow transition-colors">
                  {/* Court Image */}
                  <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden">
                    <img
                      src={court.image}
                      alt={court.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Court Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-primary-text truncate">
                      {court.name}
                    </h4>
                    <p className="text-xs text-secondary-text mt-1">
                      {court.address}
                    </p>
                    <div className="flex items-center mt-2 space-x-4">
                      <span className="text-xs text-secondary-text">
                        📍 {court.distance}
                      </span>
                      <span className="text-xs text-secondary-text">
                        ⭐ {court.rating}
                      </span>
                      <span className="text-xs font-medium text-accent-brown">
                        {court.price}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col items-end space-y-2">
                    <Link
                      href={`/courts/${court.id}`}
                      className="text-xs text-accent-brown hover:text-accent-brown/80 transition-colors"
                    >
                      Go to website →
                    </Link>
                    <Link
                      href="/book"
                      className="bg-accent-yellow hover:bg-yellow-500 text-primary-text px-3 py-1 rounded text-xs font-semibold transition-colors"
                    >
                      Go &gt;
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            <div className="mt-6 text-center">
              <button className="text-sm text-accent-brown hover:text-accent-brown/80 transition-colors">
                Load more results
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 