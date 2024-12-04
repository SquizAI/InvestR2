import { useState, useEffect, useCallback } from 'react';
import { AlphaVantageService } from '../services/alphaVantage';
import { AlpacaService } from '../services/alpaca';
import { MarketData } from '../types/strategy';
import { useWebSocket } from './useWebSocket';

export function useMarketData(symbol: string, interval: string = '5min') {
  const [data, setData] = useState<MarketData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const handleRealtimeData = useCallback((newData: MarketData) => {
    setData(prevData => {
      const updatedData = [newData, ...prevData];
      return updatedData.slice(0, 1000); // Keep last 1000 data points
    });
  }, []);

  useWebSocket(symbol, handleRealtimeData);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const alpaca = new AlpacaService();
      const alphaVantage = new AlphaVantageService();

      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 7);

      let marketData: MarketData[] = [];
      let error: Error | null = null;
      
      try {
        marketData = await alpaca.getHistoricalData(
          symbol,
          startDate,
          endDate,
          parseInt(interval)
        );
      } catch (alpacaError) {
        console.warn('Alpaca API failed, trying Alpha Vantage:', alpacaError);
        error = alpacaError as Error;
        
        try {
          marketData = await alphaVantage.getIntraday(symbol, interval);
          error = null;
        } catch (alphaVantageError) {
          console.error('Alpha Vantage API also failed:', alphaVantageError);
          error = alphaVantageError as Error;
        }
      }

      if (!marketData.length) {
        throw new Error('No market data available for the specified symbol and timeframe');
      }

      setData(marketData.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()));
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch market data');
      console.error('Market data fetch error:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [symbol, interval]);

  useEffect(() => {
    fetchData();
    const pollInterval = setInterval(fetchData, 60000); // Poll every minute
    return () => clearInterval(pollInterval);
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}