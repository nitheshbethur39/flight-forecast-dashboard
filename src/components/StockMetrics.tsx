
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

interface StockMetricsProps {
  airlineCode: string;
}

// Mock data generator
const generateMetrics = (airlineCode: string) => {
  // Generate mock data based on airline code for consistency
  const seed = airlineCode.charCodeAt(0) + airlineCode.charCodeAt(1);
  
  const currentPrice = Math.floor(seed % 50) + 20 + (Math.random() * 10);
  const changePercent = (Math.random() * 6) - 3;
  const prediction = currentPrice * (1 + (Math.random() * 0.2));
  const confidence = Math.floor(Math.random() * 30) + 70;
  
  return {
    currentPrice: currentPrice.toFixed(2),
    changePercent: changePercent.toFixed(2),
    prediction: prediction.toFixed(2),
    confidence: `${confidence}%`,
    trend: changePercent > 0 ? 'up' : changePercent < 0 ? 'down' : 'neutral'
  };
};

const StockMetrics: React.FC<StockMetricsProps> = ({ airlineCode }) => {
  const metrics = generateMetrics(airlineCode);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card>
        <CardContent className="pt-6">
          <div className="text-sm text-gray-500 mb-1">Current Price</div>
          <div className="text-2xl font-bold">${metrics.currentPrice}</div>
          <div className={`flex items-center mt-1 text-sm ${
            metrics.trend === 'up' ? 'text-green-600' : 
            metrics.trend === 'down' ? 'text-red-600' : 'text-gray-600'
          }`}>
            {metrics.trend === 'up' ? (
              <ArrowUpRight className="h-4 w-4 mr-1" />
            ) : metrics.trend === 'down' ? (
              <ArrowDownRight className="h-4 w-4 mr-1" />
            ) : (
              <Minus className="h-4 w-4 mr-1" />
            )}
            <span>{metrics.changePercent}%</span>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="text-sm text-gray-500 mb-1">Predicted Peak</div>
          <div className="text-2xl font-bold">${metrics.prediction}</div>
          <div className="text-sm text-gray-600 mt-1">Next 2 quarters</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="text-sm text-gray-500 mb-1">Prediction Confidence</div>
          <div className="text-2xl font-bold">{metrics.confidence}</div>
          <div className="text-sm text-gray-600 mt-1">Based on historical data</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StockMetrics;
