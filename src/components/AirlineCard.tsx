
import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

export interface AirlineProps {
  code: string;
  name: string;
  color: string;
}

const AirlineCard: React.FC<AirlineProps> = ({ code, name, color }) => {
  const getBgClass = () => {
    switch (color) {
      case 'blue': return 'bg-airline-blue';
      case 'lightblue': return 'bg-airline-lightblue';
      case 'red': return 'bg-airline-red';
      case 'green': return 'bg-airline-green';
      case 'orange': return 'bg-airline-orange';
      case 'purple': return 'bg-airline-purple';
      case 'navy': return 'bg-airline-navy';
      case 'yellow': return 'bg-airline-yellow';
      default: return 'bg-primary';
    }
  };

  return (
    <Link to={`/airline/${code}`}>
      <Card className="airline-card h-full overflow-hidden">
        <div className={`h-2 ${getBgClass()}`}></div>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-2">
            <div className="rounded-full w-12 h-12 flex items-center justify-center font-bold text-white mb-2 text-lg bg-gradient-to-br from-gray-700 to-gray-900">
              {code}
            </div>
            <h3 className="text-xl font-bold">{name}</h3>
            <p className="text-sm text-gray-500">{code} Stock Predictions</p>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between border-t p-4 bg-gray-50">
          <span className="text-sm font-medium">View Forecast</span>
          <TrendingUp className="h-5 w-5 text-gray-500" />
        </CardFooter>
      </Card>
    </Link>
  );
};

export default AirlineCard;
