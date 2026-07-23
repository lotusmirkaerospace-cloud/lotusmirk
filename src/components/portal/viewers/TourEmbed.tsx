/**
 * Generic embed for 360° tour providers (Matterport, Kuula, etc.). The
 * allowed frame sources are locked down in next.config.js's CSP
 * (frame-src) — add a provider there before it will actually render.
 */
export function TourEmbed({ src, title }: { src: string; title: string }) {
  return (
    <div className="aspect-video w-full overflow-hidden rounded-xl border border-ink-700 bg-ink-900">
      <iframe
        src={src}
        title={title}
        className="h-full w-full"
        allow="xr-spatial-tracking; gyroscope; accelerometer; fullscreen"
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  )
}
