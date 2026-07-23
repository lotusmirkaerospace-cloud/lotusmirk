import { redirect } from 'next/navigation'

// Bare /portal has nothing to show — send authenticated visitors to the
// dashboard and let the middleware bounce anyone unauthenticated to login.
export default function PortalIndexPage() {
  redirect('/portal/dashboard')
}
