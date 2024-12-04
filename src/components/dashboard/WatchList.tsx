import React from 'react';
import { Card, Title } from '@tremor/react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useMarketData } from '../../hooks/useMarketData';

interface WatchListProps {
  symbols: string[];
  onSymbolSelect: (symbol: string) => void;
  onWatchlistUpdate: (symbols: string[]) => void;
}

export const WatchList: React.FC<WatchListProps> = ({ 
  symbols, 
  onSymbolSelect, 
  onWatchlistUpdate 
}) => {
  return (
    <Card className="w-2/3">
      <Title>Watchlist</Title>
      <div className="mt-4">
        <div className="grid grid-cols-4 gap-4">
          {symbols.map((symbol) => (
            <WatchListItem 
              key={symbol} 
              symbol={symbol}
              onSelect={() => onSymbolSelect(symbol)}
              onRemove={() => {
                onWatchlistUpdate(symbols.filter(s => s !== symbol));
              }}
            />
          ))}
        </div>
      </div>
    </Card>
  );
};

interface WatchListItemProps {
  symbol: string;
  onSelect: () => void;
  onRemove: () => void;
}

const WatchListItem: React.FC<WatchListItemProps> = ({ symbol, onSelect, onRemove }) => {
  const { data, loading } = useMarketData(symbol);

  if (loading || !data.length) {
    return (
      <div className="animate-pulse bg-gray-50 p-4 rounded-lg">
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
      </div>
    );
  }

  const latestPrice = data[0].close;
  const previousPrice = data[1]?.close ?? latestPrice;
  const priceChange = latestPrice - previousPrice;
  const percentChange = (priceChange / previousPrice) * 100;
  const isPositive = priceChange >= 0;

  return (
    <button
      onClick={onSelect}
      className="bg-gray-50 p-4 rounded-lg text-left hover:bg-gray-100 transition-colors"
    >
      <div className="flex justify-between items-start">
        <span className="font-semibold">{symbol}</span>
        {isPositive ? (
          <ArrowUpRight className="w-4 h-4 text-green-500" />
        ) : (
          <ArrowDownRight className="w-4 h-4 text-red-500" />
        )}
      </div>
      <div className="mt-2">
        <span className="text-lg font-bold">${latestPrice.toFixed(2)}</span>
        <span className={`ml-2 text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? '+' : ''}{percentChange.toFixed(2)}%
        </span>
      </div>
    </button>
  );
};