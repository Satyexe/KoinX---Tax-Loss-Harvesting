interface HeaderProps {
  title?: string;
}

export function Header({ title = 'Tax Loss Harvesting' }: HeaderProps) {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
          K
        </div>
        <h1 className="text-lg font-semibold text-gray-900 sm:text-xl">{title}</h1>
      </div>
    </header>
  );
}
