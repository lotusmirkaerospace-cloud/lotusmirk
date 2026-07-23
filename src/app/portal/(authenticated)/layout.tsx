import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { signOut } from '@/app/actions/auth'
import { SITE_NAME } from '@/lib/site-data'

/**
 * Chrome for every authenticated portal route. The middleware already
 * redirects unauthenticated requests before they get here, but this layout
 * re-checks — defense in depth, and it's also where we fetch the profile
 * used to render the org name in the header.
 */
export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/portal/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, role, organization_id, organizations(name)')
    .eq('id', user.id)
    .single()

  const orgName = (profile?.organizations as { name?: string } | null)?.name

  return (
    <div className="min-h-screen bg-ink-950 pt-24">
      <header className="fixed inset-x-0 top-0 z-40 border-b border-ink-700 bg-ink-950/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <div>
            <Link href="/portal/dashboard" className="text-sm uppercase tracking-widest2 text-mist-100">
              {SITE_NAME} Portal
            </Link>
            {orgName && <p className="mt-0.5 text-xs text-mist-400">{orgName}</p>}
          </div>
          <form action={signOut}>
            <button
              type="submit"
              className="text-xs uppercase tracking-widest2 text-mist-300 transition-colors hover:text-signal"
            >
              Sign out
            </button>
          </form>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-16 lg:px-10">{children}</main>
    </div>
  )
}
