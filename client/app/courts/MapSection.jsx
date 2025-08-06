'use client';
import { useState } from 'react';
import Image from 'next/image';

export default function MapSection() {
  const [nearestCourts] = useState([
    {
      id: 1,
      name: "Downtown Futsal Arena",
      location: "Downtown District",
      distance: "0.8 km",
      rating: 4.8,
      price: "$45/hour",
      image: "/hero/1.jpg",
      features: ["Indoor", "Air Conditioned", "Parking"]
    },
    {
      id: 2,
      name: "Sports Complex Center",
      location: "Sports District",
      distance: "1.2 km",
      rating: 4.6,
      price: "$40/hour",
      image: "/hero/2.jpg",
      features: ["Indoor", "Professional", "Equipment"]
    },
    {
      id: 3,
      name: "Community Futsal Hub",
      location: "Residential Area",
      distance: "1.5 km",
      rating: 4.4,
      price: "$35/hour",
      image: "/hero/4.jpg",
      features: ["Indoor", "Family Friendly", "Cafe"]
    },
    {
      id: 4,
      name: "Elite Futsal Court",
      location: "Business District",
      distance: "2.1 km",
      rating: 4.9,
      price: "$55/hour",
      image: "/hero/5.jpg",
      features: ["Premium", "VIP Area", "Shower"]
    }
  ]);

  return (
    <section className="py-16 bg-custom-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-text mb-4 text-left">
            Courts Near You
          </h2>
          <p className="text-lg text-secondary-text max-w-2xl text-left">
            Discover the best futsal courts in your area. Find the perfect venue for your next game.
          </p>
        </div>

        {/* Map and Courts Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Map Section */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="h-96 bg-gradient-to-br from-accent-brown/10 to-accent-yellow/10 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-accent-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary-text" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-primary-text mb-2">Interactive Map</h3>
                <p className="text-secondary-text">Map integration coming soon</p>
              </div>
            </div>
          </div>

          {/* Courts Cards - 2x2 Grid */}
          <div className="grid grid-cols-2 gap-4">
            {nearestCourts.map((court) => (
              <div key={court.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                {/* Court Image */}
                <div className="relative h-40">
                  <Image
                    src={court.image}
                    alt={`${court.name} - Futsal Court`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                
                {/* Court Details */}
                <div className="p-3">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-sm font-semibold text-primary-text leading-tight">{court.name}</h3>
                    <span className="text-xs font-medium text-accent-yellow bg-accent-yellow/10 px-2 py-1 rounded-full">
                      {court.price}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-secondary-text text-xs mb-2">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span className="mr-2">{court.location}</span>
                    <span className="text-accent-brown">{court.distance}</span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className="flex items-center mr-2">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-3 h-3 ${i < Math.floor(court.rating) ? 'text-accent-yellow' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="text-xs text-secondary-text ml-1">{court.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <button className="w-full bg-accent-yellow text-primary-text px-3 py-2 rounded-lg font-medium hover:bg-yellow-500 transition-colors text-xs">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 