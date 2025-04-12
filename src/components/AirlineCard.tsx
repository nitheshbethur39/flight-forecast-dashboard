import React from 'react';
import { Link } from 'react-router-dom';

export interface AirlineProps {
  code: string;
  name: string;
  color: string;
  logo: string;
}

const AirlineCard: React.FC<AirlineProps> = ({ code, name, logo }) => {
  return (
    <Link to={`/airline/${code}`} className="flex justify-center items-center">
      <img
        src={logo}
        alt={`${name} logo`}
        className="h-60 w-60 object-contain hover:scale-105 transition-transform"
      />
    </Link>
  );
};

export default AirlineCard;
