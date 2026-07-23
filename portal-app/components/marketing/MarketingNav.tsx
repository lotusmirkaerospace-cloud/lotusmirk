import Link from "next/link";

const LINKS = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function MarketingNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 backdrop-blur-sm sm:px-10">
      <Link
        href="/"
        className="text-sm font-semibold uppercase tracking-[0.2em] text-white"
      >
        LotusMirk Aerospace
      </Link>
      <nav className="hidden items-center gap-8 text-sm text-white/70 sm:flex">
        {LINKS.map((link) => (
          <Link key={link.href} href={link.href} className="hover:text-white">
            {link.label}
          </Link>
        ))}
      </nav>
      <Link
        href="/portal"
        className="rounded-full border border-white/20 px-4 py-2 text-xs font-medium uppercase tracking-wide text-white hover:border-white/50"
      >
        Client Portal
      </Link>
    </header>
  );
}
