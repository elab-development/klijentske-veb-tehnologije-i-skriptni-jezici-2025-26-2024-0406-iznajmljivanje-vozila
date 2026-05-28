"use client";

import { useState, useEffect } from "react";

const cache = new Map<string, string[]>();

const EXCLUDE = /(icon|logo|flag|map|diagram|badge|emblem|signature|coat|seal|blank|silhouette|symbol|button|arrow|picto)/i;

async function fetchImages(marka: string, model: string, godina: number): Promise<string[]> {
  const candidates = [
    `${marka} ${model} ${godina}`,
    `${marka} ${model}`,
  ];

  for (const query of candidates) {
    const title = query.replace(/\s+/g, "_");
    try {
      // iiurlwidth=800 → Wikimedia returns pre-scaled 800px thumbnails (fast, sharp)
      const res = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&generator=images&titles=${encodeURIComponent(title)}&prop=imageinfo&iiprop=url|dimensions|thumburl&iiurlwidth=800&format=json&origin=*&gimlimit=40`
      );
      if (!res.ok) continue;
      const data = await res.json();

      const pages = Object.values(data?.query?.pages ?? {}) as {
        title: string;
        imageinfo?: { url: string; thumburl?: string; width: number; height: number }[];
      }[];

      const images = pages
        .filter((p) => p.imageinfo?.[0])
        .map((p) => {
          const info = p.imageinfo![0];
          return {
            // prefer pre-scaled thumburl, fall back to original
            displayUrl: info.thumburl ?? info.url,
            width: info.width ?? 0,
            title: p.title ?? "",
          };
        })
        .filter(
          (img) =>
            /\.(jpg|jpeg|png)/i.test(img.displayUrl) &&
            img.width >= 600 &&
            !EXCLUDE.test(img.title)
        )
        .sort((a, b) => b.width - a.width)
        .slice(0, 3)
        .map((img) => img.displayUrl);

      if (images.length > 0) return images;
    } catch {
      continue;
    }
  }
  return [];
}

export default function useCarImages(marka: string, model: string, godina: number): string[] {
  const key = `${marka}__${model}__${godina}`;
  const [images, setImages] = useState<string[]>(cache.get(key) ?? []);

  useEffect(() => {
    if (cache.has(key)) {
      setImages(cache.get(key)!);
      return;
    }
    fetchImages(marka, model, godina).then((imgs) => {
      cache.set(key, imgs);
      setImages(imgs);
    });
  }, [key, marka, model, godina]);

  return images;
}
