import { ObjViewer } from './viewers/ObjViewer'
import { VideoEmbed } from './viewers/VideoEmbed'
import { TourEmbed } from './viewers/TourEmbed'
import { FileLink } from './viewers/FileLink'
import type { DeliverableType } from '@/lib/supabase/database.types'

export type ResolvedDeliverable = {
  id: string
  title: string
  type: string
  description: string | null
  url: string | null
}

export function DeliverableViewer({ deliverable }: { deliverable: ResolvedDeliverable }) {
  if (!deliverable.url) {
    return (
      <div className="rounded-xl border border-ink-700 bg-ink-900 p-6 text-sm text-mist-400">
        {deliverable.title} — file unavailable.
      </div>
    )
  }

  const type = deliverable.type as DeliverableType

  switch (type) {
    case 'obj':
      return <ObjViewer src={deliverable.url} title={deliverable.title} />
    case 'video':
      return <VideoEmbed src={deliverable.url} title={deliverable.title} />
    case 'tour_360':
      return <TourEmbed src={deliverable.url} title={deliverable.title} />
    case 'image':
      // eslint-disable-next-line @next/next/no-img-element
      return (
        <img
          src={deliverable.url}
          alt={deliverable.title}
          className="w-full rounded-xl border border-ink-700 object-cover"
        />
      )
    case 'geospatial':
    case 'document':
    default:
      return <FileLink src={deliverable.url} title={deliverable.title} type={deliverable.type} />
  }
}
