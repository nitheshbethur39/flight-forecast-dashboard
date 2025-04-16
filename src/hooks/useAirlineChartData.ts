import { useEffect, useState } from 'react';
import Papa from 'papaparse';

export interface AirlineDataPoint {
  Date: string;
  Historical: number | null;
  Test_Predicted: number | null;
  Forecasted: number | null;
}

const useAirlineChartData = (airlineCode: string): AirlineDataPoint[] => {
  const [data, setData] = useState<AirlineDataPoint[]>([]);

  useEffect(() => {
    fetch(`/data/${airlineCode}_model_plot_data.csv`)
      .then(response => response.text())
      .then(csvText => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results: any) => {
            const parseValue = (val: string) =>
              val === '' || val === 'null' ? null : parseFloat(val);

            const parsed = results.data.map((row: any) => ({
              Date: row.Date,
              Historical: parseValue(row.Historical),
              Test_Predicted: parseValue(row.Test_Predicted),
              Forecasted: parseValue(row.Forecasted),
            }));

            setData(parsed);
          },
        });
      });
  }, [airlineCode]);

  return data;
};

export default useAirlineChartData;
