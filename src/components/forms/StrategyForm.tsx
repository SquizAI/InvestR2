import React from 'react';
import { StrategyConfig } from '../../types/strategy';

interface StrategyFormProps {
  onSubmit: (config: StrategyConfig) => void;
  initialValues?: Partial<StrategyConfig>;
}

export const StrategyForm = ({ onSubmit, initialValues }: StrategyFormProps) => {
  const [config, setConfig] = React.useState<Partial<StrategyConfig>>({
    timeframe: 5,
    symbol: 'SPY',
    riskPerTrade: 1,
    maxDrawdown: 10,
    positionSize: 10000,
    slippage: 0.1,
    ...initialValues
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(config as StrategyConfig);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Symbol</label>
        <input
          type="text"
          value={config.symbol}
          onChange={(e) => setConfig({ ...config, symbol: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Timeframe (minutes)</label>
        <input
          type="number"
          value={config.timeframe}
          onChange={(e) => setConfig({ ...config, timeframe: Number(e.target.value) })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Risk Per Trade (%)</label>
        <input
          type="number"
          value={config.riskPerTrade}
          onChange={(e) => setConfig({ ...config, riskPerTrade: Number(e.target.value) })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Position Size ($)</label>
        <input
          type="number"
          value={config.positionSize}
          onChange={(e) => setConfig({ ...config, positionSize: Number(e.target.value) })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Save Strategy
      </button>
    </form>
  );
};