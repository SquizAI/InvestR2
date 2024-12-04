import { MarketData, TradeSignal } from '../types/strategy';
import { BaseStrategy } from '../strategies/BaseStrategy';

export class MonteCarloSimulation {
  private readonly simulations: number = 1000;
  private readonly confidenceLevel: number = 0.95;

  async runSimulation(
    strategy: BaseStrategy,
    historicalData: MarketData[],
    initialCapital: number
  ) {
    const results: number[][] = [];

    for (let i = 0; i < this.simulations; i++) {
      const simulatedEquity = await this.simulateStrategy(
        strategy,
        this.bootstrapData(historicalData),
        initialCapital
      );
      results.push(simulatedEquity);
    }

    return this.analyzeResults(results);
  }

  private bootstrapData(data: MarketData[]): MarketData[] {
    const bootstrapped: MarketData[] = [];
    const length = data.length;

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * length);
      bootstrapped.push(data[randomIndex]);
    }

    return bootstrapped;
  }

  private async simulateStrategy(
    strategy: BaseStrategy,
    data: MarketData[],
    initialCapital: number
  ): Promise<number[]> {
    let equity = initialCapital;
    const equityCurve: number[] = [equity];

    for (const marketData of data) {
      strategy.updateMarketData([marketData]);
      const signal = strategy.analyze();

      if (signal) {
        equity = this.executeSimulatedTrade(equity, signal);
      }
      equityCurve.push(equity);
    }

    return equityCurve;
  }

  private executeSimulatedTrade(equity: number, signal: TradeSignal): number {
    const tradeReturn = Math.random() * 0.02 - 0.01; // Simplified random return
    return equity * (1 + tradeReturn);
  }

  private analyzeResults(results: number[][]) {
    const finalEquities = results.map(r => r[r.length - 1]);
    finalEquities.sort((a, b) => a - b);

    const mean = finalEquities.reduce((a, b) => a + b, 0) / this.simulations;
    const var95Index = Math.floor(this.simulations * (1 - this.confidenceLevel));
    const var95 = finalEquities[var95Index];

    return {
      mean,
      var95,
      worstCase: finalEquities[0],
      bestCase: finalEquities[this.simulations - 1],
      results: finalEquities
    };
  }
}