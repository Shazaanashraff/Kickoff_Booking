'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const heroRef = useRef(null);
  const containerRef = useRef(null);
  const isInitializedRef = useRef(false);

  useEffect(() => {
    if (isInitializedRef.current) return;
    isInitializedRef.current = true;

    const hero = heroRef.current;
    const container = containerRef.current;
    if (!hero || !container) return;

    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    let pinTrigger = null;
    let scaleTrigger = null;

    try {
      // Pin the hero section only during the scale down phase (first 20% of scroll)
      pinTrigger = ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: '20% top',
        pin: true,
        pinSpacing: false,
      });

      // Image scales down just a tiny bit to show minimal background
      scaleTrigger = ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: '20% top',
        scrub: true,
        onUpdate: (self) => {
          if (hero && hero.parentNode) {
            const progress = self.progress;
            gsap.set(hero, { scale: 1 - (progress * 0.02) });
          }
        }
      });

    } catch (error) {
      console.error('ScrollTrigger creation error:', error);
    }

    return () => {
      isInitializedRef.current = false;
      try {
        if (pinTrigger) pinTrigger.kill();
        if (scaleTrigger) scaleTrigger.kill();
        if (hero && hero.parentNode) {
          gsap.set(hero, { scale: 1 });
        }
      } catch (error) {
        console.error('Cleanup error:', error);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen">
      {/* Hero Section */}
      <div 
        ref={heroRef}
        className="relative w-full h-screen overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('/hero/2.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transformOrigin: 'center center'
        }}
      >
        <div className="absolute inset-0 flex items-start justify-start p-8 md:p-12">
          <h1 className="text-6xl md:text-8xl font-bold text-white font-mozilla leading-tight">
            All Courts
          </h1>
        </div>
      </div>
    </div>
  );
}
