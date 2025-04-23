import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  Brush
} from 'recharts';
import { Card, CardContent } from '@/components/ui/card';
import useAirlineChartData from '@/hooks/useAirlineChartData';

interface AirlineChartProps {
  airlineCode: string;
}

const AirlineChart: React.FC<AirlineChartProps> = ({ airlineCode }) => {
  const data = useAirlineChartData(airlineCode);

  return (
    <Card className="w-full mt-6 border shadow-lg">
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold mb-4">Stock Price Prediction</h2>
        <p className="text-sm text-gray-500 mb-4">Detailed forecast for {airlineCode}</p>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={data}
            margin={{ top: 10, right: 30, left: 10, bottom: 30 }}
          >
            <CartesianGrid strokeDasharray="3 3" />

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

            {/* 🔍 Zoom and select feature */}
            <Brush
              dataKey="Date"
              height={30}
              stroke="#36454F"
              travellerWidth={10}
            />

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
// AirlineChart.tsx
// This component fetches and displays the airline stock price prediction data using a line chart.
// It uses the Recharts library for rendering the chart and includes a zoom and select feature using the Brush component.
// The chart displays three lines: Historical, Test (Predicted), and Forecasted prices.
// The data is fetched using a custom hook useAirlineChartData, which is expected to return the data in the required format.
// The chart is responsive and adjusts its size based on the parent container.
// The component is styled using Tailwind CSS classes for a clean and modern look.
// The chart includes tooltips for better data visibility and a legend to identify the different lines.
// The component is designed to be reusable and can be easily integrated into other parts of the application.
// The airlineCode prop is passed to the component to fetch data for a specific airline.
// The chart is wrapped in a Card component for better presentation and organization within the UI.
// The Card component is styled with padding and shadow for a polished appearance.
// The chart is designed to be user-friendly and visually appealing, making it easy for users to interpret the data.
// The component is exported as the default export, allowing it to be imported and used in other files.
// The component is written in TypeScript, ensuring type safety and better development experience.