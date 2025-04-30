import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Users, DollarSign, Briefcase, PlaneTakeoff, Shield, BarChart2, Clock } from 'lucide-react';
import ChartSelector from '@/components/ChartSelector';
import AirlineChart from '@/components/charts/AirlineChart';
import DayTradingChart from '@/components/charts/DayTradingChart';
import YearlyTradingChart from '@/components/charts/YearlyTradingChart';
import StockMetrics from '@/components/StockMetrics';
import { Button } from '@/components/ui/button';
import airlineFeatures from '@/data/airlineFeatures';

const airlineNames: Record<string, string> = {
  AAL: 'American Airlines',
  ALK: 'Alaska Airlines',
  JBLU: 'JetBlue Airways',
  DAL: 'Delta Air Lines',
  ULCC: 'Frontier Airlines',
  ALGT: 'Allegiant Air',
  UAL: 'United Airlines',
  LUV: 'Southwest Airlines',
};

// Function to get appropriate icon for each feature
const getFeatureIcon = (title: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    'Transport-Related Expenses': <PlaneTakeoff className="h-6 w-6 text-blue-500" />,
    'Passenger Services': <Users className="h-6 w-6 text-indigo-500" />,
    'Income Before Taxes': <DollarSign className="h-6 w-6 text-green-500" />,
    'Property and Baggage': <Briefcase className="h-6 w-6 text-amber-500" />,
    'Operating Margin': <BarChart2 className="h-6 w-6 text-purple-500" />,
    'Passenger Revenue': <Users className="h-6 w-6 text-indigo-500" />,
    'CASM': <Clock className="h-6 w-6 text-red-500" />,
    'Fuel Hedging Strategy': <Shield className="h-6 w-6 text-teal-500" />,
    'Operating Revenue': <DollarSign className="h-6 w-6 text-green-500" />,
    'Non-ticket Revenue': <DollarSign className="h-6 w-6 text-emerald-500" />,
    'Debt-to-Equity Ratio': <BarChart2 className="h-6 w-6 text-blue-500" />,
    'Route Efficiency': <TrendingUp className="h-6 w-6 text-orange-500" />,
  };

  return iconMap[title] || <BarChart2 className="h-6 w-6 text-gray-500" />;
};

// Get gradient class for each feature card
const getGradientClass = (index: number) => {
  const gradients = [
    'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200',
    'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200',
    'bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200',
    'bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200'
  ];
  
  return gradients[index % gradients.length];
};

const AirlineDetail: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const [period, setPeriod] = useState<'ltf' | 'day'>('ltf');
  
  // Add this useEffect to scroll to top when component mounts or code changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [code]);

  if (!code || !airlineNames[code]) {
    return <div>Airline not found</div>;
  }

  const airlineName = airlineNames[code];

  return (
    <div className="min-h-screen bg-[#F3FDFE]">
      <main className="container mx-auto py-8 px-4">
        {/* Back and Header */}
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to All Airlines
            </Button>
          </Link>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">{airlineName} ({code})</h1>
            </div>
            <ChartSelector onPeriodChange={(val) => setPeriod(val)} />
          </div>
        </div>

        {/* Metrics */}
        <StockMetrics airlineCode={code} />

        {/* Chart Switcher */}
        {period === 'ltf' ? (
          <>
            <AirlineChart airlineCode={code} />

            {/* Enhanced Features Section */}
            <div className="mt-10 bg-white p-6 sm:p-8 rounded-lg shadow-lg border">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  <TrendingUp className="h-6 w-6 mr-2 text-blue-600" />
                  Features Driving Our Forecasts
                </h2>
                <p className="text-gray-600 mt-2">
                  These are some of the key metrics we use to forecast {airlineName}'s stock performance.
                </p>
              </div>
              
              {(airlineFeatures[code]?.length ?? 0) > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                  {(airlineFeatures[code] || []).map((feature, i) => (
                    <div 
                      key={i} 
                      className={`rounded-xl shadow-md border p-5 transition-all duration-300 hover:shadow-lg ${getGradientClass(i)}`}
                    >
                      <div className="flex items-start mb-3">
                        <div className="p-2 rounded-lg bg-white shadow-sm mr-3">
                          {getFeatureIcon(feature.title)}
                        </div>
                        <h3 className="font-semibold text-gray-800 text-base leading-tight">{feature.title}</h3>
                      </div>
                      <p className="text-gray-600 text-sm">{feature.desc}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <BarChart2 className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500 italic">Feature data not available for this airline.</p>
                </div>
              )}
            </div>

            {/* Historical Returns Overview */}
            <div className="mt-8 bg-white p-6 rounded-lg border shadow-lg">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  Historical Stock Returns Overview
                </h2>
                <p className="text-gray-600 mt-1">
                  Explore 1Y, 3Y, and 5Y return trends using historical closing prices for {airlineName}.
                </p>
              </div>

              <YearlyTradingChart airlineCode={code} />
            </div>
          </>
        ) : (
          <DayTradingChart airlineCode={code} />
        )}

        {/* Forecast Explanation */}
        <div className="mt-8 bg-white p-6 rounded-lg border shadow-sm">
          <h2 className="text-xl font-semibold mb-4">About This Forecast</h2>
          <p className="text-gray-700 mb-4">
            These predictions are generated using machine learning algorithms trained on historical stock data,
            market trends, airline industry metrics, and economic indicators.
          </p>
          <h2 className="text-lg font-semibold mb-2">Forecast Methodology</h2>
          <p className="text-gray-700">
            The model considers various factors, including airline performance, market conditions, and economic
            indicators, to provide a comprehensive forecast.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Airline Stock Forecast Dashboard</p>
        </div>
      </footer>
    </div>
  );
};

export default AirlineDetail;