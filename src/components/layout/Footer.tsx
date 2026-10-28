import { useState } from 'react';
import { Facebook, Github, Instagram, Linkedin, Loader2, Mail, Send, Twitter } from 'lucide-react';
import { siTiktok } from 'simple-icons';
import { toast } from 'sonner';
import { projects, services, site } from '@/data/site';

// TikTok has no icon in the icon set used for the others, so it is drawn from its own logo path
const TikTok = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d={siTiktok.path} />
  </svg>
);

const socials = [
  { icon: Github, href: site.github, label: 'GitHub' },
  { icon: Linkedin, href: site.linkedin, label: 'LinkedIn' },
  { icon: Twitter, href: site.x, label: 'X' },
  { icon: Instagram, href: site.instagram, label: 'Instagram' },
  { icon: Facebook, href: site.facebook, label: 'Facebook' },
  { icon: TikTok, href: site.tiktok, label: 'TikTok' },
  { icon: Mail, href: `mailto:${site.email}`, label: 'Email' },
];

const columns: { title: string; links: { name: string; href: string; external?: boolean }[] }[] = [
  {
    title: 'About me',
    links: [
      { name: 'Home', href: '#top' },
      { name: 'About', href: '#about' },
      { name: 'Projects', href: '#work' },
      { name: 'Toolbox', href: '#stack' },
      { name: 'Education', href: '#experience' },
      { name: 'Contact', href: '#contact' },
    ],
  },
  {
    title: 'Services',
    links: [
      ...services.map((s) => ({ name: s.title, href: '#services' })),
      { name: 'Smart contracts', href: '#services' },
      { name: 'Landing pages', href: '#services' },
      { name: 'Start a project', href: '#contact' },
    ],
  },
  {
    title: 'Recent work',
    links: projects
      .filter((p) => p.live)
      .slice(0, 6)
      .map((p) => ({ name: p.title, href: p.live as string, external: true })),
  },
  {
    title: 'Connect',
    links: [
      { name: 'Email me', href: `mailto:${site.email}` },
      { name: 'LinkedIn', href: site.linkedin, external: true },
      { name: 'GitHub', href: site.github, external: true },
      { name: 'X (Twitter)', href: site.x, external: true },
      { name: 'Instagram', href: site.instagram, external: true },
      { name: 'Facebook', href: site.facebook, external: true },
      { name: 'TikTok', href: site.tiktok, external: true },
      { name: `${site.location} · ${site.timeLabel}`, href: '#contact' },
    ],
  },
];

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    try {
      const body = new URLSearchParams({ 'form-name': 'footer-contact', email }).toString();
      const res = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body });
      if (!res.ok) throw new Error(String(res.status));
      toast.success("Thanks! I'll get in touch soon.");
      setEmail('');
    } catch {
      toast.error(`Couldn't send that. Please email me at ${site.email}`);
    } finally {
      setSending(false);
    }
  };

  return (
    <footer className="relative border-t border-foreground/10 bg-card/80 backdrop-blur">
      <div className="wrap py-14 md:py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          {/* brand, email box, socials */}
          <div className="lg:col-span-4">
            <a href="#top" aria-label="Nishchal KC, home" className="inline-block">
              <img src="/logo.png" alt="Nishchal KC logo" className="h-14 w-auto" />
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Blockchain and full-stack projects for growing businesses. Have an idea? Be part of my client family!
            </p>

            <form onSubmit={submit} className="mt-6 flex max-w-xs items-center gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                aria-label="Your email address"
                className="h-12 w-full rounded-md border border-foreground/15 bg-background/60 px-4 text-sm placeholder:text-muted-foreground/70 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
              <button
                type="submit"
                disabled={sending}
                aria-label="Send my email"
                className="grid h-12 w-12 shrink-0 place-items-center rounded-md grad-bg on-grad transition-transform hover:scale-105 disabled:opacity-60"
              >
                {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </button>
            </form>

            <ul className="mt-7 flex flex-wrap gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    aria-label={label}
                    className="grid h-10 w-10 place-items-center rounded-full bg-foreground/10 transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* link columns */}
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:col-span-8">
            {columns.map((c) => (
              <div key={c.title}>
                <p className="text-sm font-semibold text-muted-foreground">{c.title}</p>
                <ul className="mt-4 space-y-2.5">
                  {c.links.map((l) => (
                    <li key={l.name}>
                      <a
                        href={l.href}
                        target={l.external ? '_blank' : undefined}
                        rel={l.external ? 'noopener noreferrer' : undefined}
                        className="text-[13px] leading-snug text-foreground/85 transition-colors hover:text-accent"
                      >
                        {l.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </div>

      <div className="border-t border-foreground/10">
        <p className="wrap py-5 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} {site.name}. Designed and built by me in {site.location}.
        </p>
      </div>
    </footer>
  );
};
