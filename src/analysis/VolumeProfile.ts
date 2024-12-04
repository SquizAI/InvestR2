import { MarketData } from '../types/strategy';

export class VolumeProfile {
  private readonly priceIntervals: number = 50;

  analyze(data: MarketData[]) {
    const prices = data.map(d => d.close);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice;
    const intervalSize = priceRange / this.priceIntervals;

    const volumeByPrice = new Map<number, number>();
    
    data.forEach(candle => {
      const priceInterval = Math.floor((candle.close - minPrice) / intervalSize);
      const currentVolume = volumeByPrice.get(priceInterval) || 0;
      volumeByPrice.set(priceInterval, currentVolume + candle.volume);
    });

    // Calculate Value Area
    const totalVolume = Array.from(volumeByPrice.values()).reduce((a, b) => a + b, 0);
    const valueAreaVolume = totalVolume * 0.70; // 70% of total volume
    let currentVolume = 0;
    const valueArea = new Set<number>();

    // Sort intervals by volume
    const sortedIntervals = Array.from(volumeByPrice.entries())
      .sort(([, a], [, b]) => b - a);

    for (const [interval] of sortedIntervals) {
      if (currentVolume >= valueAreaVolume) break;
      currentVolume += volumeByPrice.get(interval) || 0;
      valueArea.add(interval);
    }

    return {
      volumeProfile: Array.from(volumeByPrice.entries()).map(([interval, volume]) => ({
        price: minPrice + (interval * intervalSize),
        volume,
        inValueArea: valueArea.has(interval)
      })),
      poc: minPrice + (sortedIntervals[0][0] * intervalSize) // Point of Control
    };
  }
}