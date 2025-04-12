
import React from 'react';
import { Link } from 'react-router-dom';
import { Plane } from 'lucide-react';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

const Header: React.FC = () => {
  return (
    <header className="w-full py-4 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 text-primary">
          <Plane size={28} />
          <span className="ml-2 font-bold text-lg">Airline Forecast Portal</span>

        </Link>
        
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/" className="text-gray-600 hover:text-primary transition-colors px-4 py-2">
                Overview
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/" className="text-gray-600 hover:text-primary transition-colors px-4 py-2">
                Predictions
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/" className="text-gray-600 hover:text-primary transition-colors px-4 py-2">
                Resources
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/" className="text-gray-600 hover:text-primary transition-colors px-4 py-2">
                About
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
};

export default Header;
