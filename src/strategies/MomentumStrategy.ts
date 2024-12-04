import { BaseStrategy } from './BaseStrategy';
import { TradeSignal } from '../types/strategy';
import { SMA } from 'technicalindicators';

export class MomentumStrategy extends BaseStrategy {
  private readonly shortPeriod = 10;
  private readonly longPeriod = 20;

  analyze(): TradeSignal | null {
    if (this.marketData.length < this.longPeriod) {
      return null;
    }

    const prices = this.marketData.map(d => d.close);
    const shortSMA = SMA.calculate({ period: this.shortPeriod, values: prices });
    const longSMA = SMA.calculate({ period: this.longPeriod, values: prices });

    const currentShortSMA = shortSMA[shortSMA.length - 1];
    const currentLongSMA = longSMA[longSMA.length - 1];
    const previousShortSMA = shortSMA[shortSMA.length - 2];
    const previousLongSMA = longSMA[longSMA.length - 2];

    const currentPrice = this.marketData[this.marketData.length - 1].close;
    const currentTime = this.marketData[this.marketData.length - 1].timestamp;

    if (currentShortSMA > currentLongSMA && previousShortSMA <= previousLongSMA) {
      return {
        symbol: this.config.symbol,
        action: 'buy',
        price: currentPrice,
        timestamp: currentTime,
        quantity: this.calculatePositionSize(currentPrice),
        strategy: 'momentum'
      };
    }

    if (currentShortSMA < currentLongSMA && previousShortSMA >= previousLongSMA) {
      return {
        symbol: this.config.symbol,
        action: 'sell',
        price: currentPrice,
        timestamp: currentTime,
        quantity: this.calculatePositionSize(currentPrice),
        strategy: 'momentum'
      };
    }

    return null;
  }
}