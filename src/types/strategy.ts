export interface StrategyConfig {
  timeframe: number; // in minutes
  symbol: string;
  riskPerTrade: number; // percentage
  maxDrawdown: number; // percentage
  positionSize: number; // dollar amount or percentage
  slippage: number; // percentage
}

export interface MarketData {
  timestamp: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface Position {
  symbol: string;
  quantity: number;
  entryPrice: number;
  currentPrice: number;
  side: 'long' | 'short';
}

export interface TradeSignal {
  symbol: string;
  action: 'buy' | 'sell';
  price: number;
  timestamp: Date;
  quantity: number;
  strategy: string;
}