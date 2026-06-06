"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";

export type Currency = "EUR" | "USD" | "CHF" | "RSD";

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  format: (eurAmount: number) => string;
  loading: boolean;
}

const CurrencyContext = createContext<CurrencyContextType | null>(null);

const FALLBACK_RATES: Record<Currency, number> = {
  EUR: 1,
  USD: 1.08,
  CHF: 0.95,
  RSD: 117,
};

function formatAmount(amount: number, currency: Currency): string {
  const rounded = Math.round(amount);
  if (currency === "EUR") return `€${rounded}`;
  if (currency === "USD") return `$${rounded}`;
  if (currency === "CHF") return `CHF ${rounded}`;
  if (currency === "RSD") return `${rounded.toLocaleString("de-DE")} RSD`;
  return `${rounded}`;
}

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>("EUR");
  const [rates, setRates] = useState<Record<Currency, number>>(FALLBACK_RATES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.frankfurter.app/latest?from=EUR&to=USD,CHF,RSD")
      .then((r) => {
        if (!r.ok) throw new Error("API error");
        return r.json();
      })
      .then((data) => {
        const { USD, CHF, RSD } = data?.rates ?? {};
        if (!USD || !CHF || !RSD) throw new Error("Missing rates");
        setRates({ EUR: 1, USD, CHF, RSD });
      })
      .catch(() => setRates(FALLBACK_RATES))
      .finally(() => setLoading(false));
  }, []);

  const format = useCallback(
    (eurAmount: number) => formatAmount(eurAmount * rates[currency], currency),
    [currency, rates],
  );

  return (
    <CurrencyContext.Provider
      value={{ currency, setCurrency, format, loading }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency(): CurrencyContextType {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
}
