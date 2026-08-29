import { CapitalGainsSection } from './components/CapitalGainsSection';
import { ErrorMessage } from './components/ErrorMessage';
import { Header } from './components/Header';
import { HoldingsTable } from './components/HoldingsTable';
import { Loader } from './components/Loader';
import { HarvestingProvider, useHarvesting } from './context/HarvestingContext';

function TaxLossHarvestingContent() {
  const { isLoading, error, retry } = useHarvesting();

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        {isLoading && <Loader />}
        {!isLoading && error && <ErrorMessage message={error} onRetry={retry} />}
        {!isLoading && !error && (
          <>
            <CapitalGainsSection />
            <HoldingsTable />
          </>
        )}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <HarvestingProvider>
      <TaxLossHarvestingContent />
    </HarvestingProvider>
  );
}
