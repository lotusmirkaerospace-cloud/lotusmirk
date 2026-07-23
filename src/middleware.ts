import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

/**
 * Gates /portal routes behind Supabase auth (subdomain + path-based).
 * Subdomain routing: portal.lotusmirk.com/* → /portal/*
 * Path routing: lotusmirk.com/portal/* → /portal/*
 * RLS on database is the real security boundary.
 */
export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request: { headers: request.headers } })

  // Detect subdomain and rewrite paths
  const host = request.headers.get('host') || ''
  const isPortalSubdomain = host.startsWith('portal.')
  let pathname = request.nextUrl.pathname

  // Rewrite portal subdomain requests to /portal routes
  if (isPortalSubdomain) {
    if (pathname === '/') {
      pathname = '/portal'
    } else if (!pathname.startsWith('/portal')) {
      pathname = `/portal${pathname}`
    }
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          response = NextResponse.next({ request: { headers: request.headers } })
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          response = NextResponse.next({ request: { headers: request.headers } })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const isPortalRoute = pathname.startsWith('/portal') && pathname !== '/portal/login'

  if (isPortalRoute && !user) {
    const redirectUrl = new URL('/portal/login', request.url)
    redirectUrl.searchParams.set('next', pathname)
    return NextResponse.redirect(redirectUrl)
  }

  if (pathname === '/portal/login' && user) {
    return NextResponse.redirect(new URL('/portal/dashboard', request.url))
  }

  // Rewrite if pathname changed due to subdomain routing
  if (pathname !== request.nextUrl.pathname) {
    request.nextUrl.pathname = pathname
    return NextResponse.rewrite(request.nextUrl)
  }

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
