import React, { useState } from 'react';
import Logo from './Logo';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Packages', href: '#packages' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
  { label: 'Download App', href: '#download' },
];

const Navbar = () => {
  const [dark, setDark] = useState(false);

  const handleThemeToggle = () => {
    setDark(!dark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/30 dark:bg-black/30 backdrop-blur-md shadow-lg transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        <Logo />
        <ul className="hidden md:flex gap-8 font-header text-lg">
          {navLinks.map(link => (
            <li key={link.label}>
              <a href={link.href} className="hover:text-gold transition-colors duration-200">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-4">
          <button
            aria-label="Toggle dark mode"
            onClick={handleThemeToggle}
            className="w-10 h-10 rounded-full bg-gold/10 border border-gold flex items-center justify-center hover:bg-gold/20 transition"
          >
            <span className="text-gold text-xl">{dark ? '🌙' : '☀️'}</span>
          </button>
          <a
            href="#booking"
            className="ml-2 px-5 py-2 rounded-full bg-gold text-white font-header font-bold shadow-lg hover:scale-105 hover:bg-gold/90 transition-all duration-200"
          >
            Book Now
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
