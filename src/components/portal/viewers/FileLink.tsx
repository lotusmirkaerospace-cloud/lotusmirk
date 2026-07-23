/**
 * Fallback for geospatial rasters, documents, and plain images: a signed,
 * time-limited download link rather than an inline viewer. Formats like
 * .ecw have no native browser renderer — pretending otherwise would be
 * worse than a clean download link. (Tiled web rendering for geospatial
 * layers is a separate pipeline, not a client-side viewer problem.)
 */
export function FileLink({ src, title, type }: { src: string; title: string; type: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-ink-700 bg-ink-900 p-6">
      <div>
        <p className="text-sm font-medium text-mist-100">{title}</p>
        <p className="mt-1 text-xs uppercase tracking-widest2 text-mist-400">{type}</p>
      </div>
      <a
        href={src}
        download
        className="rounded-full border border-ink-600 px-5 py-2 text-xs font-medium text-mist-100 transition-colors hover:border-signal hover:text-signal"
      >
        Download
      </a>
    </div>
  )
}
