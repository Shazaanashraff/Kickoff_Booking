'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';

export default function Hero() {
  const containerRef = useRef(null);
  const mobileContainerRef = useRef(null);
  const zoomRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Set initial state for text elements (hidden with mask)
      gsap.set([titleRef.current, descriptionRef.current, buttonsRef.current], {
        clipPath: 'inset(100% 0 0 0)', // Hidden from bottom
        opacity: 0
      });

      // Get the appropriate container based on screen size
      const isMobile = window.innerWidth < 768; // md breakpoint
      const targetContainer = isMobile ? mobileContainerRef.current : containerRef.current;

      // Initial zoom-in on video container
      tl.set(targetContainer, {
        scale: 3.5,
        transformOrigin: 'center center',
        yPercent: -20,
      });

      // Keep zoomed for 2 seconds
      tl.to(targetContainer, {
        scale: 3.5,
        yPercent: -20,
        duration: 2,
        ease: 'none', // No easing to keep it static
      });

      // Then zoom out to normal size with smoother easing
      tl.to(targetContainer, {
        scale: 1,
        yPercent: 0,
        duration: 2,
        ease: 'power2.out', // Smoother easing for zoom out
      });

      // After zoom out, reveal text elements with mask line effect from bottom
      tl.to([titleRef.current, descriptionRef.current, buttonsRef.current], {
        clipPath: 'inset(0% 0 0 0)', // Reveal from bottom to top
        opacity: 1,
        duration: 1.2,
        stagger: 0.2, // Stagger the animations
        ease: 'power2.out'
      }, '-=1'); // Start slightly before zoom out completes
    }, zoomRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section className="bg-custom-bg font-mozilla">
      <div className="max-w-7xl mx-auto py-6" ref={zoomRef}>
        {/* Text Section */}
        <div className="text-center mb-6 px-4">
          <h1 
            ref={titleRef}
            className="text-lg md:text-2xl font-bold mb-3 text-primary-text"
          >
            Book Your Perfect Futsal Experience
          </h1>
          <p 
            ref={descriptionRef}
            className="text-sm md:text-base mb-4 max-w-2xl mx-auto text-secondary-text"
          >
            At Kickoff Booking, we cater to every futsal need. Whether you're a professional player pushing your limits or someone seeking fun and competitive futsal games, we have the perfect court for you.
          </p>
          
          {/* Buttons */}
          <div 
            ref={buttonsRef}
            className="flex flex-col sm:flex-row gap-2 justify-center mb-6"
          >
            <Link
              href="/book"
              className="bg-accent-yellow hover:bg-yellow-500 text-primary-text px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              BOOK NOW
            </Link>
            <Link
              href="/events"
              className="border-2 border-accent-brown hover:bg-accent-brown hover:text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              VIEW EVENTS
            </Link>
          </div>
        </div>

        {/* Bento Grid Container - Flex-based layout for GSAP Flip */}
        <div className="w-full">
          {/* Desktop Layout */}
          <div className="hidden md:flex gap-3 h-[60vh] min-h-[500px] overflow-y-auto" ref={containerRef}>
            {/* Column 1 - Leftmost tall image */}
            <div className="w-1/5 flex flex-col">
              <div className="h-[70%] bg-gray-200 rounded-sm overflow-hidden mb-3" id="image-1">
                <img src="/hero/1.jpg" alt="Futsal court action" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Column 2 - Single image */}
            <div className="w-1/5 flex flex-col">
              <div className="h-[60%] bg-gray-200 rounded-sm overflow-hidden mb-3" id="image-2">
                <img src="/hero/4.jpg" alt="Futsal player" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Column 3 - Video (wider) */}
            <div className="w-2/5 flex flex-col">
              <div className="h-[90%] bg-gray-200 rounded-sm overflow-hidden mb-3" id="video-container">
                <video
                  src="/hero/3.mp4"
                  autoPlay
                  loop
                  muted
                  className="w-full h-full object-cover"
                  id="hero-video"
                />
              </div>
            </div>

            {/* Column 4 - Two stacked images */}
            <div className="w-1/5 flex flex-col">
              <div className="h-[45%] bg-gray-200 rounded-sm overflow-hidden mb-3" id="image-4a">
                <img src="/hero/2.jpg" alt="Futsal ball detail" className="w-full h-full object-cover" />
              </div>
              <div className="h-[55%] bg-gray-200 rounded-sm overflow-hidden" id="image-4b">
                <img src="/hero/5.jpg" alt="Futsal court" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Column 5 - Rightmost image */}
            <div className="w-1/5 flex flex-col">
              <div className="h-[65%] bg-gray-200 rounded-sm overflow-hidden mb-3" id="image-5">
                <img src="/hero/6.jpg" alt="Futsal facility" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Mobile Grid */}
          <div className="md:hidden grid grid-cols-1 gap-2" ref={mobileContainerRef}>
            {['1', '4', '3', '2', '5', '6'].map((img, index) =>
              img === '3' ? (
                <div key={index} className="h-[150px] bg-gray-200 rounded-lg overflow-hidden">
                  <video
                    src={`/hero/${img}.mp4`}
                    autoPlay
                    loop
                    muted
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div key={index} className="h-[150px] bg-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={`/hero/${img}.jpg`}
                    alt={`Futsal item ${img}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
