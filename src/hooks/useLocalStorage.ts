"use client";

import { useState, useEffect, useCallback } from "react";

export default function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item !== null) setValue(JSON.parse(item) as T);
    } catch {}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const set = useCallback((newValue: T) => {
    setValue(newValue);
    try {
      window.localStorage.setItem(key, JSON.stringify(newValue));
    } catch {}
  }, [key]);

  const remove = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
    } catch {}
    setValue(initialValue);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return [value, set, remove] as const;
}
