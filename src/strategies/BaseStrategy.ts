import { MarketData, StrategyConfig, TradeSignal } from '../types/strategy';

export abstract class BaseStrategy {
  protected config: StrategyConfig;
  protected marketData: MarketData[];

  constructor(config: StrategyConfig) {
    this.config = config;
    this.marketData = [];
  }

  abstract analyze(): TradeSignal | null;

  protected calculatePositionSize(price: number): number {
    const accountValue = 100000; // This should come from actual account
    let positionSize: number;

    if (typeof this.config.positionSize === 'number') {
      positionSize = this.config.positionSize;
    } else {
      positionSize = (accountValue * (this.config.positionSize / 100));
    }

    return Math.floor(positionSize / price);
  }

  updateMarketData(data: MarketData[]): void {
    this.marketData = data;
  }
}