import React from 'react';

const Hero = () => (
  <section id="home" className="relative min-h-[90vh] flex items-center justify-center bg-luxury-pattern bg-cover bg-center overflow-hidden">
    <div className="absolute inset-0 bg-black/40 dark:bg-black/60 z-0" />
    {/* Animated background shapes/particles can be added here */}
    <div className="relative z-10 flex flex-col items-center justify-center text-center gap-8">
      <h1 className="text-4xl md:text-6xl font-header font-bold text-gold drop-shadow-lg max-w-3xl">
        Let us guide you to a world of pure relaxation and blissful tranquility.
      </h1>
      <a
        href="#booking"
        className="mt-6 px-10 py-4 rounded-full bg-gold text-white font-header text-xl font-bold shadow-xl hover:scale-105 hover:bg-gold/90 transition-all duration-200 animate-pulse"
      >
        Book Now
      </a>
    </div>
    {/* Optionally, add a video background or parallax effect here */}
  </section>
);

export default Hero;
