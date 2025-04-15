import { useEffect, useState } from 'react';
import Papa from 'papaparse';

interface ChartRow {
  Date: string;
  Historical?: number;
  Test_Actual?: number;
  Test_Predicted?: number;
  Forecasted?: number;
}

const useChartData = (airlineCode: string) => {
  const [data, setData] = useState<ChartRow[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/data/${airlineCode}_model_plot_data.csv`);
      const text = await response.text();
      
      Papa.parse(text, {
        header: true,
        dynamicTyping: true,
        complete: (result) => {
          setData(result.data as ChartRow[]);
        },
      });
    };

    fetchData();
  }, [airlineCode]);

  return data;
};

export default useChartData;
