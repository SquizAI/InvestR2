import axios from 'axios';
import { MarketData } from '../types/strategy';
import { config } from '../config/env';

export class AlpacaService {
  private readonly headers: Record<string, string>;

  constructor() {
    this.headers = {
      'APCA-API-KEY-ID': config.alpaca.apiKeyId,
      'APCA-API-SECRET-KEY': config.alpaca.apiSecretKey,
      'Content-Type': 'application/json'
    };
  }

  async getHistoricalData(
    symbol: string,
    startDate: Date,
    endDate: Date,
    timeframe: number
  ): Promise<MarketData[]> {
    try {
      const response = await axios.get(
        `${config.alpaca.dataUrl}/v2/stocks/${symbol}/bars`, {
          headers: this.headers,
          params: {
            start: startDate.toISOString(),
            end: endDate.toISOString(),
            timeframe: `${timeframe}Min`,
            adjustment: 'raw',
            limit: 10000,
          },
        }
      );

      if (!response.data?.bars?.length) {
        throw new Error(`No data found for symbol ${symbol} in the specified time range`);
      }

      return response.data.bars.map((bar: any) => ({
        timestamp: new Date(bar.t),
        open: parseFloat(bar.o),
        high: parseFloat(bar.h),
        low: parseFloat(bar.l),
        close: parseFloat(bar.c),
        volume: parseInt(bar.v),
      }));
    } catch (error: any) {
      console.error('Error fetching historical data:', error.response?.data || error.message);
      throw new Error(`Failed to fetch historical data: ${error.response?.data?.message || error.message}`);
    }
  }

  async getQuote(symbol: string): Promise<any> {
    try {
      const response = await axios.get(
        `${config.alpaca.dataUrl}/v2/stocks/${symbol}/quotes/latest`,
        { headers: this.headers }
      );
      return response.data;
    } catch (error: any) {
      console.error('Error fetching quote:', error.response?.data || error.message);
      throw error;
    }
  }

  async getAccount(): Promise<any> {
    try {
      const response = await axios.get(
        `${config.alpaca.paperTradingUrl}/v2/account`,
        { headers: this.headers }
      );
      return response.data;
    } catch (error: any) {
      console.error('Error fetching account:', error.response?.data || error.message);
      throw error;
    }
  }

  async getPositions(): Promise<any> {
    try {
      const response = await axios.get(
        `${config.alpaca.paperTradingUrl}/v2/positions`,
        { headers: this.headers }
      );
      return response.data;
    } catch (error: any) {
      console.error('Error fetching positions:', error.response?.data || error.message);
      throw error;
    }
  }
}