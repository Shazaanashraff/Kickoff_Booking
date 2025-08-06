'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function DiscountedFutsal() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const discountedCourts = [
    {
      id: 1,
      name: "Elite Futsal Arena",
      location: "Downtown District",
      originalPrice: 120,
      discountedPrice: 85,
      discount: 29,
      image: "/hero/5.jpg",
      rating: 4.8,
      reviews: 156,
      features: ["Air Conditioned", "Premium Turf", "Parking Available"]
    },
    {
      id: 2,
      name: "Pro Sports Center",
      location: "Sports Complex",
      originalPrice: 150,
      discountedPrice: 105,
      discount: 30,
      image: "/hero/6.jpg",
      rating: 4.9,
      reviews: 203,
      features: ["Professional Lighting", "Locker Rooms", "Equipment Rental"]
    },
    {
      id: 3,
      name: "Community Futsal Hub",
      location: "Residential Area",
      originalPrice: 100,
      discountedPrice: 70,
      discount: 30,
      image: "/hero/1.jpg",
      rating: 4.7,
      reviews: 89,
      features: ["Family Friendly", "Cafe Nearby", "Easy Access"]
    },
    {
      id: 4,
      name: "Championship Court",
      location: "Business District",
      originalPrice: 180,
      discountedPrice: 125,
      discount: 31,
      image: "/hero/2.jpg",
      rating: 4.9,
      reviews: 267,
      features: ["Tournament Ready", "VIP Seating", "Pro Shop"]
    }
  ];

  return (
    <section className="py-16 bg-custom-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-text mb-4 font-mozilla">
            Special Discounts
          </h2>
          <p className="text-lg text-secondary-text max-w-2xl mx-auto">
            Limited time offers on premium futsal courts. Book now and save big on your next game!
          </p>
        </div>

        {/* Discounted Courts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {discountedCourts.map((court) => (
            <div
              key={court.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              onMouseEnter={() => setHoveredCard(court.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Court Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={court.image}
                  alt={`${court.name} - Futsal Court`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  priority={court.id <= 2} // Load first 2 images with priority
                />
                {/* Discount Badge */}
                <div className="absolute top-3 left-3 bg-accent-yellow text-primary-text px-3 py-1 rounded-full text-sm font-bold">
                  -{court.discount}%
                </div>
                {/* Rating */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold text-primary-text">
                  ⭐ {court.rating}
                </div>
              </div>

              {/* Court Info */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-primary-text mb-1">
                  {court.name}
                </h3>
                <p className="text-sm text-secondary-text mb-3">
                  {court.location}
                </p>

                {/* Price */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl font-bold text-accent-brown">
                    ${court.discountedPrice}
                  </span>
                  <span className="text-sm text-secondary-text line-through">
                    ${court.originalPrice}
                  </span>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {court.features.map((feature, index) => (
                    <span
                      key={index}
                      className="text-xs bg-accent-brown/10 text-accent-brown px-2 py-1 rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Reviews */}
                <div className="text-xs text-secondary-text mb-4">
                  {court.reviews} reviews
                </div>

                {/* Book Button */}
                <button className="w-full bg-accent-yellow hover:bg-yellow-500 text-primary-text py-2 px-4 rounded-lg font-semibold transition-colors duration-200">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="border-2 border-accent-brown text-accent-brown hover:bg-accent-brown hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
            View All Discounts
          </button>
        </div>
      </div>
    </section>
  );
} 