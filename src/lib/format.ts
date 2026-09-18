export function formatINR(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function progressPercent(raised: number, goal: number | null) {
  if (!goal || goal <= 0) return null;
  return Math.min(100, Math.round((raised / goal) * 100));
}
