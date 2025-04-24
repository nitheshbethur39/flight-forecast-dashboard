import React from "react";
import AirlineCard from "@/components/AirlineCard";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import InvestmentCalculator from "@/components/InvestmentCalculator";
import Header from "@/components/Header";

const airlines = [
  {
    code: "ALGT",
    name: "Allegiant Air",
    color: "yellow",
    logo: "/logos/ALGT.png",
  },
  {
    code: "ALK",
    name: "Alaska Airlines",
    color: "navy",
    logo: "/logos/ALK.png",
  },
  {
    code: "AAL",
    name: "American Airlines",
    color: "red",
    logo: "/logos/AAL.png",
  },
  {
    code: "DAL",
    name: "Delta Air Lines",
    color: "blue",
    logo: "/logos/DAL.png",
  },
  {
    code: "JBLU",
    name: "JetBlue Airways",
    color: "lightblue",
    logo: "/logos/JBLU.png",
  },
  {
    code: "LUV",
    name: "Southwest Airlines",
    color: "orange",
    logo: "/logos/LUV.png",
  },
  {
    code: "UAL",
    name: "United Airlines",
    color: "blue",
    logo: "/logos/UAL.png",
  },
  {
    code: "ULCC",
    name: "Frontier Airlines",
    color: "green",
    logo: "/logos/ULCC.png",
  },
];

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/Landing.jpg"
            alt="Airplane in flight"
            className="w-full h-full object-cover object-[50%_75%]"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <div className="container mx-auto px-4 h-full relative z-10 flex flex-col justify-center">
          <div className="max-w-3xl text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in">
              Smart Forecasts for Smarter Investing
            </h1>
            <p
              className="text-xl md:text-2xl mb-8 text-gray-100 animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              Explore stock predictions for major U.S. airlines.
            </p>
            <Button
              variant="default"
              size="lg"
              className="animate-fade-in"
              style={{ animationDelay: "0.4s" }}
              onClick={() =>
                document
                  .getElementById("airline-section")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Explore Airlines <ArrowDown className="ml-2" />
            </Button>
          </div>
        </div>

        <div className="absolute bottom-2 left-4 text-white/70 text-xs">
          Photo by David Syphers on Unsplash
        </div>
      </section>

      {/* Airline Grid */}
      <section id="airline-section" className="container mx-auto py-6 px-4 bg-zinc-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Explore by Airline</h2>
          <p className="text-gray-600">Click a logo to view prediction insights.</p>
          <Separator className="mt-6 mx-auto w-30" />
        </div>
              
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 place-items-center">
          {airlines.map((airline) => (
            <div
              key={airline.code}
              className="w-56 h-32 bg-white shadow-md rounded-md flex items-center justify-center p-4 hover:scale-105 transition-transform"
            >
              <AirlineCard
                code={airline.code}
                name={airline.name}
                color={airline.color}
                logo={airline.logo}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">
              Why Airline Insight Hub?
            </h2>
            <p className="text-gray-600">
              Powered by advanced predictive analytics
            </p>
            <Separator className="mt-6 mx-auto w-24" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-2">Advanced Predictions</h3>
              <p className="text-gray-600">
                Our machine learning models analyze historical data to forecast
                future stock movements with industry-leading accuracy.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-2">Quarterly Insights</h3>
              <p className="text-gray-600">
                Get detailed projections for the next 2-3 quarters to help
                inform your investment decisions.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-2">Major Airlines</h3>
              <p className="text-gray-600">
                Coverage of the ten largest U.S. carriers, representing over 90%
                of domestic air travel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>
            © {new Date().getFullYear()} Airline Insight Hub - Airline stock
            forecast dashboard
          </p>
          <p className="mt-2">
            Data is for informational purposes only. Not investment advice.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
