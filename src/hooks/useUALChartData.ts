import { useEffect, useState } from 'react';
import Papa from 'papaparse';

export interface UALDataPoint {
  Date: string;
  Historical: number | null;
  Test_Actual: number | null;
  Test_Predicted: number | null;
  Forecasted: number | null;
}

const useUALChartData = (): UALDataPoint[] => {
  const [data, setData] = useState<UALDataPoint[]>([]);

  useEffect(() => {
    fetch('/data/UAL_model_plot_data.csv')
      .then(response => response.text())
      .then(csvText => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results: any) => {
            const parseValue = (val: string) => {
              return val === '' || val === 'null' ? null : parseFloat(val);
            };

            const parsed = results.data.map((row: any) => ({
              Date: row.Date,
              Historical: parseValue(row.Historical),
              Test_Actual: parseValue(row.Test_Actual),
              Test_Predicted: parseValue(row.Test_Predicted),
              Forecasted: parseValue(row.Forecasted),
            }));

            setData(parsed);
          },
        });
      });
  }, []);

  return data;
};

export default useUALChartData;
