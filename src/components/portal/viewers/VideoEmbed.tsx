function getYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
  ]
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  return null
}

/**
 * youtube-nocookie.com embed — YouTube's privacy-enhanced mode, avoids
 * setting tracking cookies until the visitor actually presses play.
 */
export function VideoEmbed({ src, title }: { src: string; title: string }) {
  const videoId = getYouTubeId(src)

  if (!videoId) {
    return (
      <div className="rounded-xl border border-ink-700 bg-ink-900 p-6 text-sm text-mist-400">
        Unrecognized video URL.
      </div>
    )
  }

  return (
    <div className="aspect-video w-full overflow-hidden rounded-xl border border-ink-700 bg-ink-900">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}`}
        title={title}
        className="h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  )
}
