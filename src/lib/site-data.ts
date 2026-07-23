// Single source of truth for marketing copy that repeats across the site
// (nav, footer, capability grid). Keeping it here instead of scattered
// across components means updates happen in one place.

export const SITE_NAME = 'Lotusmirk Aerospace'

// Public registration details for the operating entity. Only the identifiers
// that are meant to be disclosed publicly live here — CIN is required on
// official communications under s.12(3)(c) of the Companies Act, and GSTIN
// is standard practice for B2B trust/invoicing. PAN and the director's DIN
// are deliberately excluded: those identify Gaurav personally rather than
// the business, and don't belong on a public marketing site.
export const LEGAL_NAME = 'Lotusmirk Ventures (OPC) Private Limited'
export const CIN = 'U74999MH2021OPC361385'
export const GSTIN = '27AAECL6323J1ZE'

export const NAV_LINKS = [
  { href: '/services', label: 'Capabilities' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/portal/login', label: 'Client Portal' },
] as const

export type Capability = {
  title: string
  summary: string
  detail: string
}

export const CAPABILITIES: Capability[] = [
  {
    title: 'Drone Surveying & Mapping',
    summary: 'Precision aerial survey for terrain, infrastructure, and land assets.',
    detail:
      'High-resolution orthomosaics, elevation models, and volumetric measurement flown to survey-grade accuracy.',
  },
  {
    title: 'Ground Control & Geospatial Data',
    summary: 'GCP networks and geospatial acquisition that ground every deliverable in real coordinates.',
    detail:
      'RTK/PPK ground control, coordinate referencing, and raw geospatial capture built for downstream GIS work.',
  },
  {
    title: 'GIS, Digitisation & Technical Drawings',
    summary: 'Raw capture turned into usable, structured spatial data and drawings.',
    detail: 'Vectorisation, CAD-ready outputs, and GIS layers derived directly from aerial capture.',
  },
  {
    title: 'Surveillance & Monitoring',
    summary: 'Persistent aerial oversight for sites that need to be watched, not just visited.',
    detail: 'Scheduled and on-demand monitoring flights with structured reporting over time.',
  },
  {
    title: 'Aerial Inspection',
    summary: 'Close-range inspection of structures and assets without the scaffolding.',
    detail: 'Detailed imagery and thermal/visual inspection passes for infrastructure and industrial assets.',
  },
  {
    title: 'Cinematography & FPV Capture',
    summary: 'Cinematic aerial footage and FPV flight for brand and production work.',
    detail: 'Broadcast-grade aerial cinematography, including immersive FPV sequences.',
  },
  {
    title: '360° Virtual Experiences',
    summary: 'Fully navigable virtual tours of sites, builds, and spaces.',
    detail: 'Interactive 360° capture for real estate, construction progress, and site documentation.',
  },
  {
    title: 'AI-Enabled Websites & Applications',
    summary: 'The software layer that turns raw capture into a usable product.',
    detail: 'Web platforms, client portals, and applied AI systems built around your operational data.',
  },
  {
    title: 'Drone Training & Operational Readiness',
    summary: 'Building in-house drone capability, not just outsourcing it.',
    detail: 'Structured training programs to bring drone operations in-house, safely and compliantly.',
  },
]
