"use client";

import { useState } from "react";

type MediaItem = {
  id: string;
  title: string;
  url: string;
  thumbnail_url: string | null;
  kind: "video" | "image";
};

/**
 * Minimal grid + modal lightbox for video/image deliverables — deliberately
 * dependency-free (a native <dialog>-style overlay) rather than pulling in
 * a gallery library for something this small.
 */
export function Lightbox({ items }: { items: MediaItem[] }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const open = items.find((item) => item.id === openId) ?? null;

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setOpenId(item.id)}
            className="group relative aspect-square overflow-hidden rounded-lg border border-white/10 bg-white/5"
          >
            {item.kind === "image" ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.thumbnail_url ?? item.url}
                alt={item.title}
                className="h-full w-full object-cover transition group-hover:scale-105"
              />
            ) : (
              <video
                src={item.url}
                muted
                className="h-full w-full object-cover"
              />
            )}
            <span className="absolute inset-x-0 bottom-0 truncate bg-black/60 px-2 py-1 text-left text-xs text-white/80">
              {item.title}
            </span>
          </button>
        ))}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6"
          onClick={() => setOpenId(null)}
        >
          <div
            className="max-h-[85vh] max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            {open.kind === "image" ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={open.url}
                alt={open.title}
                className="max-h-[85vh] max-w-full rounded-lg object-contain"
              />
            ) : (
              <video
                src={open.url}
                controls
                autoPlay
                className="max-h-[85vh] max-w-full rounded-lg"
              />
            )}
            <button
              onClick={() => setOpenId(null)}
              className="mt-4 rounded-full border border-white/20 px-4 py-2 text-xs text-white/70 hover:border-white/50"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
