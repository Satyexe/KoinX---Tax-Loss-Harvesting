export interface GainBucket {
  balance: number;
  gain: number;
}

export interface Holding {
  id: string;
  coin: string;
  coinName: string;
  logo: string;
  currentPrice: number;
  totalHolding: number;
  averageBuyPrice: number;
  stcg: GainBucket;
  ltcg: GainBucket;
}

export interface CapitalGainsBucket {
  profits: number;
  losses: number;
}

export interface CapitalGains {
  stcg: CapitalGainsBucket;
  ltcg: CapitalGainsBucket;
}

export interface CapitalGainsResponse {
  capitalGains: CapitalGains;
}

export interface ComputedGains {
  stcgNet: number;
  ltcgNet: number;
  realised: number;
}
