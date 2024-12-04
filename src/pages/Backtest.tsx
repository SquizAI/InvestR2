import React from 'react';
import { BacktestResults } from '../components/dashboard/BacktestResults';

export const Backtest = () => {
  const mockResults = {
    equityCurve: [100000, 102000, 101500, 103000, 105000],
    totalTrades: 25,
    winRate: 65,
    sharpeRatio: 1.8,
    maxDrawdown: 0.05,
    returns: [0.02, -0.005, 0.015, 0.019]
  };

  const dates = Array.from({ length: 5 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date;
  });

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Backtest Results</h1>
      <BacktestResults results={mockResults} dates={dates} />
    </div>
  );
};