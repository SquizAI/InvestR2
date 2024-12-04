import React from 'react';
import { Card, Title, BarChart, DonutChart } from '@tremor/react';
import { Position } from '../../types/strategy';

interface RiskManagementProps {
  positions: Position[];
  riskMetrics: {
    var95: number;
    expectedShortfall: number;
    betaToSPY: number;
    currentDrawdown: number;
    leverageRatio: number;
  };
}

export const RiskManagement: React.FC<RiskManagementProps> = ({ positions, riskMetrics }) => {
  const positionData = positions.map(pos => ({
    name: pos.symbol,
    value: pos.quantity * pos.currentPrice,
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <Title>Portfolio Allocation</Title>
        <DonutChart
          className="mt-6"
          data={positionData}
          category="value"
          index="name"
          valueFormatter={(number) => `$${number.toLocaleString()}`}
          colors={["blue", "cyan", "indigo"]}
        />
      </Card>

      <Card>
        <Title>Risk Metrics</Title>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <p className="text-sm text-gray-600">Value at Risk (95%)</p>
            <p className="text-xl font-semibold text-red-600">
              ${riskMetrics.var95.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Expected Shortfall</p>
            <p className="text-xl font-semibold text-red-600">
              ${riskMetrics.expectedShortfall.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Beta to SPY</p>
            <p className="text-xl font-semibold">{riskMetrics.betaToSPY.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Current Drawdown</p>
            <p className="text-xl font-semibold text-orange-600">
              {(riskMetrics.currentDrawdown * 100).toFixed(2)}%
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};