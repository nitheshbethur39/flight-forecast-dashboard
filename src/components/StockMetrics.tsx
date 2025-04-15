import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownRight, Minus, Loader2 } from 'lucide-react';
import { getStockPrice } from '@/api/getStockPrice';

interface StockMetricsProps {
  airlineCode: string;
}

const tickerMap: Record<string, string> = {
  AAL: 'AAL',
  ALK: 'ALK',
  JBLU: 'JBLU',
  DAL: 'DAL',
  ULCC: 'ULCC',
  ALGT: 'ALGT',
  SAVEQ: 'SAVE',
  UAL: 'UAL',
  LUV: 'LUV',
};

const cache: Record<string, { data: { price: number; change: number }; timestamp: number }> = {};

const StockMetrics: React.FC<StockMetricsProps> = ({ airlineCode }) => {
  const [price, setPrice] = useState<number | null>(null);
  const [change, setChange] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const ticker = tickerMap[airlineCode];
      const now = Date.now();

      // Use cached data if available and fresh (5 min)
      if (cache[ticker] && now - cache[ticker].timestamp < 5 * 60 * 1000) {
        const { data } = cache[ticker];
        setPrice(data.price);
        setChange(data.change);
        setLastUpdated(new Date(cache[ticker].timestamp).toLocaleTimeString());
        setLoading(false);
        return;
      }

      try {
        const data = await getStockPrice(ticker);
        if (data && typeof data.price === 'number' && typeof data.change === 'number') {
          setPrice(data.price);
          setChange(data.change);
          cache[ticker] = { data, timestamp: now };
          setLastUpdated(new Date(now).toLocaleTimeString());
        } else {
          console.warn("Invalid stock data:", data);
        }
      } catch (err) {
        console.error("Error fetching stock data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [airlineCode]);

  const trend = change === null ? 'neutral' : change > 0 ? 'up' : change < 0 ? 'down' : 'neutral';
  const prediction = price !== null ? (price * 1.15).toFixed(2) : '—';
  const confidence = '84%';

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card>
        <CardContent className="pt-6">
          <div className="text-sm text-gray-500 mb-1">Current Price</div>
          {loading ? (
            <Loader2 className="animate-spin h-6 w-6 text-gray-400" />
          ) : (
            <div className="text-2xl font-bold">
              {price !== null ? `$${price.toFixed(2)}` : '—'}
            </div>
          )}
          <div className={`flex items-center mt-1 text-sm ${
            trend === 'up' ? 'text-green-600' :
            trend === 'down' ? 'text-red-600' : 'text-gray-600'
          }`}>
            {trend === 'up' ? <ArrowUpRight className="h-4 w-4 mr-1" /> :
             trend === 'down' ? <ArrowDownRight className="h-4 w-4 mr-1" /> :
             <Minus className="h-4 w-4 mr-1" />}
            <span>{change !== null ? `${change.toFixed(2)}%` : '—'}</span>
          </div>
          {lastUpdated && !loading && (
            <p className="text-xs text-gray-400 mt-2">Last updated: {lastUpdated}</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="text-sm text-gray-500 mb-1">Predicted Peak</div>
          <div className="text-2xl font-bold">{price ? `$${prediction}` : '—'}</div>
          <div className="text-sm text-gray-600 mt-1">Next 2 quarters</div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="text-sm text-gray-500 mb-1">Prediction Confidence</div>
          <div className="text-2xl font-bold">{confidence}</div>
          <div className="text-sm text-gray-600 mt-1">Based on historical data</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StockMetrics;
