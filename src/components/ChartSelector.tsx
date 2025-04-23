import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ChartSelectorProps {
  onPeriodChange: (period: 'ltf' | 'day') => void;
}

const ChartSelector: React.FC<ChartSelectorProps> = ({ onPeriodChange }) => {
  return (
    <Tabs defaultValue="ltf" className="w-full" onValueChange={(val) => onPeriodChange(val as 'ltf' | 'day')}>
      <TabsList className="mb-4">
        <TabsTrigger value="ltf">Long Term Forecast</TabsTrigger>
        
        {/* <TabsTrigger value="year">Yearly Trading Forecast</TabsTrigger>
        Uncomment if you want to add a day trading option */}
        <TabsTrigger value="day">Day Trading Forecast</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default ChartSelector;
