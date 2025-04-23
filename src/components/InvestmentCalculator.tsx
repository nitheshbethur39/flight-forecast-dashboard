import React, { useState } from "react";
import airlineData from "../../src/data/airline_forecasted_data.json";
import {
  LineChart,
  Line,
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
    return data
      .map((d) => d.Date.replace(" ", "-"))
      .filter((d) =>
        [
          "2024-Q1", "2024-Q2", "2024-Q3", "2024-Q4",
          "2025-Q1", "2025-Q2", "2025-Q3", "2025-Q4"
        ].includes(d)
      );
  };

  const calculateReturn = () => {
    const data = (airlineData as Record<string, StockRecord[]>)[airline].map((d) => ({
      Date: d.Date.replace(" ", "-"),
      Close: d.Close,
    }));

    if (!data || data.length < 2) return;

    const startIndex = data.findIndex((d) => d.Date === startQuarter);
    if (startIndex === -1 || startIndex >= data.length - 1) return;

    const sliced = data.slice(startIndex).filter((d) =>
      [
        "2024-Q1", "2024-Q2", "2024-Q3", "2024-Q4",
        "2025-Q1", "2025-Q2", "2025-Q3", "2025-Q4"
      ].includes(d.Date)
    );

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
    .filter((d) => {
      const allowed = [
        "2024-Q1", "2024-Q2", "2024-Q3", "2024-Q4",
        "2025-Q1", "2025-Q2", "2025-Q3", "2025-Q4"
      ];
      return allowed.includes(d.Date) && d.Date >= startQuarter;
    });

  return (
    <div style={{ padding: "1rem" }}>
      <h3 className="text-xl font-bold mb-4">Investment Return Calculator</h3>

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
          value={amount}
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
            -- Select quarter (2024–2025 only) --
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
              💵 Final Value: ${result.final.toFixed(2)}
            </p>
            {result.profit >= 0 ? (
              <p className="text-green-600 font-semibold">
                📈 Profit: ${result.profit.toFixed(2)}
              </p>
            ) : (
              <p className="text-red-600 font-semibold">
                📉 Loss: ${Math.abs(result.profit).toFixed(2)}
              </p>
            )}
            <p className="text-gray-800">
              📊 Multiplier: {result.multiplier.toFixed(2)}x
            </p>
            <p className="text-gray-600">
              ⏳ Based on {result.periodCount} quarter(s) of forecast data
            </p>
            <p className="text-gray-500">
              📅 From <strong>{result.startDate}</strong> to{" "}
              <strong>{result.endDate}</strong>
            </p>
          </div>

          <div className="mt-8 bg-white p-4 shadow rounded-lg">
            <h4 className="text-lg font-semibold mb-2">📉 Forecasted Trend</h4>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={forecastChartData}>
                <XAxis dataKey="Date" />
                <YAxis domain={["auto", "auto"]} />
                <Tooltip />
                <Line type="monotone" dataKey="Close" stroke="#1e40af" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
}
