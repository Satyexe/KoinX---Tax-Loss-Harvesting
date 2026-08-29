import { useMemo, useState } from 'react';
import { useHarvesting } from '../context/HarvestingContext';
import { HoldingRow } from './HoldingRow';

const DEFAULT_VISIBLE_COUNT = 8;

export function HoldingsTable() {
  const {
    holdings,
    selectedIds,
    toggleSelection,
    toggleSelectAll,
    isAllSelected,
    isIndeterminate,
  } = useHarvesting();

  const [showAll, setShowAll] = useState(false);

  const visibleHoldings = useMemo(
    () => (showAll ? holdings : holdings.slice(0, DEFAULT_VISIBLE_COUNT)),
    [holdings, showAll],
  );

  const visibleIds = useMemo(
    () => visibleHoldings.map((holding) => holding.id),
    [visibleHoldings],
  );

  const allSelected = isAllSelected(visibleIds);
  const indeterminate = isIndeterminate(visibleIds);

  return (
    <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="flex flex-col gap-2 border-b border-gray-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Holdings</h2>
          <p className="text-sm text-gray-500">
            Select assets to simulate tax loss harvesting
          </p>
        </div>
        <p className="text-sm text-gray-500">
          {selectedIds.size} of {holdings.length} selected
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
            <tr>
              <th className="px-3 py-3 sm:px-4">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={(element) => {
                    if (element) element.indeterminate = indeterminate;
                  }}
                  onChange={() => toggleSelectAll(visibleIds)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  aria-label="Select all visible holdings"
                />
              </th>
              <th className="px-3 py-3 sm:px-4">Asset</th>
              <th className="hidden px-3 py-3 sm:table-cell sm:px-4">Holdings / Avg Buy</th>
              <th className="px-3 py-3 sm:px-4">Current Price</th>
              <th className="hidden px-3 py-3 md:table-cell md:px-4">Short-Term Gain</th>
              <th className="hidden px-3 py-3 lg:table-cell lg:px-4">Long-Term Gain</th>
              <th className="px-3 py-3 sm:px-4">Amount to Sell</th>
            </tr>
          </thead>
          <tbody>
            {visibleHoldings.map((holding) => (
              <HoldingRow
                key={holding.id}
                holding={holding}
                isSelected={selectedIds.has(holding.id)}
                onToggle={toggleSelection}
              />
            ))}
          </tbody>
        </table>
      </div>

      {holdings.length > DEFAULT_VISIBLE_COUNT && (
        <div className="border-t border-gray-200 px-4 py-3 text-center sm:px-6">
          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            className="text-sm font-medium text-blue-600 transition hover:text-blue-700"
          >
            {showAll ? 'Show Less' : `View All (${holdings.length} assets)`}
          </button>
        </div>
      )}
    </section>
  );
}
