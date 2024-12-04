import React from 'react';
import { Card, Title } from '@tremor/react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface StrategyVisualizerProps {
  data: any[];
  signals: any[];
}

export const StrategyVisualizer: React.FC<StrategyVisualizerProps> = ({ data, signals }) => {
  return (
    <Card>
      <Title>Strategy Performance</Title>
      <div className="h-[400px] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis 
              dataKey="timestamp" 
              tickFormatter={(timestamp) => new Date(timestamp).toLocaleDateString()}
            />
            <YAxis yAxisId="price" domain={['auto', 'auto']} />
            <YAxis yAxisId="indicator" orientation="right" domain={['auto', 'auto']} />
            <Tooltip
              labelFormatter={(label) => new Date(label).toLocaleString()}
              formatter={(value) => [`$${value}`, 'Price']}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke="#2563eb" 
              yAxisId="price"
              dot={false}
            />
            <Line 
              type="monotone" 
              dataKey="indicator" 
              stroke="#16a34a" 
              yAxisId="indicator"
              dot={false}
            />
            {signals.map((signal, index) => (
              <Line
                key={index}
                type="monotone"
                dataKey={signal.name}
                stroke={signal.color}
                yAxisId="price"
                dot={true}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};