import type { DetailedHTMLProps, HTMLAttributes } from 'react'

// <model-viewer> is a custom element (from @google/model-viewer, loaded via
// <Script> at runtime) — this declares it for TSX/JSX so it type-checks like
// any other intrinsic element instead of needing @ts-expect-error scattered
// through components that use it.
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string
        alt?: string
        'camera-controls'?: boolean
        'auto-rotate'?: boolean
        'shadow-intensity'?: string
        exposure?: string
      }
    }
  }
}

export {}
