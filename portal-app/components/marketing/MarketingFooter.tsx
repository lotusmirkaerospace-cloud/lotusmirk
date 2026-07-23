import Link from "next/link";

export function MarketingFooter() {
  return (
    <footer className="border-t border-white/10 px-6 py-10 text-sm text-white/50 sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <span>
          © {new Date().getFullYear()} Lotusmirk Ventures (OPC) Private
          Limited
        </span>
        <div className="flex gap-6">
          <Link href="/services" className="hover:text-white/80">
            Services
          </Link>
          <Link href="/about" className="hover:text-white/80">
            About
          </Link>
          <Link href="/contact" className="hover:text-white/80">
            Contact
          </Link>
          <Link href="/portal" className="hover:text-white/80">
            Client / Vendor Portal
          </Link>
        </div>
      </div>
    </footer>
  );
}
