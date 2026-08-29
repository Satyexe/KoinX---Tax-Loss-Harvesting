import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { fetchCapitalGains } from '../api/capitalGainsApi';
import { fetchHoldings } from '../api/holdingsApi';
import type { CapitalGains, Holding } from '../types';
import {
  calculateTaxSavings,
  computeAfterHarvestingGains,
  computeGains,
} from '../utils/calculations';

interface HarvestingContextValue {
  holdings: Holding[];
  baseCapitalGains: CapitalGains | null;
  selectedIds: Set<string>;
  isLoading: boolean;
  error: string | null;
  preHarvestGains: CapitalGains | null;
  afterHarvestGains: CapitalGains | null;
  preComputed: ReturnType<typeof computeGains> | null;
  afterComputed: ReturnType<typeof computeGains> | null;
  taxSavings: number;
  toggleSelection: (id: string) => void;
  toggleSelectAll: (visibleIds: string[]) => void;
  isAllSelected: (visibleIds: string[]) => boolean;
  isIndeterminate: (visibleIds: string[]) => boolean;
  retry: () => void;
}

const HarvestingContext = createContext<HarvestingContextValue | null>(null);

export function HarvestingProvider({ children }: { children: ReactNode }) {
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [baseCapitalGains, setBaseCapitalGains] = useState<CapitalGains | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [capitalGainsResponse, holdingsData] = await Promise.all([
        fetchCapitalGains(),
        fetchHoldings(),
      ]);

      setBaseCapitalGains(capitalGainsResponse.capitalGains);
      setHoldings(holdingsData);
      setSelectedIds(new Set());
    } catch {
      setError('Failed to load data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  const selectedHoldings = useMemo(
    () => holdings.filter((holding) => selectedIds.has(holding.id)),
    [holdings, selectedIds],
  );

  const preHarvestGains = baseCapitalGains;
  const afterHarvestGains = useMemo(() => {
    if (!baseCapitalGains) return null;
    return computeAfterHarvestingGains(baseCapitalGains, selectedHoldings);
  }, [baseCapitalGains, selectedHoldings]);

  const preComputed = useMemo(
    () => (preHarvestGains ? computeGains(preHarvestGains) : null),
    [preHarvestGains],
  );

  const afterComputed = useMemo(
    () => (afterHarvestGains ? computeGains(afterHarvestGains) : null),
    [afterHarvestGains],
  );

  const taxSavings = useMemo(() => {
    if (!preComputed || !afterComputed) return 0;
    return calculateTaxSavings(preComputed.realised, afterComputed.realised);
  }, [preComputed, afterComputed]);

  const toggleSelection = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const toggleSelectAll = useCallback((visibleIds: string[]) => {
    setSelectedIds((prev) => {
      const allSelected = visibleIds.every((id) => prev.has(id));
      const next = new Set(prev);

      if (allSelected) {
        visibleIds.forEach((id) => next.delete(id));
      } else {
        visibleIds.forEach((id) => next.add(id));
      }

      return next;
    });
  }, []);

  const isAllSelected = useCallback(
    (visibleIds: string[]) =>
      visibleIds.length > 0 && visibleIds.every((id) => selectedIds.has(id)),
    [selectedIds],
  );

  const isIndeterminate = useCallback(
    (visibleIds: string[]) => {
      const selectedCount = visibleIds.filter((id) => selectedIds.has(id)).length;
      return selectedCount > 0 && selectedCount < visibleIds.length;
    },
    [selectedIds],
  );

  const value = useMemo<HarvestingContextValue>(
    () => ({
      holdings,
      baseCapitalGains,
      selectedIds,
      isLoading,
      error,
      preHarvestGains,
      afterHarvestGains,
      preComputed,
      afterComputed,
      taxSavings,
      toggleSelection,
      toggleSelectAll,
      isAllSelected,
      isIndeterminate,
      retry: loadData,
    }),
    [
      holdings,
      baseCapitalGains,
      selectedIds,
      isLoading,
      error,
      preHarvestGains,
      afterHarvestGains,
      preComputed,
      afterComputed,
      taxSavings,
      toggleSelection,
      toggleSelectAll,
      isAllSelected,
      isIndeterminate,
      loadData,
    ],
  );

  return (
    <HarvestingContext.Provider value={value}>{children}</HarvestingContext.Provider>
  );
}

export function useHarvesting(): HarvestingContextValue {
  const context = useContext(HarvestingContext);
  if (!context) {
    throw new Error('useHarvesting must be used within HarvestingProvider');
  }
  return context;
}
