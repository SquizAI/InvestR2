import { BaseStrategy } from './BaseStrategy';
import { TradeSignal } from '../types/strategy';
import { MACD, EMA } from 'technicalindicators';

export class TrendFollowingStrategy extends BaseStrategy {
  private readonly fastPeriod = 12;
  private readonly slowPeriod = 26;
  private readonly signalPeriod = 9;
  private readonly emaPeriod = 200;

  analyze(): TradeSignal | null {
    if (this.marketData.length < Math.max(this.slowPeriod + this.signalPeriod, this.emaPeriod)) {
      return null;
    }

    const prices = this.marketData.map(d => d.close);
    const currentPrice = prices[prices.length - 1];
    const currentTime = this.marketData[this.marketData.length - 1].timestamp;

    // Calculate MACD
    const macdInput = {
      values: prices,
      fastPeriod: this.fastPeriod,
      slowPeriod: this.slowPeriod,
      signalPeriod: this.signalPeriod,
      SimpleMAOscillator: false,
      SimpleMASignal: false
    };

    const macdValues = MACD.calculate(macdInput);
    const currentMACD = macdValues[macdValues.length - 1];
    const previousMACD = macdValues[macdValues.length - 2];

    // Calculate EMA
    const emaValues = EMA.calculate({
      period: this.emaPeriod,
      values: prices
    });
    const currentEMA = emaValues[emaValues.length - 1];

    // MACD crossover and trend confirmation
    if (currentMACD.MACD > currentMACD.signal && 
        previousMACD.MACD <= previousMACD.signal && 
        currentPrice > currentEMA) {
      return {
        symbol: this.config.symbol,
        action: 'buy',
        price: currentPrice,
        timestamp: currentTime,
        quantity: this.calculatePositionSize(currentPrice),
        strategy: 'trend-following'
      };
    }

    if (currentMACD.MACD < currentMACD.signal && 
        previousMACD.MACD >= previousMACD.signal && 
        currentPrice < currentEMA) {
      return {
        symbol: this.config.symbol,
        action: 'sell',
        price: currentPrice,
        timestamp: currentTime,
        quantity: this.calculatePositionSize(currentPrice),
        strategy: 'trend-following'
      };
    }

    return null;
  }
}