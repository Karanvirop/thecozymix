import { Link } from "@tanstack/react-router";
import { ReactNode } from "react";
import { CartNavButton } from "@/components/CartNavButton";

const nav = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/ingredients", label: "Ingredients" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col gradient-charcoal">
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/70 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          <Link to="/" className="font-serif text-2xl text-gold tracking-wide">
            Cozy<span className="italic">Mix</span>
          </Link>
          <nav className="hidden md:flex items-center gap-10">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="tracking-luxury text-muted-foreground hover:text-gold transition-colors"
                activeProps={{ className: "tracking-luxury text-gold" }}
                activeOptions={{ exact: true }}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <CartNavButton />
        </div>
      </header>
      <main className="flex-1 pt-20">{children}</main>
      <footer className="border-t border-border mt-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 flex flex-col md:flex-row justify-between gap-6">
          <div>
            <div className="font-serif text-xl text-gold">CozyMix</div>
            <p className="text-xs text-muted-foreground mt-2 tracking-wider">
              Crafted in small batches. For hair that remembers softness.
            </p>
          </div>
          <div className="flex gap-8 tracking-luxury text-muted-foreground">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} className="hover:text-gold transition-colors">
                {n.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="text-center text-xs text-muted-foreground/60 pb-6 tracking-widest">
          © {new Date().getFullYear()} COZYMIX · ALL RIGHTS RESERVED
        </div>
      </footer>
    </div>
  );
}
