'use client'

import Script from 'next/script'

/**
 * Renders a .obj/.glb model via Google's <model-viewer> web component,
 * loaded from unpkg (allow-listed in next.config.js's CSP script-src).
 * No npm dependency required — the component just needs the custom
 * element defined once per page. See src/types/model-viewer.d.ts for the
 * JSX type declaration.
 */
export function ObjViewer({ src, title }: { src: string; title: string }) {
  return (
    <>
      <Script
        type="module"
        src="https://unpkg.com/@google/model-viewer@3.5.0/dist/model-viewer.min.js"
        strategy="lazyOnload"
      />
      <model-viewer
        src={src}
        alt={title}
        camera-controls
        auto-rotate
        shadow-intensity="1"
        exposure="1"
        style={{ width: '100%', height: '480px', backgroundColor: '#0a0e14', borderRadius: '0.75rem' }}
      />
    </>
  )
}
