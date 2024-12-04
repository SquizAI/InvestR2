import { BaseStrategy } from '../strategies/BaseStrategy';
import { MarketData, TradeSignal } from '../types/strategy';
import { format } from 'date-fns';

export class Backtester {
  private strategy: BaseStrategy;
  private trades: TradeSignal[] = [];
  private cash: number;
  private positions: Map<string, number> = new Map();
  private equity: number[] = [];
  private returns: number[] = [];
  private slippage: number;
  private riskFreeRate: number = 0.02; // 2% annual risk-free rate

  constructor(strategy: BaseStrategy, initialCash: number, slippage: number) {
    this.strategy = strategy;
    this.cash = initialCash;
    this.slippage = slippage;
  }

  async runBacktest(historicalData: MarketData[]): Promise<void> {
    for (let i = 0; i < historicalData.length; i++) {
      const windowData = historicalData.slice(0, i + 1);
      this.strategy.updateMarketData(windowData);
      
      const signal = this.strategy.analyze();
      if (signal) {
        this.executeSignal(signal);
      }

      this.updateEquity(historicalData[i].close);
      
      // Calculate daily returns
      if (i > 0) {
        const dailyReturn = (this.equity[i] - this.equity[i - 1]) / this.equity[i - 1];
        this.returns.push(dailyReturn);
      }
    }
  }

  private executeSignal(signal: TradeSignal): void {
    const adjustedPrice = this.applySlippage(signal.price, signal.action);
    
    if (signal.action === 'buy') {
      const cost = adjustedPrice * signal.quantity;
      if (cost <= this.cash) {
        this.cash -= cost;
        const currentPosition = this.positions.get(signal.symbol) || 0;
        this.positions.set(signal.symbol, currentPosition + signal.quantity);
        this.trades.push({ ...signal, price: adjustedPrice });
      }
    } else {
      const currentPosition = this.positions.get(signal.symbol) || 0;
      if (currentPosition >= signal.quantity) {
        const proceeds = adjustedPrice * signal.quantity;
        this.cash += proceeds;
        this.positions.set(signal.symbol, currentPosition - signal.quantity);
        this.trades.push({ ...signal, price: adjustedPrice });
      }
    }
  }

  private calculateSharpeRatio(): number {
    if (this.returns.length === 0) return 0;

    const avgReturn = this.returns.reduce((sum, ret) => sum + ret, 0) / this.returns.length;
    const stdDev = Math.sqrt(
      this.returns.reduce((sum, ret) => sum + Math.pow(ret - avgReturn, 2), 0) / 
      (this.returns.length - 1)
    );

    // Annualize the Sharpe ratio (assuming daily returns)
    const annualizedReturn = avgReturn * 252; // 252 trading days in a year
    const annualizedStdDev = stdDev * Math.sqrt(252);
    
    return (annualizedReturn - this.riskFreeRate) / annualizedStdDev;
  }

  private applySlippage(price: number, action: 'buy' | 'sell'): number {
    const adjustment = 1 + (action === 'buy' ? this.slippage : -this.slippage);
    return price * adjustment;
  }

  private updateEquity(currentPrice: number): void {
    let totalEquity = this.cash;
    for (const [symbol, quantity] of this.positions.entries()) {
      totalEquity += quantity * currentPrice;
    }
    this.equity.push(totalEquity);
  }

  getResults() {
    return {
      trades: this.trades,
      finalEquity: this.equity[this.equity.length - 1],
      equityCurve: this.equity,
      totalTrades: this.trades.length,
      winRate: this.calculateWinRate(),
      sharpeRatio: this.calculateSharpeRatio(),
      returns: this.returns,
      maxDrawdown: this.calculateMaxDrawdown(),
    };
  }

  private calculateMaxDrawdown(): number {
    let maxDrawdown = 0;
    let peak = this.equity[0];
    
    for (const value of this.equity) {
      if (value > peak) {
        peak = value;
      }
      const drawdown = (peak - value) / peak;
      maxDrawdown = Math.max(maxDrawdown, drawdown);
    }
    
    return maxDrawdown;
  }

  private calculateWinRate(): number {
    if (this.trades.length === 0) return 0;
    
    let profitableTrades = 0;
    for (let i = 0; i < this.trades.length - 1; i += 2) {
      if (this.trades[i + 1] && this.trades[i].action === 'buy') {
        if (this.trades[i + 1].price > this.trades[i].price) {
          profitableTrades++;
        }
      }
    }
    return (profitableTrades / (this.trades.length / 2)) * 100;
  }
}