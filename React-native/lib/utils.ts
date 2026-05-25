export const formatCurrency = (
  amount: number,
  currency: string = "USD"
): string => {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch (error) {
    return `$${amount.toFixed(2)}`;
  }
};
