import React, { useEffect, useState } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownRight, RefreshCw } from 'lucide-react';

interface Props {
  airlineCode: string;
}

interface StockPoint {
  Date: string;
  CLOSE: number;
}

const TIMEFRAMES = ['1Y', '3Y', '5Y', 'MAX'];

const YearlyTradingChart: React.FC<Props> = ({ airlineCode }) => {
  const [timeframe, setTimeframe] = useState('1Y');
  const [data, setData] = useState<StockPoint[]>([]);
  const [returns, setReturns] = useState<Record<string, number | null>>({
    '1Y': null,
    '3Y': null,
    '5Y': null
  });
  const [isLoadingReturns, setIsLoadingReturns] = useState(true);
  const [isLoadingChart, setIsLoadingChart] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const fetchPlotData = async () => {
      setIsLoadingChart(true);
      setError(null);

      const fileName = `${airlineCode}_${timeframe}_Close.csv`;
      const filePath = `/data/yearly_charts_data/${fileName}`;

      try {
        const res = await fetch(filePath);
        if (!res.ok) throw new Error(`Failed to fetch chart data: ${res.status}`);

        const text = await res.text();
        const lines = text.split('\n').slice(1).filter(Boolean);

        const parsed = lines
          .map(line => line.trim())
          .filter(Boolean)
          .map((line) => {
            const [Date, CLOSE] = line.split(',').map(val => val.trim());
            return { Date, CLOSE: parseFloat(CLOSE) || 0 };
          });

        if (!parsed.length) throw new Error('No valid rows parsed');

        setData(parsed);
      } catch (err) {
        console.error('Chart data fetch failed:', err);
        setError('Failed to load chart data');
        setData([]);
      } finally {
        setIsLoadingChart(false);
      }
    };

    fetchPlotData();
  }, [airlineCode, timeframe]);

  useEffect(() => {
    const calculateReturns = async () => {
      setIsLoadingReturns(true);
      setError(null);

      const returnValues: Record<string, number | null> = {
        '1Y': null,
        '3Y': null,
        '5Y': null
      };

      try {
        for (const tf of ['1Y', '3Y', '5Y']) {
          const fileName = `${airlineCode}_${tf}_Close.csv`;
          const filePath = `/data/yearly_charts_data/${fileName}`;

          try {
            const res = await fetch(filePath);
            if (!res.ok) {
              console.error(`Failed to fetch return data for ${tf}: ${res.status}`);
              continue;
            }

            const text = await res.text();
            const lines = text.split('\n').slice(1).filter(Boolean);

            const cleanedLines = lines.map(line => line.trim()).filter(Boolean);

            if (cleanedLines.length < 2) {
              console.warn(`Not enough data points for ${tf} return calculation`);
              continue;
            }

            const firstClose = parseFloat(cleanedLines[0].split(',')[1].trim());
            const lastClose = parseFloat(cleanedLines[cleanedLines.length - 1].split(',')[1].trim());

            if (isNaN(firstClose) || isNaN(lastClose) || firstClose === 0) {
              console.warn(`Invalid data for ${tf} return calculation`);
              continue;
            }

            const returnPercentage = ((lastClose - firstClose) / firstClose) * 100;
            returnValues[tf] = returnPercentage;
          } catch (err) {
            console.error(`Error calculating ${tf} return:`, err);
          }
        }

        setReturns(returnValues);
      } catch (err) {
        console.error('Returns calculation failed:', err);
        setError('Failed to calculate returns');
      } finally {
        setIsLoadingReturns(false);
      }
    };

    calculateReturns();
  }, [airlineCode, retryCount]);

  const retryFetchReturns = () => setRetryCount(prev => prev + 1);

  const renderReturnCard = (period: string) => {
    const returnValue = returns[period];
    return (
      <div key={period} className="p-4 bg-gray-50 rounded shadow text-center">
        <p className="text-gray-500 text-sm">{period} Return</p>
        {isLoadingReturns ? (
          <div className="flex items-center justify-center h-6">
            <RefreshCw className="h-4 w-4 animate-spin text-blue-500" />
          </div>
        ) : returnValue !== null ? (
          <p className={`text-lg font-semibold flex items-center justify-center gap-1 ${
            returnValue > 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {returnValue > 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
            {Math.abs(returnValue).toFixed(2)}%
          </p>
        ) : (
          <p className="text-sm text-gray-500">No data</p>
        )}
      </div>
    );
  };

  return (
    <Card className="p-6 mt-4">
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-6">
          {['1Y', '3Y', '5Y'].map(renderReturnCard)}
        </div>

        <div className="flex gap-2 mb-4">
          {TIMEFRAMES.map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-4 py-2 rounded border ${
                tf === timeframe ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded mb-4 text-sm">
            {error}
            <button onClick={retryFetchReturns} className="ml-2 text-xs text-blue-600 hover:text-blue-800 underline">
              Retry
            </button>
          </div>
        )}

        {isLoadingChart ? (
          <div className="flex items-center justify-center h-[300px] bg-gray-50 rounded">
            <RefreshCw className="h-8 w-8 animate-spin text-blue-500" />
          </div>
        ) : data.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="Date" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="CLOSE"
                stroke="#3b82f6"
                fillOpacity={1}
                fill="url(#colorPrice)"
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-[300px] bg-gray-50 rounded text-gray-500">
            No data available
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default YearlyTradingChart;
