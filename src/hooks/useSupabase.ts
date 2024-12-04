import { useState, useEffect } from 'react';
import { SupabaseService } from '../services/supabase';
import { StrategyConfig, TradeSignal } from '../types/strategy';

export function useSupabase() {
  const [strategies, setStrategies] = useState<StrategyConfig[]>([]);
  const [trades, setTrades] = useState<TradeSignal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const supabaseService = new SupabaseService();

  useEffect(() => {
    loadStrategies();
    loadTrades();
  }, []);

  async function loadStrategies() {
    try {
      const data = await supabaseService.getStrategies();
      setStrategies(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load strategies'));
    } finally {
      setLoading(false);
    }
  }

  async function loadTrades() {
    try {
      const data = await supabaseService.getTradeHistory();
      setTrades(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load trades'));
    }
  }

  async function saveStrategy(strategy: StrategyConfig) {
    try {
      await supabaseService.saveStrategy(strategy);
      await loadStrategies();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to save strategy'));
      throw err;
    }
  }

  async function saveTrade(trade: TradeSignal) {
    try {
      await supabaseService.saveTrade(trade);
      await loadTrades();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to save trade'));
      throw err;
    }
  }

  return {
    strategies,
    trades,
    loading,
    error,
    saveStrategy,
    saveTrade,
    refreshData: () => {
      loadStrategies();
      loadTrades();
    }
  };
}