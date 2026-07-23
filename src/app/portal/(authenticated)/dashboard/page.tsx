import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export const metadata = { title: 'Dashboard' }

export default async function DashboardPage() {
  const supabase = createClient()

  // No manual organization_id filter here — RLS already scopes this query
  // to the signed-in user's organization (or all orgs, if they're an admin).
  const { data: projects, error } = await supabase
    .from('projects')
    .select('id, name, description, status, created_at')
    .order('created_at', { ascending: false })

  return (
    <div>
      <p className="text-xs uppercase tracking-widest2 text-signal">Projects</p>
      <h1 className="mt-3 text-3xl font-medium text-mist-100">Your deliverables</h1>

      {error && (
        <p className="mt-8 text-sm text-red-400">Could not load projects. Please refresh.</p>
      )}

      {!error && projects?.length === 0 && (
        <p className="mt-8 text-sm text-mist-400">
          No projects yet. Once work begins, it will appear here.
        </p>
      )}

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects?.map((project) => (
          <Link
            key={project.id}
            href={`/portal/projects/${project.id}`}
            className="group rounded-xl border border-ink-700 bg-ink-900 p-6 transition-colors hover:border-signal-dim"
          >
            <span
              className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] uppercase tracking-widest2 ${
                project.status === 'active'
                  ? 'bg-signal/15 text-signal'
                  : 'bg-ink-700 text-mist-400'
              }`}
            >
              {project.status}
            </span>
            <h2 className="mt-4 text-lg font-medium text-mist-100 group-hover:text-signal">
              {project.name}
            </h2>
            {project.description && (
              <p className="mt-2 line-clamp-2 text-sm text-mist-400">{project.description}</p>
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}
