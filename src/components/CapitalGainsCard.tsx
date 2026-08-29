import type { CapitalGains, ComputedGains } from '../types';
import { formatCurrency } from '../utils/formatters';

interface CapitalGainsCardProps {
  title: string;
  variant: 'pre' | 'post';
  gains: CapitalGains;
  computed: ComputedGains;
  taxSavings?: number;
}

function GainRow({
  label,
  profits,
  losses,
  net,
}: {
  label: string;
  profits: number;
  losses: number;
  net: number;
}) {
  return (
    <div className="space-y-2">
      <h3 className="text-xs font-medium uppercase tracking-wide opacity-80">{label}</h3>
      <div className="grid grid-cols-3 gap-2 text-sm sm:gap-4">
        <div>
          <p className="text-xs opacity-70">Profits</p>
          <p className="font-semibold text-green-300">{formatCurrency(profits)}</p>
        </div>
        <div>
          <p className="text-xs opacity-70">Losses</p>
          <p className="font-semibold text-red-300">{formatCurrency(losses)}</p>
        </div>
        <div>
          <p className="text-xs opacity-70">Net</p>
          <p className={`font-semibold ${net >= 0 ? 'text-green-300' : 'text-red-300'}`}>
            {formatCurrency(net)}
          </p>
        </div>
      </div>
    </div>
  );
}

export function CapitalGainsCard({
  title,
  variant,
  gains,
  computed,
  taxSavings = 0,
}: CapitalGainsCardProps) {
  const isPre = variant === 'pre';

  return (
    <div
      className={`flex flex-col rounded-2xl p-5 text-white shadow-lg sm:p-6 ${
        isPre ? 'bg-[#1c2333]' : 'bg-gradient-to-br from-blue-600 to-blue-700'
      }`}
    >
      <h2 className="mb-5 text-base font-semibold sm:text-lg">{title}</h2>

      <div className="space-y-5">
        <GainRow
          label="Short-Term"
          profits={gains.stcg.profits}
          losses={gains.stcg.losses}
          net={computed.stcgNet}
        />
        <GainRow
          label="Long-Term"
          profits={gains.ltcg.profits}
          losses={gains.ltcg.losses}
          net={computed.ltcgNet}
        />
      </div>

      <div className="mt-6 border-t border-white/20 pt-4">
        <p className="text-xs opacity-70">Realised Capital Gains</p>
        <p
          className={`text-xl font-bold sm:text-2xl ${
            computed.realised >= 0 ? 'text-white' : 'text-red-200'
          }`}
        >
          {formatCurrency(computed.realised)}
        </p>
      </div>

      {!isPre && taxSavings > 0 && (
        <div className="mt-4 rounded-lg bg-white/15 px-4 py-3 text-sm font-medium">
          You&apos;re going to save {formatCurrency(taxSavings)}
        </div>
      )}
    </div>
  );
}
