import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
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

const AirlineDetail: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const [period, setPeriod] = useState<'ltf' | 'day'>('ltf');

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

            {/* Features Section */}
            <div className="mt-10 bg-white p-6 rounded-lg shadow-lg border">
              <h2 className="text-xl font-semibold mb-4">Features Driving Our Forecasts</h2>
              <p className="text-gray-600 mb-6">
                These are some of the key metrics we use to forecast {airlineName}'s stock performance.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-sm text-gray-700">
                {(airlineFeatures[code] || []).map((feature, i) => (
                  <div key={i} className="bg-gray-50 p-4 rounded-md shadow-sm">
                    <strong>{feature.title}</strong>
                    <p className="mt-1 text-gray-600">{feature.desc}</p>
                  </div>
                ))}
                {(airlineFeatures[code]?.length ?? 0) === 0 && (
                  <p className="text-gray-500 col-span-full italic">Feature data not available for this airline.</p>
                )}
              </div>
            </div>

            {/* Historical Returns Overview */}
            {/*}
            <div className="mt-8">
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
            */}
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

      {/* Footer */}
      <footer className="bg-white border-t py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} AirStock Predictions - A flight forecast dashboard</p>
        </div>
      </footer>
    </div>
  );
};

export default AirlineDetail;
