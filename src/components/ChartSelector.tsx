import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ChartSelectorProps {
  onPeriodChange: (period: string) => void;
}

const ChartSelector: React.FC<ChartSelectorProps> = ({ onPeriodChange }) => {
  return (
    <Tabs defaultValue="2q" className="w-full" onValueChange={onPeriodChange}>
      <TabsList className="mb-4">
        <TabsTrigger value="3q">3 Quarters</TabsTrigger>
        <TabsTrigger value="day">Day Trading</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default ChartSelector;
