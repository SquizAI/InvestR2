import React, { useState } from 'react';
import { Grid } from '@tremor/react';
import { MarketOverview } from '../components/dashboard/MarketOverview';
import { TradingStats } from '../components/dashboard/TradingStats';
import { RiskManagement } from '../components/dashboard/RiskManagement';
import { WatchList } from '../components/dashboard/WatchList';
import { SymbolSearch } from '../components/forms/SymbolSearch';
import { StockTicker } from '../components/dashboard/StockTicker';
import { useMarketData } from '../hooks/useMarketData';
import { ErrorFallback } from '../components/ErrorFallback';

const defaultSymbols = ['SPY', 'AAPL', 'MSFT', 'GOOGL'];

export const Dashboard = () => {
  const [selectedSymbol, setSelectedSymbol] = useState('SPY');
  const [watchlist, setWatchlist] = useState(defaultSymbols);
  const { data, loading, error } = useMarketData(selectedSymbol);

  if (error) {
    return <ErrorFallback error={error} resetErrorBoundary={() => window.location.reload()} />;
  }

  const performance = {
    returns: 15.4,
    winRate: 65,
    trades: 150,
    profitFactor: 1.8,
    sharpeRatio: 1.2
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="w-1/3">
          <SymbolSearch onSymbolSelect={setSelectedSymbol} />
        </div>
        <WatchList 
          symbols={watchlist}
          onSymbolSelect={setSelectedSymbol}
          onWatchlistUpdate={setWatchlist}
        />
      </div>

      <StockTicker symbol={selectedSymbol} />
      
      <Grid numItems={1} numItemsSm={2} numItemsLg={2} className="gap-6">
        <MarketOverview symbol={selectedSymbol} />
        <TradingStats performance={performance} />
      </Grid>

      <RiskManagement 
        positions={[]} 
        riskMetrics={{
          var95: 5000,
          expectedShortfall: 7500,
          betaToSPY: 1.2,
          currentDrawdown: 0.05,
          leverageRatio: 1.0
        }}
      />
    </div>
  );
};