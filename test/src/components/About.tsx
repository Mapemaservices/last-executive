import React from 'react';

const About = () => (
  <section id="about" className="relative w-full flex flex-col items-center justify-center py-20 px-4 bg-white/70 dark:bg-black/70 glass">
    <div className="absolute inset-0 -z-10">
      <video
        className="w-full h-full object-cover opacity-30"
        src="/videos/spa-ambience.mp4"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      />
    </div>
    <h2 className="text-3xl md:text-5xl font-header font-bold text-gold mb-6 drop-shadow-lg">Our Mission</h2>
    <p className="max-w-2xl text-lg md:text-2xl text-black/80 dark:text-gold/80 font-body text-center">
      To continuously innovate and elevate our spa offerings, staying at the forefront of wellness trends and providing cutting-edge treatments.
    </p>
  </section>
);

export default About;
