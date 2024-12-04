import { SMA, EMA, RSI, BollingerBands, MACD } from 'technicalindicators';
import { MarketData } from '../types/strategy';

export function calculateIndicators(data: MarketData[], activeIndicators: string[]) {
  const prices = data.map(d => d.close);
  const indicators: Array<{ data: any[]; color: string }> = [];

  activeIndicators.forEach(indicator => {
    switch (indicator) {
      case 'sma':
        const smaData = SMA.calculate({ period: 20, values: prices });
        indicators.push({
          data: smaData.map((value, i) => ({
            time: data[i + (prices.length - smaData.length)].timestamp.getTime() / 1000,
            value
          })),
          color: '#2962FF'
        });
        break;

      case 'ema':
        const emaData = EMA.calculate({ period: 20, values: prices });
        indicators.push({
          data: emaData.map((value, i) => ({
            time: data[i + (prices.length - emaData.length)].timestamp.getTime() / 1000,
            value
          })),
          color: '#FF6B6B'
        });
        break;

      case 'bollinger':
        const bbData = BollingerBands.calculate({
          period: 20,
          values: prices,
          stdDev: 2
        });
        
        indicators.push({
          data: bbData.map((band, i) => ({
            time: data[i + (prices.length - bbData.length)].timestamp.getTime() / 1000,
            value: band.upper
          })),
          color: '#B388FF'
        });

        indicators.push({
          data: bbData.map((band, i) => ({
            time: data[i + (prices.length - bbData.length)].timestamp.getTime() / 1000,
            value: band.lower
          })),
          color: '#B388FF'
        });
        break;

      case 'rsi':
        const rsiData = RSI.calculate({ period: 14, values: prices });
        indicators.push({
          data: rsiData.map((value, i) => ({
            time: data[i + (prices.length - rsiData.length)].timestamp.getTime() / 1000,
            value
          })),
          color: '#FFD700'
        });
        break;

      case 'macd':
        const macdData = MACD.calculate({
          fastPeriod: 12,
          slowPeriod: 26,
          signalPeriod: 9,
          values: prices,
          SimpleMAOscillator: false,
          SimpleMASignal: false
        });
        
        indicators.push({
          data: macdData.map((value, i) => ({
            time: data[i + (prices.length - macdData.length)].timestamp.getTime() / 1000,
            value: value.MACD
          })),
          color: '#00E676'
        });
        break;
    }
  });

  return indicators;
}