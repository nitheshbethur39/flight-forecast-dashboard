import React, { useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Brush
} from 'recharts';
import useDayTradingData from '@/hooks/useDayTradingData';

interface DayTradingChartProps {
  airlineCode: string;
}

const DayTradingChart: React.FC<DayTradingChartProps> = ({ airlineCode }) => {
  const groupedData = useDayTradingData(airlineCode);

  useEffect(() => {
    console.log("📊 Day Trading Chart groupedData:", groupedData);
  }, [groupedData]);

  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm mt-6">
      {groupedData.length === 0 ? (
        <p className="text-center text-gray-500">No day trading data available</p>
      ) : (
        groupedData.map((group) => (
          <div key={group.day} className="mb-10">
            <h3 className="text-md font-semibold mb-2">Day {group.day}</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={group.points}
                  margin={{ top: 30, right: 30, bottom: 40, left: 50 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="DateTime"
                    tickFormatter={(value) =>
                      new Date(value).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    }
                  />
                  <YAxis
                    domain={['dataMin - 0.2', 'dataMax + 0.2']}
                    tickFormatter={(value) => `$${value.toFixed(2)}`}
                  />
                  <Tooltip />
                  <Legend verticalAlign="top" height={36} />
                  <Brush
                      dataKey="Date"
                      height={30}
                      stroke="#36454F"
                      travellerWidth={10}
                  />
                  
                  <Line type="monotone" dataKey="Actual" stroke="#1f77b4" name="Actual Close" dot />
                  <Line type="monotone" dataKey="MedianForecast" stroke="#d62728" name="Median Forecast" dot />
                </LineChart>
              </ResponsiveContainer>


              
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default DayTradingChart;
