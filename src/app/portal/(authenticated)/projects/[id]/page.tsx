import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { DeliverableViewer, type ResolvedDeliverable } from '@/components/portal/DeliverableViewer'

const SIGNED_URL_TTL_SECONDS = 60 * 60 // 1 hour

export default async function ProjectPage({ params }: { params: { id: string } }) {
  const supabase = createClient()

  // RLS scopes this to the caller's organization automatically — a client
  // requesting a project ID outside their org gets zero rows back, which we
  // treat identically to "not found" rather than leaking existence.
  const { data: project } = await supabase
    .from('projects')
    .select('id, name, description, status')
    .eq('id', params.id)
    .single()

  if (!project) {
    notFound()
  }

  const { data: deliverables } = await supabase
    .from('deliverables')
    .select('id, title, type, description, storage_path, external_url')
    .eq('project_id', project.id)
    .order('created_at', { ascending: true })

  const resolved: ResolvedDeliverable[] = await Promise.all(
    (deliverables ?? []).map(async (d) => {
      if (d.external_url) {
        return { id: d.id, title: d.title, type: d.type, description: d.description, url: d.external_url }
      }
      if (d.storage_path) {
        const { data: signed } = await supabase.storage
          .from('deliverables')
          .createSignedUrl(d.storage_path, SIGNED_URL_TTL_SECONDS)
        return { id: d.id, title: d.title, type: d.type, description: d.description, url: signed?.signedUrl ?? null }
      }
      return { id: d.id, title: d.title, type: d.type, description: d.description, url: null }
    })
  )

  return (
    <div>
      <span
        className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] uppercase tracking-widest2 ${
          project.status === 'active' ? 'bg-signal/15 text-signal' : 'bg-ink-700 text-mist-400'
        }`}
      >
        {project.status}
      </span>
      <h1 className="mt-3 text-3xl font-medium text-mist-100">{project.name}</h1>
      {project.description && <p className="mt-3 max-w-2xl text-mist-400">{project.description}</p>}

      <div className="mt-12 space-y-10">
        {resolved.length === 0 && (
          <p className="text-sm text-mist-400">No deliverables uploaded for this project yet.</p>
        )}
        {resolved.map((d) => (
          <div key={d.id}>
            <h2 className="text-sm font-medium text-mist-100">{d.title}</h2>
            {d.description && <p className="mt-1 text-sm text-mist-400">{d.description}</p>}
            <div className="mt-3">
              <DeliverableViewer deliverable={d} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
