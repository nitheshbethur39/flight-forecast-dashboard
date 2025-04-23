import React, { useEffect, useState } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { getHistoricalReturns } from '../../api/getHistoricalReturns';




interface Props {
  airlineCode: string;
}

interface StockPoint {
  Date: string;
  CLOSE: number;
}

const TIMEFRAMES = ['1Y', '3Y', '5Y', 'MAX'];

const airlinePrefixMap: Record<string, string> = {
  ALGT: 'Allegiant',
  ALK: 'Alaska',
  AAL: 'American',
  DAL: 'Delta',
  ULCC: 'Frontier',
  JBLU: 'JetBlue',
  LUV: 'Southwest',
  UAL: 'United',
};

const YearlyTradingChart: React.FC<Props> = ({ airlineCode }) => {
  const [timeframe, setTimeframe] = useState('1Y');
  const [data, setData] = useState<StockPoint[]>([]);
  const [returns, setReturns] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchPlotData = async () => {
      const filePrefix = airlinePrefixMap[airlineCode];
      try {
        const res = await fetch(`/data/yearly_charts_data/${filePrefix}_${timeframe}_Close.csv`);
        const text = await res.text();
        const lines = text.split('\n').slice(1);
        const parsed = lines
          .filter(Boolean)
          .map((line) => {
            const [Date, CLOSE] = line.split(',');
            return { Date, CLOSE: parseFloat(CLOSE) };
          });
        setData(parsed);
      } catch (err) {
        console.error('Plot CSV fetch failed:', err);
      }
    };

    fetchPlotData();
  }, [airlineCode, timeframe]);

  useEffect(() => {
    const fetchReturnData = async () => {
      try {
        const result = await getHistoricalReturns(airlineCode);
        if (result) setReturns(result);
      } catch (err) {
        console.error('Return API fetch failed:', err);
      }
    };

    fetchReturnData();
  }, [airlineCode]);

  return (
    <Card className="p-6 mt-4">
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-6">
          {['1Y', '3Y', '5Y'].map((tf) => (
            <div key={tf} className="p-4 bg-gray-50 rounded shadow text-center">
              <p className="text-gray-500 text-sm">{tf} Return</p>
              <p className={`text-lg font-semibold flex items-center justify-center gap-1 ${
                returns[tf] > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {returns[tf] !== undefined ? (
                  <>
                    {returns[tf] > 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                    {Math.abs(returns[tf]).toFixed(2)}%
                  </>
                ) : '--'}
              </p>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mb-4">
          {TIMEFRAMES.map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-4 py-2 rounded border ${
                tf === timeframe
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>

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
      </CardContent>
    </Card>
  );
};

export default YearlyTradingChart;
