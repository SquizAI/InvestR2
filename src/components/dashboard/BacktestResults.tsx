import React from 'react';
import { Card, Title, Text, Grid, Metric, AreaChart } from '@tremor/react';
import { format } from 'date-fns';

interface BacktestResultsProps {
  results: {
    equityCurve: number[];
    totalTrades: number;
    winRate: number;
    sharpeRatio: number;
    maxDrawdown: number;
    returns: number[];
  };
  dates: Date[];
}

export const BacktestResults = ({ results, dates }: BacktestResultsProps) => {
  const chartData = results.equityCurve.map((equity, index) => ({
    date: format(dates[index], 'MM/dd/yyyy'),
    Equity: equity,
  }));

  return (
    <div className="space-y-6">
      <Card>
        <Title>Backtest Performance Metrics</Title>
        <Grid numItems={2} numItemsSm={2} numItemsLg={4} className="gap-6 mt-6">
          <div>
            <Text>Sharpe Ratio</Text>
            <Metric>{results.sharpeRatio.toFixed(2)}</Metric>
          </div>
          <div>
            <Text>Win Rate</Text>
            <Metric>{results.winRate.toFixed(1)}%</Metric>
          </div>
          <div>
            <Text>Max Drawdown</Text>
            <Metric>{(results.maxDrawdown * 100).toFixed(1)}%</Metric>
          </div>
          <div>
            <Text>Total Trades</Text>
            <Metric>{results.totalTrades}</Metric>
          </div>
        </Grid>
      </Card>

      <Card>
        <Title>Equity Curve</Title>
        <AreaChart
          className="h-72 mt-4"
          data={chartData}
          index="date"
          categories={["Equity"]}
          colors={["blue"]}
          valueFormatter={(number) => `$${number.toFixed(2)}`}
        />
      </Card>
    </div>
  );
};