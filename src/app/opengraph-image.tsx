import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Lotusmirk Aerospace — Aerial Intelligence, Engineered'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Generated server-side at request time from JSX — no external photo/logo
// asset required, so there's nothing to fabricate and nothing to keep in
// sync with the brand later. This is what renders when the site is shared
// on LinkedIn/Slack/email instead of a blank card.
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '90px',
          background: '#05070a',
          backgroundImage:
            'radial-gradient(circle at 50% 0%, rgba(79,209,255,0.28), transparent 60%)',
        }}
      >
        <div
          style={{
            fontSize: 24,
            letterSpacing: 6,
            color: '#4fd1ff',
            textTransform: 'uppercase',
          }}
        >
          Lotusmirk Aerospace
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 64,
            color: '#f4f6f8',
            marginTop: 28,
            fontWeight: 600,
            lineHeight: 1.15,
            maxWidth: 900,
          }}
        >
          Aerial intelligence, engineered to survey standard.
        </div>
        <div style={{ fontSize: 26, color: '#94a3b3', marginTop: 36 }}>Mumbai, India</div>
      </div>
    ),
    { ...size }
  )
}
