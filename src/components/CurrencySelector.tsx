"use client";

import { useCurrency, Currency } from "@/context/CurrencyContext";

const CURRENCIES: Currency[] = ["EUR", "USD", "CHF", "RSD"];

export default function CurrencySelector() {
  const { currency, setCurrency, loading } = useCurrency();

  return (
    <select
      value={currency}
      onChange={(e) => setCurrency(e.target.value as Currency)}
      disabled={loading}
      className="bg-[#1a2233] border border-white/10 text-white text-xs rounded-md px-2 py-1.5 focus:outline-none focus:border-blue-500 cursor-pointer disabled:opacity-50"
    >
      {CURRENCIES.map((c) => (
        <option key={c} value={c}>{c}</option>
      ))}
    </select>
  );
}
