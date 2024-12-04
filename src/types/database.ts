export interface BacktestResult {
  id?: string;
  strategyId: string;
  startDate: Date;
  endDate: Date;
  initialCapital: number;
  finalEquity: number;
  totalTrades: number;
  winRate: number;
  maxDrawdown: number;
  createdAt?: Date;
}

export interface Trade {
  id?: string;
  symbol: string;
  action: 'buy' | 'sell';
  price: number;
  timestamp: Date;
  quantity: number;
  strategy: string;
  createdAt?: Date;
}