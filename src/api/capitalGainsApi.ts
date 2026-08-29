import { CAPITAL_GAINS_DATA } from './mockData';
import type { CapitalGainsResponse } from '../types';

const API_DELAY_MS = 800;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchCapitalGains(): Promise<CapitalGainsResponse> {
  await delay(API_DELAY_MS);
  return structuredClone(CAPITAL_GAINS_DATA);
}
