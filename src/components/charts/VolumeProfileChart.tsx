import React from 'react';
import { BarChart } from '@tremor/react';

interface VolumeProfileChartProps {
  data: {
    price: number;
    volume: number;
    inValueArea: boolean;
  }[];
  poc: number;
}

export const VolumeProfileChart: React.FC<VolumeProfileChartProps> = ({ data, poc }) => {
  const chartData = data.map(d => ({
    price: d.price.toFixed(2),
    volume: d.volume,
    color: d.inValueArea ? 'Value Area' : 'Outside VA'
  }));

  return (
    <div className="h-[400px]">
      <BarChart
        data={chartData}
        index="price"
        categories={["volume"]}
        colors={["blue"]}
        valueFormatter={(number) => number.toLocaleString()}
        layout="vertical"
        stack={true}
      />
      <div className="mt-2 text-sm text-gray-600">
        Point of Control: ${poc.toFixed(2)}
      </div>
    </div>
  );
};