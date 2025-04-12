import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer
} from 'recharts';
import useUALChartData from '@/hooks/useUALChartData';

const UALChart = () => {
  const data = useUALChartData();

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Historical" stroke="#1f77b4" dot={false} />
        <Line type="monotone" dataKey="Test_Actual" stroke="#2ca02c" strokeDasharray="3 3" />
        <Line type="monotone" dataKey="Test_Predicted" stroke="#ff7f0e" strokeDasharray="5 5" />
        <Line type="monotone" dataKey="Forecasted" stroke="#d62728" strokeDasharray="1 3" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default UALChart;
