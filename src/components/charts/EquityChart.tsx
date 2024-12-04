import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface EquityChartProps {
  data: { timestamp: Date; equity: number }[];
}

export const EquityChart = ({ data }: EquityChartProps) => {
  return (
    <div className="h-[400px] w-full bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold mb-4">Equity Curve</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="timestamp" 
            tickFormatter={(timestamp) => new Date(timestamp).toLocaleDateString()}
          />
          <YAxis />
          <Tooltip 
            formatter={(value) => [`$${value}`, 'Equity']}
            labelFormatter={(timestamp) => new Date(timestamp).toLocaleString()}
          />
          <Line 
            type="monotone" 
            dataKey="equity" 
            stroke="#2563eb" 
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};