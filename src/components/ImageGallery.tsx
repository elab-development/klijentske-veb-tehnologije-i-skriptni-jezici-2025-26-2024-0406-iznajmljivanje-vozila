"use client";

import { useState } from "react";

interface ImageGalleryProps {
  slike: string[];
  marka: string;
  model: string;
}

export default function ImageGallery({ slike, marka, model }: ImageGalleryProps) {
  const thumbnails = slike;
  const [selected, setSelected] = useState(0);

  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-xl overflow-hidden bg-[#111827]">
        <img
          src={thumbnails[selected]}
          alt={`${marka} ${model}`}
          className="w-full h-64 object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              `https://placehold.co/800x400/1a2233/4a7fc1?text=${encodeURIComponent(marka + " " + model)}`;
          }}
        />
      </div>

      <div className="flex gap-3">
        {thumbnails.map((src, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={`rounded-lg overflow-hidden border-2 transition-colors cursor-pointer ${
              selected === i ? "border-blue-500" : "border-white/10 hover:border-white/30"
            }`}
          >
            <img
              src={src}
              alt=""
              className="w-24 h-16 object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  `https://placehold.co/200x130/1a2233/4a7fc1?text=${encodeURIComponent(marka)}`;
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
