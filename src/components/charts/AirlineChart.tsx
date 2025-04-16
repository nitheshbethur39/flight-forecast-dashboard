import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { Card, CardContent } from '@/components/ui/card';
import useAirlineChartData from '@/hooks/useAirlineChartData';

interface AirlineChartProps {
  airlineCode: string;
}

const AirlineChart: React.FC<AirlineChartProps> = ({ airlineCode }) => {
  const data = useAirlineChartData(airlineCode);

  return (
    <Card className="w-full mt-6 border shadow-sm">
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold mb-4">Stock Price Prediction</h2>
        <p className="text-sm text-gray-500 mb-4">Detailed forecast for {airlineCode}</p>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={data}
            margin={{ top: 10, right: 30, left: 10, bottom: 30 }}
          >
            <XAxis 
              dataKey="Date" 
              tick={{ fontSize: 12 }} 
              angle={0}
              label={{ value: 'Quarter', position: 'insideBottom', offset: -10 }}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `$${value.toFixed(2)}`}
              label={{ value: 'Price', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip 
              formatter={(value: number) => `$${value.toFixed(2)}`}
              wrapperStyle={{ fontSize: '14px' }} 
            />
            <Legend verticalAlign="top" height={36} />
            
            <Line
              type="monotone"
              dataKey="Historical"
              stroke="#1f77b4"
              strokeWidth={3}
              dot={{ r: 4, fill: '#1f77b4' }}
              connectNulls
              name="Historical"
            />

            <Line
              type="monotone"
              dataKey="Test_Predicted"
              stroke="#ff7f0e"
              strokeWidth={3}
              strokeDasharray="4 4"
              dot={{ r: 4, fill: '#ff7f0e' }}
              connectNulls
              name="Test (Predicted)"
            />

            <Line
              type="monotone"
              dataKey="Forecasted"
              stroke="#d62728"
              strokeWidth={3}
              strokeDasharray="6 3"
              dot={{ r: 4, fill: '#d62728' }}
              connectNulls
              name="Forecasted"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default AirlineChart;
