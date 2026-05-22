export const formatUsd = (value: number | string) => {
  const n = typeof value === "string" ? Number(value) : value;
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const formatCents = (price: number) => `${Math.round(price * 100)}¢`;
