'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function AllCourts() {
  const [courts] = useState([
    {
      id: 1,
      name: "Elite Futsal Arena",
      location: "Downtown District",
      distance: "0.8 km",
      rating: 4.8,
      price: "$85/hour",
      image: "/hero/5.jpg"
    },
    {
      id: 2,
      name: "Pro Sports Center",
      location: "Sports Complex",
      distance: "1.2 km",
      rating: 4.6,
      price: "$105/hour",
      image: "/hero/6.jpg"
    },
    {
      id: 3,
      name: "Community Futsal Hub",
      location: "Residential Area",
      distance: "1.5 km",
      rating: 4.4,
      price: "$70/hour",
      image: "/hero/1.jpg"
    },
    {
      id: 4,
      name: "Championship Court",
      location: "Business District",
      distance: "2.1 km",
      rating: 4.9,
      price: "$125/hour",
      image: "/hero/4.jpg"
    },
    {
      id: 5,
      name: "Urban Sports Arena",
      location: "City Center",
      distance: "1.8 km",
      rating: 4.7,
      price: "$95/hour",
      image: "/hero/fut.jpg"
    },
    {
      id: 6,
      name: "Premium Futsal Zone",
      location: "Uptown District",
      distance: "2.5 km",
      rating: 4.5,
      price: "$110/hour",
      image: "/hero/5.jpg"
    },
    {
      id: 7,
      name: "Downtown Futsal Arena",
      location: "Downtown District",
      distance: "0.8 km",
      rating: 4.8,
      price: "$45/hour",
      image: "/hero/1.jpg"
    },
    {
      id: 8,
      name: "Sports Complex Center",
      location: "Sports District",
      distance: "1.2 km",
      rating: 4.6,
      price: "$40/hour",
      image: "/hero/6.jpg"
    },
    {
      id: 9,
      name: "Community Futsal Hub",
      location: "Residential Area",
      distance: "1.5 km",
      rating: 4.4,
      price: "$35/hour",
      image: "/hero/4.jpg"
    },
    {
      id: 10,
      name: "Elite Futsal Court",
      location: "Business District",
      distance: "2.1 km",
      rating: 4.9,
      price: "$55/hour",
      image: "/hero/5.jpg"
    },
    {
      id: 11,
      name: "Urban Sports Arena",
      location: "City Center",
      distance: "1.8 km",
      rating: 4.7,
      price: "$95/hour",
      image: "/hero/2.jpg"
    },
    {
      id: 12,
      name: "Premium Futsal Zone",
      location: "Uptown District",
      distance: "2.5 km",
      rating: 4.5,
      price: "$110/hour",
      image: "/hero/1.jpg"
    }
  ]);

  return (
    <div className="bg-custom-bg min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-1 sm:px-2 lg:px-4">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-text mb-4 font-mozilla text-left">
            Discover Our Futsal Courts
          </h2>
          <p className="text-lg text-secondary-text max-w-2xl text-left">
            Explore our premium selection of futsal courts across the city. 
            Find the perfect venue for your next game.
          </p>
        </div>

        {/* Courts Grid - 4 columns, 3 rows */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {courts.map((court) => (
            <Link key={court.id} href={`/courts/${court.id}`} className="block">
              <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer">
                {/* Court Image */}
                <div className="relative h-48">
                  <Image
                    src={court.image}
                    alt={`${court.name} - Futsal Court`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    priority={court.id <= 4} // Load first 4 images with priority
                  />
                </div>
                
                {/* Court Details */}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-primary-text leading-tight">{court.name}</h3>
                    <span className="text-sm font-medium text-accent-yellow bg-accent-yellow/10 px-2 py-1 rounded-full">
                      {court.price}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-secondary-text text-sm mb-3">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span className="mr-3">{court.location}</span>
                    <span className="text-accent-brown">{court.distance}</span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className="flex items-center mr-3">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(court.rating) ? 'text-accent-yellow' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="text-sm text-secondary-text ml-1">{court.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <button className="w-full bg-accent-yellow text-primary-text px-4 py-2 rounded-lg font-medium hover:bg-yellow-500 transition-colors text-sm">
                    View Details
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}