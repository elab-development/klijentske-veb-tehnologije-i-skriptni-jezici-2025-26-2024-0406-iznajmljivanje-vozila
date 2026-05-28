"use client";

import { useState, useEffect } from "react";

export default function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item !== null) setValue(JSON.parse(item) as T);
    } catch {}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }, [key, value]);

  const remove = () => {
    window.localStorage.removeItem(key);
    setValue(initialValue);
  };

  return [value, setValue, remove] as const;
}
