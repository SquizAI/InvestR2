import { BaseStrategy } from './BaseStrategy';
import { TradeSignal } from '../types/strategy';
import { RSI, BollingerBands } from 'technicalindicators';

export class MeanReversionStrategy extends BaseStrategy {
  private readonly period = 20;
  private readonly rsiPeriod = 14;
  private readonly rsiOverbought = 70;
  private readonly rsiOversold = 30;

  analyze(): TradeSignal | null {
    if (this.marketData.length < this.period) {
      return null;
    }

    const prices = this.marketData.map(d => d.close);
    const currentPrice = prices[prices.length - 1];
    const currentTime = this.marketData[this.marketData.length - 1].timestamp;

    // Calculate RSI
    const rsiValues = RSI.calculate({
      values: prices,
      period: this.rsiPeriod
    });
    const currentRSI = rsiValues[rsiValues.length - 1];

    // Calculate Bollinger Bands
    const bbands = BollingerBands.calculate({
      period: this.period,
      values: prices,
      stdDev: 2
    });
    const currentBands = bbands[bbands.length - 1];

    if (currentPrice < currentBands.lower && currentRSI < this.rsiOversold) {
      return {
        symbol: this.config.symbol,
        action: 'buy',
        price: currentPrice,
        timestamp: currentTime,
        quantity: this.calculatePositionSize(currentPrice),
        strategy: 'mean-reversion'
      };
    }

    if (currentPrice > currentBands.upper && currentRSI > this.rsiOverbought) {
      return {
        symbol: this.config.symbol,
        action: 'sell',
        price: currentPrice,
        timestamp: currentTime,
        quantity: this.calculatePositionSize(currentPrice),
        strategy: 'mean-reversion'
      };
    }

    return null;
  }
}