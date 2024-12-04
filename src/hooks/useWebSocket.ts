import { useEffect, useRef, useCallback } from 'react';
import { WebSocketService } from '../services/websocket';
import { MarketData } from '../types/strategy';

export function useWebSocket(symbol: string, onData: (data: MarketData) => void) {
  const wsRef = useRef<WebSocketService | null>(null);

  useEffect(() => {
    if (!symbol) return;

    if (!wsRef.current) {
      wsRef.current = new WebSocketService();
    }

    const ws = wsRef.current;
    ws.subscribe(symbol, onData);

    return () => {
      if (ws && onData) {
        ws.unsubscribe(symbol, onData);
      }
    };
  }, [symbol, onData]);

  useEffect(() => {
    return () => {
      if (wsRef.current) {
        wsRef.current.disconnect();
        wsRef.current = null;
      }
    };
  }, []);
}