import { z } from 'zod';

const envSchema = z.object({
  alphaVantage: z.object({
    apiKey: z.string(),
    baseUrl: z.string().url()
  }),
  alpaca: z.object({
    apiKeyId: z.string(),
    apiSecretKey: z.string(),
    dataUrl: z.string().url(),
    paperTradingUrl: z.string().url(),
    wsDataUrl: z.string(),
    paper: z.boolean()
  }),
  supabase: z.object({
    url: z.string().url(),
    anonKey: z.string()
  })
});

export const config = {
  alphaVantage: {
    apiKey: 'KZCMVSOBKLFKO5XB',
    baseUrl: 'https://www.alphavantage.co/query'
  },
  alpaca: {
    apiKeyId: 'PKPBLWY3HS8MP0IHS315',
    apiSecretKey: 'R0fcMFccQkH0Ef5gMbueLWV2AOUyPf91jT8exvsB',
    dataUrl: 'https://data.alpaca.markets',
    paperTradingUrl: 'https://paper-api.alpaca.markets',
    wsDataUrl: 'wss://stream.data.alpaca.markets/v2/iex',
    paper: true
  },
  supabase: {
    url: 'https://lvmreurdyeuucrjunbvm.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2bXJldXJkeWV1dWNyanVuYnZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzNDU0MzMsImV4cCI6MjA0ODkyMTQzM30.x6o_ShbTqSzAqlZHvUKscLTdKh_ssCTAUDgepiw9MYQ'
  }
} as const;

// Validate config
envSchema.parse(config);

export type Config = typeof config;