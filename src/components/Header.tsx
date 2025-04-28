import React, { useState } from 'react';
import { Menu } from 'lucide-react';

const navItems = [
  { label: 'Overview', href: '#overview' },
  { label: 'Investment Calculator', href: '/investment' },
  { label: 'About', href: '/about' }
];

const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-gray-200 transition duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo + Title */}
        <a href="/" className="flex items-center gap-3 text-black hover:opacity-90 transition">
          <img
            src="/GMU_logo.jpeg"
            alt="George Mason University"
            className="w-8 h-8 object-contain"
          />
          <span className="font-bold text-xl tracking-wide">
            Airline Stock Prediction Dashboard
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 text-gray-700 font-medium">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="hover:text-blue-600 relative group"
            >
              <span className="transition-colors">{item.label}</span>
              <span className="absolute left-0 bottom-[-2px] w-0 h-[2px] bg-blue-600 transition-all group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-gray-700"
            aria-label="Toggle Menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-white shadow-md border-t text-gray-700 font-medium px-6 py-4 space-y-4">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="block hover:text-blue-600"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
