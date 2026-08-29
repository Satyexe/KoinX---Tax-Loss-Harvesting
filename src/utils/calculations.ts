import type { CapitalGains, ComputedGains, Holding } from '../types';

export function computeGains(capitalGains: CapitalGains): ComputedGains {
  const stcgNet = capitalGains.stcg.profits - capitalGains.stcg.losses;
  const ltcgNet = capitalGains.ltcg.profits - capitalGains.ltcg.losses;

  return {
    stcgNet,
    ltcgNet,
    realised: stcgNet + ltcgNet,
  };
}

function applyGainToBucket(gain: number, profits: number, losses: number) {
  if (gain > 0) {
    return { profits: profits + gain, losses };
  }

  if (gain < 0) {
    return { profits, losses: losses + Math.abs(gain) };
  }

  return { profits, losses };
}

export function computeAfterHarvestingGains(
  baseGains: CapitalGains,
  selectedHoldings: Holding[],
): CapitalGains {
  let { profits: stcgProfits, losses: stcgLosses } = baseGains.stcg;
  let { profits: ltcgProfits, losses: ltcgLosses } = baseGains.ltcg;

  for (const holding of selectedHoldings) {
    const stcgResult = applyGainToBucket(holding.stcg.gain, stcgProfits, stcgLosses);
    stcgProfits = stcgResult.profits;
    stcgLosses = stcgResult.losses;

    const ltcgResult = applyGainToBucket(holding.ltcg.gain, ltcgProfits, ltcgLosses);
    ltcgProfits = ltcgResult.profits;
    ltcgLosses = ltcgResult.losses;
  }

  return {
    stcg: { profits: stcgProfits, losses: stcgLosses },
    ltcg: { profits: ltcgProfits, losses: ltcgLosses },
  };
}

export function calculateTaxSavings(preRealised: number, postRealised: number): number {
  if (preRealised <= postRealised) {
    return 0;
  }

  return preRealised - postRealised;
}
