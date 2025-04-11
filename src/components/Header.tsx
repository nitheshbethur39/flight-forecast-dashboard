
import React from 'react';
import { Link } from 'react-router-dom';
import { Plane } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-4 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-primary">
          <Plane size={28} />
          <span className="text-xl font-bold">AirStock Predictions</span>
        </Link>
        <nav>
          <Link to="/" className="text-gray-600 hover:text-primary transition-colors">
            All Airlines
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
