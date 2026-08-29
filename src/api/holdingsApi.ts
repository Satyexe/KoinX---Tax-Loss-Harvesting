import { HOLDINGS_DATA } from './mockData';
import type { Holding } from '../types';

const API_DELAY_MS = 1000;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function sortHoldings(holdings: Holding[]): Holding[] {
  return [...holdings].sort((a, b) => {
    const totalGainA = Math.abs(a.stcg.gain) + Math.abs(a.ltcg.gain);
    const totalGainB = Math.abs(b.stcg.gain) + Math.abs(b.ltcg.gain);
    return totalGainB - totalGainA;
  });
}

export async function fetchHoldings(): Promise<Holding[]> {
  await delay(API_DELAY_MS);
  return sortHoldings(structuredClone(HOLDINGS_DATA));
}
