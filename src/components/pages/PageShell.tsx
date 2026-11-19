import { Link } from 'react-router-dom';
import { ArrowRight, Mail } from 'lucide-react';
import type { ReactNode } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { site } from '@/data/site';

export const PageShell = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen overflow-x-clip bg-background text-foreground">
    <Header />
    <main className="pt-28 md:pt-32">{children}</main>
    <Footer />
  </div>
);

export const Breadcrumb = ({ items }: { items: { name: string; href?: string }[] }) => (
  <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground">
    <ol className="flex flex-wrap items-center gap-2">
      {items.map((it, i) => (
        <li key={it.name} className="flex items-center gap-2">
          {it.href ? (
            it.href.startsWith('/#') ? (
              <a href={it.href} className="hover:text-accent">{it.name}</a>
            ) : (
              <Link to={it.href} className="hover:text-accent">{it.name}</Link>
            )
          ) : (
            <span aria-current="page" className="text-foreground/80">{it.name}</span>
          )}
          {i < items.length - 1 && <span aria-hidden>/</span>}
        </li>
      ))}
    </ol>
  </nav>
);

export const CtaBand = ({ title = 'Have a project in mind?', text = 'Tell me what you need and I will reply with a scoped plan and an estimate.' }: { title?: string; text?: string }) => (
  <section className="panel mt-16 flex flex-col items-start gap-6 p-8 md:flex-row md:items-center md:justify-between md:p-10">
    <div>
      <h2 className="text-2xl md:text-3xl">{title}</h2>
      <p className="mt-2 max-w-xl text-muted-foreground">{text}</p>
    </div>
    <div className="flex flex-wrap gap-3">
      <a href="/#contact" className="inline-flex h-12 items-center gap-2 rounded-full grad-bg px-6 text-sm font-semibold on-grad">
        Start a project <ArrowRight className="h-4 w-4" />
      </a>
      <a href={`mailto:${site.email}`} className="inline-flex h-12 items-center gap-2 rounded-full border border-foreground/20 px-6 text-sm font-semibold hover:border-accent hover:text-accent">
        <Mail className="h-4 w-4" /> Email me
      </a>
    </div>
  </section>
);

export const H2 = ({ children }: { children: ReactNode }) => <h2 className="mt-14 text-2xl md:text-3xl">{children}</h2>;
