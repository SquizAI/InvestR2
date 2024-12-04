import React from 'react';
import { Card, Select, SelectItem, Button } from '@tremor/react';
import { LineChart, CandlestickChart, BarChart2, TrendingUp } from 'lucide-react';

interface ChartControlsProps {
  chartType: string;
  onChartTypeChange: (type: string) => void;
  timeframe: string;
  onTimeframeChange: (timeframe: string) => void;
  onToggleIndicator: (indicator: string) => void;
  activeIndicators: string[];
}

export const ChartControls: React.FC<ChartControlsProps> = ({
  chartType,
  onChartTypeChange,
  timeframe,
  onTimeframeChange,
  onToggleIndicator,
  activeIndicators
}) => {
  const chartTypes = [
    { value: 'candlestick', label: 'Candlestick', icon: CandlestickChart },
    { value: 'line', label: 'Line', icon: LineChart },
    { value: 'area', label: 'Area', icon: TrendingUp },
    { value: 'bar', label: 'Bar', icon: BarChart2 }
  ];

  const timeframes = [
    { value: '1', label: '1m' },
    { value: '5', label: '5m' },
    { value: '15', label: '15m' },
    { value: '30', label: '30m' },
    { value: '60', label: '1h' },
    { value: '240', label: '4h' },
    { value: 'D', label: '1D' }
  ];

  const indicators = [
    { value: 'sma', label: 'SMA' },
    { value: 'ema', label: 'EMA' },
    { value: 'bollinger', label: 'Bollinger Bands' },
    { value: 'rsi', label: 'RSI' },
    { value: 'macd', label: 'MACD' },
    { value: 'volume', label: 'Volume Profile' }
  ];

  return (
    <Card className="p-4 mb-4">
      <div className="flex items-center space-x-4">
        <div className="flex space-x-2">
          {chartTypes.map(({ value, label, icon: Icon }) => (
            <Button
              key={value}
              variant={chartType === value ? 'primary' : 'secondary'}
              onClick={() => onChartTypeChange(value)}
              icon={Icon}
              size="sm"
            >
              {label}
            </Button>
          ))}
        </div>

        <Select
          value={timeframe}
          onValueChange={onTimeframeChange}
          className="w-32"
        >
          {timeframes.map(({ value, label }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </Select>

        <div className="flex flex-wrap gap-2">
          {indicators.map(({ value, label }) => (
            <Button
              key={value}
              variant={activeIndicators.includes(value) ? 'primary' : 'secondary'}
              onClick={() => onToggleIndicator(value)}
              size="sm"
            >
              {label}
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
};