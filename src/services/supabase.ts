import { createClient } from '@supabase/supabase-js';
import { TradeSignal, StrategyConfig } from '../types/strategy';

const supabaseUrl = 'https://lvmreurdyeuucrjunbvm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2bXJldXJkeWV1dWNyanVuYnZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzNDU0MzMsImV4cCI6MjA0ODkyMTQzM30.x6o_ShbTqSzAqlZHvUKscLTdKh_ssCTAUDgepiw9MYQ';

export const supabase = createClient(supabaseUrl, supabaseKey);

export class SupabaseService {
  async saveStrategy(strategy: StrategyConfig) {
    const { data, error } = await supabase
      .from('strategies')
      .insert([strategy])
      .select();

    if (error) throw error;
    return data[0];
  }

  async getStrategies() {
    const { data, error } = await supabase
      .from('strategies')
      .select('*');

    if (error) throw error;
    return data;
  }

  async saveTrade(trade: TradeSignal) {
    const { data, error } = await supabase
      .from('trades')
      .insert([{
        symbol: trade.symbol,
        action: trade.action,
        price: trade.price,
        timestamp: trade.timestamp,
        quantity: trade.quantity,
        strategy: trade.strategy
      }])
      .select();

    if (error) throw error;
    return data[0];
  }

  async getTradeHistory(strategyName?: string) {
    let query = supabase
      .from('trades')
      .select('*')
      .order('timestamp', { ascending: false });

    if (strategyName) {
      query = query.eq('strategy', strategyName);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  }

  async saveBacktestResult(result: {
    strategyId: string;
    startDate: Date;
    endDate: Date;
    initialCapital: number;
    finalEquity: number;
    totalTrades: number;
    winRate: number;
    maxDrawdown: number;
  }) {
    const { data, error } = await supabase
      .from('backtest_results')
      .insert([result])
      .select();

    if (error) throw error;
    return data[0];
  }
}