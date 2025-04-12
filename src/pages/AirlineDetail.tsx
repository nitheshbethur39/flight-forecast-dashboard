
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
//import Header from '@/components/Header';
import ChartSelector from '@/components/ChartSelector';
import StockChart from '@/components/StockChart';
import StockMetrics from '@/components/StockMetrics';
import { Button } from '@/components/ui/button';


const airlineNames: Record<string, string> = {
  'AAL': 'American Airlines',
  'ALK': 'Alaska Airlines',
  'JBLU': 'JetBlue Airways',
  'DAL': 'Delta Air Lines',
  'ULCC': 'Frontier Airlines',
  'ALGT': 'Allegiant Air',
  'SAVEQ': 'Spirit Airlines',
  'UAL': 'United Airlines',
  'LUV': 'Southwest Airlines',
};

const AirlineDetail: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const [period, setPeriod] = useState('2q');

  if (!code || !airlineNames[code]) {
    return <div>Airline not found</div>;
  }

  const airlineName = airlineNames[code];

  const handlePeriodChange = (newPeriod: string) => {
    setPeriod(newPeriod);
  };

  return (
    <div className="min-h-screen bg-gray-50">
    
      <main className="container mx-auto py-8 px-4">
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
              <p className="text-gray-600">Stock price forecast and predictions</p>
            </div>
            <ChartSelector onPeriodChange={handlePeriodChange} />
          </div>
        </div>

        <StockMetrics airlineCode={code} />
        
        <StockChart airlineCode={code} period={period} />

        <div className="mt-8 bg-white p-6 rounded-lg border shadow-sm">
          <h2 className="text-xl font-semibold mb-4">About This Forecast</h2>
          <p className="text-gray-700 mb-4">
            These predictions are generated using machine learning algorithms trained on historical stock data,
            market trends, airline industry metrics, and economic indicators.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Prediction Methodology</h3>
              <p className="text-gray-600">
                Our model accounts for seasonal travel patterns, fuel price fluctuations, and overall market sentiment
                to generate the most accurate stock price predictions for {airlineName}.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Disclaimer</h3>
              <p className="text-gray-600">
                These predictions are for informational purposes only and should not be considered financial advice.
                Past performance is not indicative of future results.
              </p>
            </div>
          </div>
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

export default AirlineDetail;
