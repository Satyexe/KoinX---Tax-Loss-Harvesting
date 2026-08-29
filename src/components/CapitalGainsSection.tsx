import { useHarvesting } from '../context/HarvestingContext';
import { CapitalGainsCard } from './CapitalGainsCard';

export function CapitalGainsSection() {
  const { preHarvestGains, afterHarvestGains, preComputed, afterComputed, taxSavings } =
    useHarvesting();

  if (!preHarvestGains || !afterHarvestGains || !preComputed || !afterComputed) {
    return null;
  }

  return (
    <section className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
      <CapitalGainsCard
        title="Pre-Harvesting"
        variant="pre"
        gains={preHarvestGains}
        computed={preComputed}
      />
      <CapitalGainsCard
        title="After Harvesting"
        variant="post"
        gains={afterHarvestGains}
        computed={afterComputed}
        taxSavings={taxSavings}
      />
    </section>
  );
}
