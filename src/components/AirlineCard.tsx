
import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';

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
    <HoverCard>
      <HoverCardTrigger asChild>
        <Link to={`/airline/${code}`} className="block">
          <Card className="airline-card h-full overflow-hidden transition-all hover:shadow-lg">
            <div className={`h-2 ${getBgClass()}`}></div>
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <div className={`rounded-full w-20 h-20 flex items-center justify-center font-bold text-white mb-4 text-2xl ${getBgClass()} bg-gradient-to-br from-gray-700 to-gray-900`}>
                {code}
              </div>
              <h3 className="text-xl font-bold">{name}</h3>
              <p className="text-sm text-gray-500 mt-1">{code} Stock Predictions</p>
            </CardContent>
            <CardFooter className="flex items-center justify-between border-t p-4 bg-gray-50">
              <span className="text-sm font-medium">View Forecast</span>
              <TrendingUp className="h-5 w-5 text-gray-500" />
            </CardFooter>
          </Card>
        </Link>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <div>
            <h4 className="text-sm font-semibold">{name} ({code})</h4>
            <p className="text-sm">Click to view detailed stock predictions for the next quarters</p>
            <div className="flex items-center pt-2">
              <span className="text-xs text-muted-foreground">
                Includes historical data and future projections
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default AirlineCard;
