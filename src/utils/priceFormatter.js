// utils/priceFormatter.js

export function formatPrice(amountKSH, currency) {
  const rates = {
    KSH: 1,
    USD: 0.007,  // Approximate conversion rate: 1 KSH = 0.007 USD
    GBP: 0.0055, // Approximate conversion rate: 1 KSH = 0.0055 GBP
    EUR: 0.006,  // Approximate conversion rate: 1 KSH = 0.006 EUR
  };

  const symbols = {
    KSH: "KSH",
    USD: "$",
    GBP: "£",
    EUR: "€",
  };

  const rate = rates[currency] || 1;
  const symbol = symbols[currency] || "KSH";
  const convertedAmount = amountKSH * rate;

  return `${symbol}${convertedAmount.toFixed(2)}`;
}
