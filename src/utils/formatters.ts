const INR_FORMATTER = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const NUMBER_FORMATTER = new Intl.NumberFormat('en-IN', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 8,
});

export function formatCurrency(value: number): string {
  return INR_FORMATTER.format(value);
}

export function formatNumber(value: number): string {
  if (value === 0) return '0';
  if (Math.abs(value) < 0.0001) {
    return value.toExponential(2);
  }
  return NUMBER_FORMATTER.format(value);
}

export function formatGain(value: number): string {
  const formatted = formatCurrency(Math.abs(value));
  if (value > 0) return `+${formatted}`;
  if (value < 0) return `-${formatted}`;
  return formatCurrency(0);
}
