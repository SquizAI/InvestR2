import React from 'react';
import { Card, Grid, Metric, Text, Title, BarList } from '@tremor/react';
import { ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';

interface TradingStatsProps {
  performance: {
    returns: number;
    winRate: number;
    trades: number;
    profitFactor: number;
    sharpeRatio: number;
  };
}

export const TradingStats = ({ performance }: TradingStatsProps) => {
  const metrics = [
    {
      title: "Total Return",
      metric: `${performance.returns.toFixed(2)}%`,
      icon: performance.returns >= 0 ? ArrowUpRight : ArrowDownRight,
      color: performance.returns >= 0 ? "emerald" : "red"
    },
    {
      title: "Win Rate",
      metric: `${performance.winRate.toFixed(1)}%`,
      icon: Activity,
      color: "blue"
    },
    {
      title: "Profit Factor",
      metric: performance.profitFactor.toFixed(2),
      icon: Activity,
      color: "amber"
    },
    {
      title: "Sharpe Ratio",
      metric: performance.sharpeRatio.toFixed(2),
      icon: Activity,
      color: "indigo"
    }
  ];

  return (
    <Grid numItems={1} numItemsSm={2} numItemsLg={4} className="gap-6">
      {metrics.map((item) => (
        <Card key={item.title} decoration="top" decorationColor={item.color}>
          <Text>{item.title}</Text>
          <Metric>{item.metric}</Metric>
        </Card>
      ))}
    </Grid>
  );
};