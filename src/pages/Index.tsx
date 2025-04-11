
import React from 'react';
import Header from '@/components/Header';
import AirlineCard from '@/components/AirlineCard';

const airlines = [
  { code: 'AA', name: 'American Airlines', color: 'red' },
  { code: 'AS', name: 'Alaska Airlines', color: 'navy' },
  { code: 'B6', name: 'JetBlue Airways', color: 'lightblue' },
  { code: 'DL', name: 'Delta Air Lines', color: 'blue' },
  { code: 'F9', name: 'Frontier Airlines', color: 'green' },
  { code: 'G4', name: 'Allegiant Air', color: 'yellow' },
  { code: 'HA', name: 'Hawaiian Airlines', color: 'purple' },
  { code: 'NK', name: 'Spirit Airlines', color: 'yellow' },
  { code: 'UA', name: 'United Airlines', color: 'blue' },
  { code: 'WN', name: 'Southwest Airlines', color: 'orange' },
];

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Airline Stock Predictions</h1>
          <p className="text-gray-600">Select an airline to view stock price forecasts for the upcoming quarters.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {airlines.map((airline) => (
            <AirlineCard 
              key={airline.code} 
              code={airline.code} 
              name={airline.name} 
              color={airline.color}
            />
          ))}
        </div>
      </main>
      <footer className="bg-white border-t py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} AirStock Predictions - A flight forecast dashboard</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
