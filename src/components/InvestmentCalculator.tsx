import React, { useState } from "react";
import airlineData from "../../src/data/airline_forecasted_data.json";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

type StockRecord = {
  Date: string;
  Close: number;
};

export default function InvestmentCalculator() {
  const [airline, setAirline] = useState("DAL");
  const [amount, setAmount] = useState(1000);
  const [startQuarter, setStartQuarter] = useState("");

  const [result, setResult] = useState<{
    final: number;
    profit: number;
    multiplier: number;
    periodCount: number;
    startDate: string;
    endDate: string;
  } | null>(null);

  const airlines = Object.keys(airlineData);

  const getAvailableQuarters = (airline: string): string[] => {
    const data = (airlineData as Record<string, StockRecord[]>)[airline];
    return data.map((d) => d.Date.replace(" ", "-"));
  };

  const calculateReturn = () => {
    const data = (airlineData as Record<string, StockRecord[]>)[airline].map((d) => ({
      Date: d.Date.replace(" ", "-"),
      Close: d.Close,
    }));

    if (!data || data.length < 2) return;

    const startIndex = data.findIndex((d) => d.Date === startQuarter);
    if (startIndex === -1 || startIndex >= data.length - 1) return;

    const sliced = data.slice(startIndex).filter((d) => d.Date >= startQuarter);
    if (sliced.length < 2) return;

    const startPrice = sliced[0].Close;
    const endPrice = sliced[sliced.length - 1].Close;
    const periodCount = sliced.length;
    const startDate = sliced[0].Date;
    const endDate = sliced[sliced.length - 1].Date;

    const finalValue = (endPrice / startPrice) * amount;
    const profit = finalValue - amount;
    const multiplier = finalValue / amount;

    setResult({
      final: finalValue,
      profit,
      multiplier,
      periodCount,
      startDate,
      endDate,
    });
  };

  const forecastChartData = (airlineData[airline] || [])
    .map((d) => ({
      Date: d.Date.replace(" ", "-"),
      Close: d.Close,
    }))
    .filter((d) => d.Date >= startQuarter);

  return (
    <div style={{ padding: "1rem" }}>
     

      <div className="mb-4">
        <label className="block mb-1 font-medium">Select Airline:</label>
        <select
          value={airline}
          onChange={(e) => {
            setAirline(e.target.value);
            setStartQuarter("");
            setResult(null);
          }}
          className="border p-2 rounded w-full"
        >
          {airlines.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Investment Amount ($):</label>
        
        <input
          type="number"
          value={amount === 0 ? '' : amount}
          placeholder="Enter any amount"
          min={100}
          step={100}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="border p-2 rounded w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Start Quarter:</label>
        <select
          value={startQuarter}
          onChange={(e) => setStartQuarter(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="" disabled>
            -- Select a quarter --
          </option>
          {getAvailableQuarters(airline).map((q) => (
            <option key={q} value={q}>
              {q}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={calculateReturn}
        disabled={!startQuarter}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Calculate
      </button>

      {result && (
        <>
          <div className="mt-6 bg-gray-100 p-4 rounded-lg">
            <p className="text-lg font-semibold">
               Final Value: ${result.final.toFixed(2)}
            </p>
            {result.profit >= 0 ? (
              <p className="text-green-600 font-semibold">
                 Profit: ${result.profit.toFixed(2)}
              </p>
            ) : (
              <p className="text-red-600 font-semibold">
                 Loss: ${Math.abs(result.profit).toFixed(2)}
              </p>
            )}
            <p className="text-gray-800">
               Multiplier: {result.multiplier.toFixed(2)}x
            </p>
            <p className="text-gray-600">
               Based on {result.periodCount} quarter(s) of forecast data
            </p>
            <p className="text-gray-500">
               From <strong>{result.startDate}</strong> to{" "}
              <strong>{result.endDate}</strong>
            </p>
          </div>

          {/* Forecast Line Chart */}
          <div style={{ width: '600px' }}>
          <div className="mt-8 bg-white p-6 shadow rounded-lg">
            <h4 className="text-lg font-semibold mb-2"> Forecasted Trend</h4>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={forecastChartData}>
                <XAxis dataKey="Date" 
                label={{ value: 'Quarter', position: 'insideBottom', offset: 0 }} />
                <YAxis domain={["auto", "auto"]}
                label={{ value: 'Price $', angle: -90, position: 'insideLeft' }} />
              
                <Tooltip />
                <Line type="monotone" dataKey="Close" stroke="#1e40af" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          </div>

          {/* Historical Data Table */}

          {/* Buy/Sell Signal and Conditional Best Timing */}
          <div className="flex flex-col lg:flex-row gap-6 mt-8">
            {/* Investment Signal Bar Chart */}
            <div className="flex-1 bg-white p-4 shadow rounded-lg">
              <h4 className="text-lg font-semibold mb-2"> Investment Signal</h4>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={[{
                  label: result.profit >= 0 ? "Buy" : "Sell",
                  value: Math.abs(result.profit)
                }]}>
                  <XAxis dataKey="label" />
                  <YAxis label={{ value: 'Price $', angle: -90, position: 'insideLeft' }}/>
                  <Tooltip />
                  <Bar
                    dataKey="value"
                    name={result.profit >= 0 ? "Buy Signal" : "Sell Signal"}
                    fill={result.profit >= 0 ? "#10b981" : "#ef4444"}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Best Timing only if Profit */}
            {result.profit > 0 && (
              <div className="flex-1 bg-yellow-50 p-4 border border-yellow-200 rounded">
                <h4 className="text-md font-semibold mb-2"> Suggested Buy/Sell Timing</h4>
                {(() => {
                  const buyPoint = forecastChartData.reduce((min, d) => d.Close < min.Close ? d : min, forecastChartData[0]);
                  const afterBuy = forecastChartData.filter(d => d.Date > buyPoint.Date);
                  const sellPoint = afterBuy.length
                    ? afterBuy.reduce((max, d) => d.Close > max.Close ? d : max, afterBuy[0])
                    : buyPoint;

                  const returnPct = ((sellPoint.Close - buyPoint.Close) / buyPoint.Close) * 100;

                  return (
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li><strong>Best Time to Buy:</strong> {buyPoint.Date} @ ${buyPoint.Close.toFixed(2)}</li>
                      <li><strong>Best Time to Sell:</strong> {sellPoint.Date} @ ${sellPoint.Close.toFixed(2)}</li>
                      <li><strong>Potential Return:</strong> {returnPct.toFixed(2)}%</li>
                    </ul>
                  );
                })()}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
