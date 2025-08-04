'use client';

import { useState } from 'react';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Sports Enthusiast",
      content: "Kickoff Booking made it so easy to secure tickets for the championship game. The process was smooth and the customer support was incredible!",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Event Organizer",
      content: "As an event organizer, I love how reliable and user-friendly this platform is. It's become our go-to for all our sports event bookings.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Season Ticket Holder",
      content: "The mobile app is fantastic! I can book my seats on the go and get instant confirmations. Highly recommend for any sports fan.",
      rating: 5
    },
    {
      name: "David Thompson",
      role: "Corporate Client",
      content: "We use Kickoff Booking for all our corporate events. The team booking feature is excellent and the pricing is very competitive.",
      rating: 5
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const renderStars = (rating) => {
    return Array.from({ length: rating }, (_, i) => (
      <svg key={i} className="w-5 h-5 text-accent-yellow" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section className="py-16 bg-custom-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-text mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-secondary-text max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers have to say about their experience.
          </p>
        </div>

        <div className="relative">
          {/* Testimonial Card */}
          <div className="bg-white rounded-lg p-8 md:p-12 max-w-4xl mx-auto shadow-md border border-gray-200">
            <div className="text-center">
              {/* Stars */}
              <div className="flex justify-center mb-6">
                {renderStars(testimonials[currentIndex].rating)}
              </div>
              
              {/* Quote */}
              <blockquote className="text-xl md:text-2xl text-secondary-text mb-8 italic">
                "{testimonials[currentIndex].content}"
              </blockquote>
              
              {/* Author */}
              <div className="mb-8">
                <div className="text-lg font-semibold text-primary-text">
                  {testimonials[currentIndex].name}
                </div>
                <div className="text-secondary-text">
                  {testimonials[currentIndex].role}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-accent-brown hover:bg-accent-brown/80 text-white transition-colors"
              aria-label="Previous testimonial"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            {/* Dots */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-accent-yellow' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-accent-brown hover:bg-accent-brown/80 text-white transition-colors"
              aria-label="Next testimonial"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 