
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface StockChartProps {
  airlineCode: string;
  period: string;
}

// Mock data for the chart
const generateMockData = (airlineCode: string, period: string) => {
  const dataPoints = period === '2q' ? 6 : 9;
  const basePrice = (airlineCode.charCodeAt(0) + airlineCode.charCodeAt(1)) % 50 + 20;
  
  return Array.from({ length: dataPoints }, (_, i) => {
    const month = i + 1;
    let price = basePrice + (Math.sin(i) * 10) + Math.random() * 5;
    price = Math.round(price * 100) / 100;
    
    const predictedPrice = price + (Math.random() * 8) - 2;
    
    return {
      month: `Month ${month}`,
      actual: i < 3 ? price : null,
      predicted: i >= 2 ? predictedPrice : null,
    };
  });
};

const StockChart: React.FC<StockChartProps> = ({ airlineCode, period }) => {
  const data = generateMockData(airlineCode, period);

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="mb-4">
          <h3 className="font-semibold text-lg mb-1">Stock Price Prediction</h3>
          <p className="text-sm text-gray-500">
            {period === '2q' ? '6-month' : '9-month'} forecast for {airlineCode}
          </p>
        </div>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="actual" 
                stroke="#0055B8" 
                strokeWidth={2} 
                dot={{ r: 5 }} 
                name="Historical" 
              />
              <Line 
                type="monotone" 
                dataKey="predicted" 
                stroke="#FF6B00" 
                strokeWidth={2} 
                strokeDasharray="5 5" 
                dot={{ r: 4 }} 
                name="Predicted" 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default StockChart;
