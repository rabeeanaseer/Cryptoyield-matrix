/**
 * Converts a slug or raw DB name into a readable label.
 * "aave-v3" → "Aave V3"  |  "op mainnet" → "Op Mainnet"  |  "bsc" → "BSC"
 */
const ACRONYMS = new Set(["bsc", "eth", "btc", "sol", "avax", "bnb", "usdc", "usdt", "dai"]);

export function formatSlug(slug: string): string {
  return slug
    .split(/[-\s]+/)
    .map((word) => {
      if (ACRONYMS.has(word.toLowerCase())) return word.toUpperCase();
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

export function formatNumber(value: number, decimals: number = 2): string {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function formatCurrency(value: number, decimals: number = 2): string {
  if (value >= 1_000_000_000) {
    return `$${formatNumber(value / 1_000_000_000, decimals)}B`;
  }
  if (value >= 1_000_000) {
    return `$${formatNumber(value / 1_000_000, decimals)}M`;
  }
  if (value >= 1_000) {
    return `$${formatNumber(value / 1_000, decimals)}K`;
  }
  return `$${formatNumber(value, decimals)}`;
}

export function formatPercent(value: number, decimals: number = 2): string {
  return `${formatNumber(value, decimals)}%`;
}

export function formatBasisPoints(value: number): string {
  return `${formatNumber(value * 100, 0)} bps`;
}
