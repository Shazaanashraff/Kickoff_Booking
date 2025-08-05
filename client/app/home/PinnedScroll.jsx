'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function PinnedScroll() {
  const containerRef = useRef(null);
  const sectionsRef = useRef([]);

  useEffect(() => {
    const sections = sectionsRef.current;
    
    // Create pin scroll effect with proper stacking
    sections.forEach((section, index) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        pin: true,
        pinSpacing: false,
        onEnter: () => {
          // Bring current section to front
          gsap.set(section, { zIndex: 10 });
        },
        onLeave: () => {
          // Send previous section to back
          gsap.set(section, { zIndex: 1 });
        },
        onEnterBack: () => {
          // Bring current section to front when scrolling up
          gsap.set(section, { zIndex: 10 });
        },
        onLeaveBack: () => {
          // Send next section to back when scrolling up
          gsap.set(section, { zIndex: 1 });
        }
      });
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Section 1: Create Your Own Tournament */}
      <section 
        ref={addToRefs}
        className="h-screen relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(115, 109, 93, 0.8), rgba(115, 109, 93, 0.8)), url('/hero/1.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 1
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 h-full flex flex-col pt-8 px-8">
          {/* Top Row: Heading and Description */}
          <div className="flex justify-between items-start mb-8">
            <div className="w-1/2 pr-8">
              <h1 className="text-3xl md:text-4xl font-bold text-white font-mozilla leading-tight">
                Create Your Own Tournament
              </h1>
            </div>
            <div className="w-1/2 pl-8">
              <p className="text-sm md:text-base text-white/90 leading-relaxed">
                Organize and manage your own futsal tournaments with our comprehensive tournament management system. 
                From registration to finals, we've got everything covered for serious players.
              </p>
            </div>
          </div>
          
          {/* Bottom Row: Buttons */}
          <div className="flex gap-4">
            <button className="bg-accent-yellow hover:bg-yellow-500 text-primary-text px-6 py-3 rounded-lg text-sm font-semibold transition-colors duration-200 transform hover:scale-105">
              Start Tournament
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-accent-brown px-6 py-3 rounded-lg text-sm font-semibold transition-colors duration-200 transform hover:scale-105">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Section 2: Kickoff Store */}
      <section 
        ref={addToRefs}
        className="h-screen relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 194, 25, 0.8), rgba(255, 194, 25, 0.8)), url('/hero/2.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 1
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 h-full flex flex-col pt-8 px-8">
          {/* Top Row: Heading and Description */}
          <div className="flex justify-between items-start mb-8">
            <div className="w-1/2 pr-8">
              <h1 className="text-3xl md:text-4xl font-bold text-primary-text font-mozilla leading-tight">
                Kickoff Store
              </h1>
            </div>
            <div className="w-1/2 pl-8">
              <p className="text-sm md:text-base text-primary-text/80 leading-relaxed">
                Gear up for the game with premium jerseys, football equipment, and accessories. 
                Quality gear for serious players who demand the best performance.
              </p>
            </div>
          </div>
          
          {/* Bottom Row: Buttons */}
          <div className="flex gap-4">
            <button className="bg-accent-brown hover:bg-accent-brown/80 text-white px-6 py-3 rounded-lg text-sm font-semibold transition-colors duration-200 transform hover:scale-105">
              Shop Now
            </button>
            <button className="border-2 border-accent-brown text-accent-brown hover:bg-accent-brown hover:text-white px-6 py-3 rounded-lg text-sm font-semibold transition-colors duration-200 transform hover:scale-105">
              View Collection
            </button>
          </div>
        </div>
      </section>

      {/* Section 3: Join Our Community */}
      <section 
        ref={addToRefs}
        className="h-screen relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(245, 246, 238, 0.8), rgba(245, 246, 238, 0.8)), url('/hero/4.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 1
        }}
      >
        <div className="absolute inset-0 bg-white/10"></div>
        <div className="relative z-10 h-full flex flex-col pt-8 px-8">
          {/* Top Row: Heading and Description */}
          <div className="flex justify-between items-start mb-8">
            <div className="w-1/2 pr-8">
              <h1 className="text-3xl md:text-4xl font-bold text-primary-text font-mozilla leading-tight">
                Join Our Community
              </h1>
            </div>
            <div className="w-1/2 pl-8">
              <p className="text-sm md:text-base text-primary-text/80 leading-relaxed">
                Connect with fellow futsal enthusiasts, join leagues, share experiences, and be part of a thriving community 
                that celebrates the beautiful game.
              </p>
            </div>
          </div>
          
          {/* Bottom Row: Buttons */}
          <div className="flex gap-4">
            <button className="bg-accent-yellow hover:bg-yellow-500 text-primary-text px-6 py-3 rounded-lg text-sm font-semibold transition-colors duration-200 transform hover:scale-105">
              Join Community
            </button>
            <button className="border-2 border-accent-brown text-accent-brown hover:bg-accent-brown hover:text-white px-6 py-3 rounded-lg text-sm font-semibold transition-colors duration-200 transform hover:scale-105">
              Explore Leagues
            </button>
          </div>
        </div>
      </section>

      {/* Spacer section to allow scrolling to footer */}
      <section className="h-screen bg-custom-bg"></section>
    </div>
  );
} 