import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { TechIcon } from '@/components/TechIcon';
import { Breadcrumb, CtaBand, H2, PageShell } from './PageShell';
import { articles, services, formatDate, imageOf, projectBySlug, serviceBySlug, urls } from '@/content';
import NotFound from '@/pages/NotFound';

const ServicePage = ({ slug }: { slug: string }) => {
  const s = serviceBySlug(slug);
  if (!s) return <NotFound />;
  const related = s.related.map(projectBySlug).filter(Boolean);
  const posts = articles.filter((a) => a.service === s.slug);
  const others = services.map((x) => x.slug).filter((x) => x !== s.slug);

  return (
    <PageShell>
      <div className="wrap max-w-4xl pb-20">
        <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Services', href: '/#services' }, { name: s.name }]} />

        <p className="eyebrow text-accent">Service</p>
        <h1 className="mt-4 text-4xl leading-[1.05] md:text-6xl text-balance">{s.h1}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">{s.lead}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="/#contact" className="inline-flex h-12 items-center rounded-full grad-bg px-6 text-sm font-semibold on-grad">Start a project</a>
          <a href="#faq" className="inline-flex h-12 items-center rounded-full border border-foreground/20 px-6 text-sm font-semibold hover:border-accent hover:text-accent">Read the FAQ</a>
        </div>

        <H2>Who this is for</H2>
        <ul className="mt-5 space-y-3">
          {s.forWho.map((t) => (
            <li key={t} className="flex gap-3 text-muted-foreground"><Check className="mt-1 h-4 w-4 shrink-0 text-accent" /> {t}</li>
          ))}
        </ul>

        <H2>What you get</H2>
        <ul className="mt-5 grid gap-3 md:grid-cols-2">
          {s.deliverables.map((t) => (
            <li key={t} className="panel p-5 text-sm leading-relaxed">{t}</li>
          ))}
        </ul>

        <H2>How we work together</H2>
        <ol className="mt-5 grid gap-4 md:grid-cols-2">
          {s.process.map((p, i) => (
            <li key={p.t} className="panel p-6">
              <p className="font-mono text-xs text-accent">Step {i + 1}</p>
              <h3 className="mt-2 text-xl">{p.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.d}</p>
            </li>
          ))}
        </ol>

        <H2>Tools I use</H2>
        <ul className="mt-5 flex flex-wrap gap-3">
          {s.tools.map((t) => (
            <li key={t} className="flex items-center gap-2 rounded-full border border-foreground/10 bg-foreground/5 px-4 py-2 text-sm">
              <TechIcon name={t} className="h-5 w-5" /> {t}
            </li>
          ))}
        </ul>

        <H2>Related work</H2>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2">
          {related.map((p) => (
            <li key={p!.slug}>
              <Link to={urls.project(p!.slug)} className="panel group block h-full overflow-hidden">
                <img
                  src={imageOf(p!.slug)}
                  alt={`${p!.title}, a project by Nishchal KC`}
                  width={640} height={400} loading="lazy" decoding="async"
                  className="aspect-[16/10] w-full object-cover object-top"
                />
                <div className="p-5">
                  <h3 className="text-lg group-hover:text-accent">{p!.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p!.summary}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <section id="faq" className="scroll-mt-28">
          <H2>Frequently asked questions</H2>
          <div className="mt-5 divide-y divide-foreground/10 rounded-2xl border border-foreground/10">
            {s.faq.map((f) => (
              <details key={f.q} className="group p-5">
                <summary className="cursor-pointer list-none text-lg font-semibold marker:hidden">{f.q}</summary>
                <p className="mt-3 leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {posts.length > 0 && (
          <>
            <H2>Articles on this topic</H2>
            <ul className="mt-5 space-y-3">
              {posts.map((a) => (
                <li key={a.slug}>
                  <Link to={urls.article(a.slug)} className="block rounded-xl border border-foreground/10 p-5 hover:border-accent">
                    <span className="font-semibold">{a.title}</span>
                    <span className="mt-1 block text-sm text-muted-foreground">{formatDate(a.date)} · {a.minutes} min read</span>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}

        <H2>Other services</H2>
        <ul className="mt-5 flex flex-wrap gap-3">
          {others.map((o) => (
            <li key={o}>
              <Link to={urls.service(o)} className="inline-block rounded-full border border-foreground/15 px-5 py-2.5 text-sm hover:border-accent hover:text-accent">
                {serviceBySlug(o)?.name}
              </Link>
            </li>
          ))}
        </ul>

        <CtaBand />
      </div>
    </PageShell>
  );
};

export default ServicePage;
