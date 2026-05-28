"use client";

import { useState, useEffect } from "react";

const cache = new Map<string, string | null>();

async function fetchSummaryImage(marka: string, model: string, godina: number): Promise<string | null> {
  const candidates = [
    `${marka} ${model} ${godina}`,
    `${marka} ${model}`,
    `${marka} ${model.split(" ")[0]}`,
  ];

  for (const query of candidates) {
    const title = query.replace(/\s+/g, "_");
    try {
      const res = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`
      );
      if (!res.ok) continue;
      const data = await res.json();
      const url = data?.originalimage?.source ?? data?.thumbnail?.source ?? null;
      if (url) return url;
    } catch {
      continue;
    }
  }
  return null;
}

export default function useCarImage(marka: string, model: string, godina: number): string | null {
  const key = `${marka}__${model}__${godina}`;
  const [url, setUrl] = useState<string | null>(cache.has(key) ? cache.get(key)! : null);

  useEffect(() => {
    if (cache.has(key)) {
      setUrl(cache.get(key) ?? null);
      return;
    }
    fetchSummaryImage(marka, model, godina).then((img) => {
      cache.set(key, img);
      setUrl(img);
    });
  }, [key, marka, model, godina]);

  return url;
}
