"use client";

import { useState, useMemo } from "react";
import useCarImage from "@/hooks/useCarImage";
import useCarImages from "@/hooks/useCarImages";

interface ImageGalleryProps {
  marka: string;
  model: string;
  godina: number;
}

export default function ImageGallery({ marka, model, godina }: ImageGalleryProps) {
  const [selected, setSelected] = useState(0);
  const first = useCarImage(marka, model, godina);
  const rest = useCarImages(marka, model, godina);
  const images = useMemo(() => {
    const extras = rest.filter((u) => u !== first).slice(0, 2);
    return first ? [first, ...extras] : rest.slice(0, 3);
  }, [first, rest]);

  const placeholder = `https://placehold.co/800x400/1a2233/4a7fc1?text=${encodeURIComponent(marka + " " + model)}`;
  const mainSrc = images[selected] ?? placeholder;

  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-xl overflow-hidden bg-[#111827]">
        <img src={mainSrc} alt={`${marka} ${model}`} className="w-full h-96 object-cover" />
      </div>

      {images.length > 1 && (
        <div className="flex gap-3">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`rounded-lg overflow-hidden border-2 transition-colors cursor-pointer ${
                selected === i ? "border-blue-500" : "border-white/10 hover:border-white/30"
              }`}
            >
              <img src={src} alt="" className="w-24 h-16 object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
