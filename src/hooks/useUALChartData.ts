import { useEffect, useState } from 'react';
import Papa from 'papaparse';

interface UALDataPoint {
  Date: string;
  Historical?: number;
  Forecasted?: number;
  Test_Actual?: number;
  Test_Predicted?: number;
}

const useUALChartData = () => {
  const [data, setData] = useState<UALDataPoint[]>([]);

  useEffect(() => {
    Papa.parse('/data/UAL_model_plot_data.csv', {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        setData(results.data as UALDataPoint[]);
      }
    });
  }, []);

  return data;
};

export default useUALChartData;
