'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function FeaturedCourts() {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create a scroll-triggered animation for the cards
      const cards = cardsRef.current?.children;
      if (cards) {
        gsap.fromTo(cards, 
          {
            y: 80,
            opacity: 0,
            scale: 0.95,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              end: 'bottom 15%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const featuredCourts = [
    {
      id: 1,
      name: 'Colombo Futsal Arena',
      price: 'Rs. 3,500/hour',
      image: '/hero/1.jpg',
      category: 'Most Popular',
      location: 'Colombo 03'
    },
    {
      id: 2,
      name: 'Indoor Sports Complex',
      price: 'Rs. 3,000/hour',
      image: '/hero/4.jpg',
      category: 'Featured',
      location: 'Colombo 05'
    },
    {
      id: 3,
      name: 'Elite Training Center',
      price: 'Rs. 2,500/hour',
      image: '/hero/2.jpg',
      category: 'Training',
      location: 'Colombo 07'
    },
    {
      id: 4,
      name: 'Pro Futsal Court',
      price: 'Rs. 3,200/hour',
      image: '/hero/5.jpg',
      category: 'Premium',
      location: 'Colombo 04'
    }
  ];

  return (
    <section ref={sectionRef} className="py-16 bg-custom-bg font-mozilla">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-text mb-4">
            Featured Courts
          </h2>
          <p className="text-lg text-secondary-text max-w-2xl mx-auto">
            Discover the most popular and highly-rated futsal facilities across Colombo.
          </p>
        </div>

        {/* Featured Courts Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredCourts.map((court) => (
            <div
              key={court.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Court Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={court.image}
                  alt={`${court.name} - Futsal Court`}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  priority={court.id <= 2} // Load first 2 images with priority
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-accent-yellow text-primary-text px-2 py-1 rounded-full text-xs font-semibold">
                    {court.category}
                  </span>
                </div>
              </div>

              {/* Court Details */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-primary-text mb-2">
                  {court.name}
                </h3>
                <p className="text-sm text-accent-brown font-medium mb-3">
                  📍 {court.location}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-bold text-primary-text">
                    {court.price}
                  </span>
                </div>

                {/* Action Button */}
                <Link
                  href="/book"
                  className="block w-full bg-accent-yellow hover:bg-yellow-500 text-primary-text text-center py-2 px-4 rounded-lg font-semibold transition-colors duration-200 text-sm"
                >
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-accent-brown to-accent-brown/80 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Play?
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Join thousands of players who choose Kickoff Booking for their futsal experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/book"
                className="bg-accent-yellow hover:bg-yellow-500 text-primary-text px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                Book Now
              </Link>
              <Link
                href="/courts"
                className="border-2 border-white text-white hover:bg-white hover:text-accent-brown px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                View All Courts
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 