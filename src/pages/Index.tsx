
import React from 'react';
import Header from '@/components/Header';
import AirlineCard from '@/components/AirlineCard';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

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
      
      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1576234699886-272c69fe3686?q=80&w=2000&auto=format&fit=crop"
            alt="Airplane in flight"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="container mx-auto px-4 h-full relative z-10 flex flex-col justify-center">
          <div className="max-w-3xl text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in">
              Forecast the Future of Flight
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Explore quarterly stock predictions for major U.S. airlines.
            </p>
            <Button 
              variant="default" 
              size="lg" 
              className="animate-fade-in" 
              style={{ animationDelay: "0.4s" }}
              onClick={() => {
                document.getElementById('airline-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Explore Airlines <ArrowDown className="ml-2" />
            </Button>
          </div>
        </div>
        
        <div className="absolute bottom-2 left-4 text-white/70 text-xs">
          Photo by Ashim D'Silva on Unsplash
        </div>
      </section>
      
      {/* Airline Selection Section */}
      <section id="airline-section" className="container mx-auto py-16 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Explore by Airline</h2>
          <p className="text-gray-600">Click a logo to view prediction insights.</p>
          <Separator className="mt-6 mx-auto w-24" />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {airlines.map((airline) => (
            <AirlineCard 
              key={airline.code} 
              code={airline.code} 
              name={airline.name} 
              color={airline.color}
            />
          ))}
        </div>
      </section>
      
      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">Why Airline Insight Hub?</h2>
            <p className="text-gray-600">Powered by advanced predictive analytics</p>
            <Separator className="mt-6 mx-auto w-24" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-2">Advanced Predictions</h3>
              <p className="text-gray-600">
                Our machine learning models analyze historical data to forecast future stock movements with industry-leading accuracy.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-2">Quarterly Insights</h3>
              <p className="text-gray-600">
                Get detailed projections for the next 2-3 quarters to help inform your investment decisions.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-2">Major Airlines</h3>
              <p className="text-gray-600">
                Coverage of the ten largest U.S. carriers, representing over 90% of domestic air travel.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <footer className="bg-white border-t py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Airline Insight Hub - Airline stock forecast dashboard</p>
          <p className="mt-2">Data is for informational purposes only. Not investment advice.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
