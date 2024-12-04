import axios from 'axios';
import { MarketData } from '../types/strategy';
import { config } from '../config/env';

const API_KEY = config.alphaVantage.apiKey;
const BASE_URL = config.alphaVantage.baseUrl;

export class AlphaVantageService {
  async getIntraday(symbol: string, interval: string = '5min') {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          function: 'TIME_SERIES_INTRADAY',
          symbol,
          interval,
          apikey: API_KEY,
          outputsize: 'full'
        }
      });

      const timeSeries = response.data[`Time Series (${interval})`];
      return Object.entries(timeSeries).map(([timestamp, data]: [string, any]): MarketData => ({
        timestamp: new Date(timestamp),
        open: parseFloat(data['1. open']),
        high: parseFloat(data['2. high']),
        low: parseFloat(data['3. low']),
        close: parseFloat(data['4. close']),
        volume: parseFloat(data['5. volume'])
      }));
    } catch (error) {
      console.error('Error fetching data from Alpha Vantage:', error);
      throw error;
    }
  }

  async getTechnicalIndicator(symbol: string, indicator: string, interval: string = 'daily') {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          function: indicator,
          symbol,
          interval,
          time_period: 20,
          series_type: 'close',
          apikey: API_KEY
        }
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching technical indicator:', error);
      throw error;
    }
  }
}