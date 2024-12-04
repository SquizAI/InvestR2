import React from 'react';
import { ArrowUpRight, ArrowDownRight, TrendingUp, TrendingDown } from 'lucide-react';
import { useMarketData } from '../../hooks/useMarketData';
import { format } from 'date-fns';

interface StockTickerProps {
  symbol: string;
}

export const StockTicker: React.FC<StockTickerProps> = ({ symbol }) => {
  const { data, loading, error } = useMarketData(symbol);

  if (loading) {
    return (
      <div className="animate-pulse bg-white rounded-lg shadow-sm p-6">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="h-10 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  if (error || !data.length) {
    return (
      <div className="bg-red-50 rounded-lg p-4 text-red-600">
        Unable to load ticker data
      </div>
    );
  }

  const latestData = data[0];
  const previousClose = data[1]?.close ?? latestData.close;
  const priceChange = latestData.close - previousClose;
  const percentChange = (priceChange / previousClose) * 100;
  const isPositive = priceChange >= 0;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-2xl font-bold">{symbol}</h3>
            <span className="text-sm text-gray-500">
              {format(latestData.timestamp, 'MMM dd, yyyy')}
            </span>
          </div>
          <div className="flex items-baseline gap-3 mt-2">
            <p className="text-3xl font-bold">${latestData.close.toFixed(2)}</p>
            <div className={`flex items-center ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
              {isPositive ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
              <span className="text-lg font-semibold ml-1">
                {isPositive ? '+' : ''}{priceChange.toFixed(2)} ({Math.abs(percentChange).toFixed(2)}%)
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-sm text-gray-500">Open</p>
          <p className="text-lg font-semibold">${latestData.open.toFixed(2)}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-sm text-gray-500">High</p>
          <p className="text-lg font-semibold">${latestData.high.toFixed(2)}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-sm text-gray-500">Low</p>
          <p className="text-lg font-semibold">${latestData.low.toFixed(2)}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-sm text-gray-500">Volume</p>
          <p className="text-lg font-semibold">{(latestData.volume / 1000000).toFixed(2)}M</p>
        </div>
      </div>
    </div>
  );
};