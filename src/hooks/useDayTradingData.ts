import { useEffect, useState } from 'react';
import Papa from 'papaparse';

export interface DayTradingPoint {
  DateTime: string;
  Actual: number;
  MedianForecast: number;
}

export interface GroupedDayData {
  day: string;
  points: DayTradingPoint[];
}

const useDayTradingData = (airlineCode: string): GroupedDayData[] => {
  const [data, setData] = useState<GroupedDayData[]>([]);

  useEffect(() => {
    fetch(`/data/daytrading/${airlineCode.toLowerCase()}_day_trading.csv`)
  .then((res) => res.text())
  .then((csv) => {
    console.log("📥 Raw CSV Text:", csv.slice(0, 300)); // show partial CSV

    Papa.parse(csv, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        console.log("🧾 Parsed Results:", results.data);

        const rows = results.data as Papa.ParseResult<any>['data'];

        const grouped: Record<string, DayTradingPoint[]> = {};

        for (const row of rows) {
          console.log("➡️ Row:", row);

          const dateTime = row["DateTime"];
          const day = dateTime?.split(" ")[0];
          const actual = parseFloat(row["Actual"]);
          const median = parseFloat(row["MedianForecast"]);

          if (!day || isNaN(actual) || isNaN(median)) continue;

          if (!grouped[day]) grouped[day] = [];

          grouped[day].push({
            DateTime: dateTime,
            Actual: actual,
            MedianForecast: median,
          });
        }

        const result: GroupedDayData[] = Object.entries(grouped).map(([day, points]) => ({
          day,
          points,
        }));

        console.log("✅ Final Grouped:", result);
        setData(result);
      },
    });
  });
  }, [airlineCode]);

  return data;
};

export default useDayTradingData;
