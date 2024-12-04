import { StrategyConfig } from '../types/strategy';
import Decimal from 'decimal.js';

export class PositionSizer {
  private readonly config: StrategyConfig;
  private readonly accountValue: number;

  constructor(config: StrategyConfig, accountValue: number) {
    this.config = config;
    this.accountValue = accountValue;
  }

  calculatePosition(price: number, atr: number): number {
    // Kelly Criterion calculation
    const winRate = 0.55; // Example win rate
    const avgWin = 2.0; // Risk:Reward ratio
    const avgLoss = 1.0;
    
    const kelly = new Decimal(winRate).times(avgWin)
      .minus(new Decimal(1).minus(winRate).times(avgLoss))
      .dividedBy(avgWin);

    // Apply risk management rules
    const riskAmount = new Decimal(this.accountValue)
      .times(this.config.riskPerTrade / 100)
      .times(kelly);

    const stopLoss = atr * 2; // 2 ATR for stop loss
    const positionSize = riskAmount.dividedBy(stopLoss);
    const shares = positionSize.dividedBy(price).floor();

    return shares.toNumber();
  }

  getMaxPositionSize(price: number): number {
    const maxRiskPerTrade = new Decimal(this.accountValue)
      .times(this.config.riskPerTrade / 100);
    
    return maxRiskPerTrade.dividedBy(price).floor().toNumber();
  }
}