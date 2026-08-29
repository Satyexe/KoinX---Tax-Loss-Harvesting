import type { Holding } from '../types';
import { formatCurrency, formatGain, formatNumber } from '../utils/formatters';

interface HoldingRowProps {
  holding: Holding;
  isSelected: boolean;
  onToggle: (id: string) => void;
}

export function HoldingRow({ holding, isSelected, onToggle }: HoldingRowProps) {
  return (
    <tr
      className={`border-b border-gray-100 transition-colors ${
        isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'
      }`}
    >
      <td className="px-3 py-4 sm:px-4">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggle(holding.id)}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          aria-label={`Select ${holding.coin}`}
        />
      </td>
      <td className="px-3 py-4 sm:px-4">
        <div className="flex items-center gap-3">
          <img
            src={holding.logo}
            alt={holding.coin}
            className="h-8 w-8 rounded-full bg-gray-100 object-cover"
            onError={(event) => {
              event.currentTarget.src =
                'https://koinx-statics.s3.ap-south-1.amazonaws.com/currencies/DefaultCoin.svg';
            }}
          />
          <div className="min-w-0">
            <p className="truncate font-medium text-gray-900">{holding.coin}</p>
            <p className="truncate text-xs text-gray-500">{holding.coinName}</p>
          </div>
        </div>
      </td>
      <td className="hidden px-3 py-4 sm:table-cell sm:px-4">
        <p className="font-medium text-gray-900">{formatNumber(holding.totalHolding)}</p>
        <p className="text-xs text-gray-500">Avg: {formatCurrency(holding.averageBuyPrice)}</p>
      </td>
      <td className="px-3 py-4 sm:px-4">
        <p className="font-medium text-gray-900">{formatCurrency(holding.currentPrice)}</p>
      </td>
      <td className="hidden px-3 py-4 md:table-cell md:px-4">
        <p className={`font-medium ${holding.stcg.gain >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {formatGain(holding.stcg.gain)}
        </p>
        <p className="text-xs text-gray-500">Bal: {formatNumber(holding.stcg.balance)}</p>
      </td>
      <td className="hidden px-3 py-4 lg:table-cell lg:px-4">
        <p className={`font-medium ${holding.ltcg.gain >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {formatGain(holding.ltcg.gain)}
        </p>
        <p className="text-xs text-gray-500">Bal: {formatNumber(holding.ltcg.balance)}</p>
      </td>
      <td className="px-3 py-4 sm:px-4">
        <p className="font-medium text-gray-900">
          {isSelected ? formatNumber(holding.totalHolding) : '—'}
        </p>
      </td>
    </tr>
  );
}
