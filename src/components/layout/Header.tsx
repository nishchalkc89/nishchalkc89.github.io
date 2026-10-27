import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

export const navLinks = [
  { name: 'Home', href: '#top' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#work' },
  { name: 'Services', href: '#services' },
  { name: 'Education', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

export const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-foreground/5 bg-background/75 backdrop-blur-xl">
      <div className="wrap flex h-16 items-center justify-between gap-4">
        <a href="#top" className="flex items-center" aria-label="Nishchal KC, home">
          <img src="/logo.png" alt="NK" className="h-9 w-auto" />
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground">
              {l.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            className="grid grid-cols-1 h-10 w-10 place-items-center rounded-full border border-border md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="wrap pb-4 md:hidden" aria-label="Mobile">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block border-t border-border py-4 font-display text-xl">
              {l.name}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};
