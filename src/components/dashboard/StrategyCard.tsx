import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { StrategyConfig } from '../../types/strategy';

interface StrategyCardProps {
  strategy: StrategyConfig;
  performance: {
    returns: number;
    winRate: number;
    trades: number;
  };
}

export const StrategyCard = ({ strategy, performance }: StrategyCardProps) => {
  const isPositive = performance.returns >= 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold">{strategy.symbol}</h3>
        <span className={`flex items-center ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
          {Math.abs(performance.returns)}%
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Win Rate</p>
          <p className="text-lg font-medium">{performance.winRate}%</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Total Trades</p>
          <p className="text-lg font-medium">{performance.trades}</p>
        </div>
      </div>
    </div>
  );
};