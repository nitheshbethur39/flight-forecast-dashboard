import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import useChartData from '@/hooks/useChartData';


interface StockChartProps {
  airlineCode: string;
  period: string;
}

const StockChart: React.FC<StockChartProps> = ({ airlineCode }) => {
  const data = useChartData(airlineCode);

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="mb-4">
          <h3 className="font-semibold text-lg mb-1">Stock Price Prediction</h3>
          <p className="text-sm text-gray-500">Detailed forecast for {airlineCode}</p>
        </div>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line dataKey="Historical" stroke="#1f77b4" name="Historical" />
              <Line dataKey="Test_Actual" stroke="#2ca02c" name="Test (Actual)" />
              <Line dataKey="Test_Predicted" stroke="#ff7f0e" strokeDasharray="5 5" name="Test (Predicted)" />
              <Line dataKey="Forecasted" stroke="#d62728" strokeDasharray="2 2" name="Forecasted" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default StockChart;
