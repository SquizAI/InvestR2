import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@tremor/react';
import { createChart, IChartApi, ISeriesApi, ColorType } from 'lightweight-charts';
import { useMarketData } from '../../hooks/useMarketData';
import { ErrorFallback } from '../ErrorFallback';
import { ChartControls } from './ChartControls';
import { calculateIndicators } from '../../utils/indicators';

interface MarketOverviewProps {
  symbol: string;
}

export const MarketOverview: React.FC<MarketOverviewProps> = ({ symbol }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [chart, setChart] = useState<IChartApi | null>(null);
  const [mainSeries, setMainSeries] = useState<ISeriesApi<'Candlestick'> | null>(null);
  const [chartType, setChartType] = useState('candlestick');
  const [timeframe, setTimeframe] = useState('5');
  const [activeIndicators, setActiveIndicators] = useState<string[]>(['volume']);
  
  const { data, loading, error } = useMarketData(symbol, timeframe);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chartInstance = createChart(chartContainerRef.current, {
      layout: {
        background: { color: '#1B1B1B' },
        textColor: '#DDD',
      },
      grid: {
        vertLines: { color: '#2B2B2B' },
        horzLines: { color: '#2B2B2B' },
      },
      width: chartContainerRef.current.clientWidth,
      height: 600,
      crosshair: {
        mode: 0,
      },
    });

    const handleResize = () => {
      if (chartContainerRef.current) {
        chartInstance.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener('resize', handleResize);
    setChart(chartInstance);

    return () => {
      window.removeEventListener('resize', handleResize);
      chartInstance.remove();
    };
  }, []);

  useEffect(() => {
    if (!chart || !data.length) return;

    // Clear existing series
    chart.removeSeries(mainSeries as any);

    // Create new series based on chart type
    const series = chart.addCandlestickSeries({
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
    });

    const candleData = data.map((item) => ({
      time: item.timestamp.getTime() / 1000,
      open: item.open,
      high: item.high,
      low: item.low,
      close: item.close,
    }));

    series.setData(candleData);
    setMainSeries(series);

    // Add indicators
    const indicators = calculateIndicators(data, activeIndicators);
    indicators.forEach(indicator => {
      const indicatorSeries = chart.addLineSeries({
        color: indicator.color,
        lineWidth: 2,
      });
      indicatorSeries.setData(indicator.data);
    });

    chart.timeScale().fitContent();
  }, [chart, data, chartType, activeIndicators]);

  if (loading) {
    return (
      <Card className="h-[600px] animate-pulse">
        <div className="h-full bg-gray-800 rounded"></div>
      </Card>
    );
  }

  if (error) {
    return <ErrorFallback error={error} resetErrorBoundary={() => window.location.reload()} />;
  }

  return (
    <div>
      <ChartControls
        chartType={chartType}
        onChartTypeChange={setChartType}
        timeframe={timeframe}
        onTimeframeChange={setTimeframe}
        activeIndicators={activeIndicators}
        onToggleIndicator={(indicator) => {
          setActiveIndicators(prev => 
            prev.includes(indicator)
              ? prev.filter(i => i !== indicator)
              : [...prev, indicator]
          );
        }}
      />
      <Card className="h-[600px] bg-[#1B1B1B]">
        <div ref={chartContainerRef} className="h-full" />
      </Card>
    </div>
  );
};