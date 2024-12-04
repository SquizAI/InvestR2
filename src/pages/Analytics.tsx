import React from 'react';
import { VolumeProfileChart } from '../components/charts/VolumeProfileChart';
import { EquityChart } from '../components/charts/EquityChart';

export const Analytics = () => {
  const mockVolumeData = Array.from({ length: 20 }, (_, i) => ({
    price: 100 + i,
    volume: Math.random() * 1000000,
    inValueArea: Math.random() > 0.3
  }));

  const mockEquityData = Array.from({ length: 30 }, (_, i) => ({
    timestamp: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
    equity: 100000 * (1 + Math.random() * 0.1)
  }));

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Analytics</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <VolumeProfileChart data={mockVolumeData} poc={105} />
        <EquityChart data={mockEquityData} />
      </div>
    </div>
  );
};