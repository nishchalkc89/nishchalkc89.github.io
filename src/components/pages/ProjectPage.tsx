import { Link } from 'react-router-dom';
import { ArrowUpRight, Github } from 'lucide-react';
import { Laptop } from '@/components/Laptop';
import { Breadcrumb, CtaBand, H2, PageShell } from './PageShell';
import { caseStudies, imageOf, media, projectBySlug, serviceBySlug, urls } from '@/content';
import NotFound from '@/pages/NotFound';

const ProjectPage = ({ slug }: { slug: string }) => {
  const p = projectBySlug(slug);
  if (!p) return <NotFound />;
  const m = media(p.slug);
  const service = serviceBySlug(p.service);
  const more = caseStudies.filter((x) => x.service === p.service && x.slug !== p.slug).slice(0, 3);

  return (
    <PageShell>
      <div className="wrap max-w-5xl pb-20">
        <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Projects', href: '/#work' }, { name: p.title }]} />

        <p className="eyebrow text-accent">Case study{m ? ` · ${m.kind}` : ''}</p>
        <h1 className="mt-4 text-4xl leading-[1.05] md:text-6xl text-balance">{p.title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">{p.summary}</p>

        <div className="mt-10">
          <Laptop src={imageOf(p.slug)} alt={`${p.title} website screenshot, a project built by Nishchal KC`} priority />
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="text-2xl md:text-3xl">Overview</h2>
            {p.overview.map((t) => (
              <p key={t} className="mt-4 leading-relaxed text-muted-foreground">{t}</p>
            ))}

            <H2>What it does</H2>
            <ul className="mt-5 space-y-3">
              {p.does.map((t) => (
                <li key={t} className="flex gap-3 text-muted-foreground">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full grad-bg" /> {t}
                </li>
              ))}
            </ul>

            <H2>My role</H2>
            <p className="mt-4 leading-relaxed text-muted-foreground">{p.role}</p>

            {p.note && <p className="panel mt-8 p-5 text-sm leading-relaxed">{p.note}</p>}
          </div>

          <aside className="space-y-8">
            {m && (
              <div>
                <h2 className="text-lg">Built with</h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {m.stack.map((s) => (
                    <li key={s} className="rounded-md bg-foreground/5 px-3 py-1.5 font-mono text-xs">{s}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex flex-col gap-3">
              {m?.live ? (
                <a href={m.live} target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center justify-center gap-2 rounded-full grad-bg px-6 text-sm font-semibold on-grad">
                  Visit the live site <ArrowUpRight className="h-4 w-4" />
                </a>
              ) : (
                <span className="inline-flex h-12 items-center justify-center rounded-full border border-foreground/15 px-6 text-sm text-muted-foreground">Private project</span>
              )}
              {m?.github && (
                <a href={m.github} target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-foreground/20 px-6 text-sm font-semibold hover:border-accent hover:text-accent">
                  <Github className="h-4 w-4" /> Source on GitHub
                </a>
              )}
              {service && (
                <Link to={urls.service(service.slug)} className="text-sm text-accent hover:underline">
                  Hire me for {service.name.toLowerCase()} →
                </Link>
              )}
            </div>
          </aside>
        </div>

        {more.length > 0 && (
          <>
            <H2>More work like this</H2>
            <ul className="mt-5 grid gap-4 sm:grid-cols-3">
              {more.map((x) => (
                <li key={x.slug}>
                  <Link to={urls.project(x.slug)} className="panel group block h-full overflow-hidden">
                    <img src={imageOf(x.slug)} alt={`${x.title}, a project by Nishchal KC`} width={640} height={400} loading="lazy" decoding="async" className="aspect-[16/10] w-full object-cover object-top" />
                    <p className="p-4 font-semibold group-hover:text-accent">{x.title}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}

        <CtaBand title="Want something like this?" />
      </div>
    </PageShell>
  );
};

export default ProjectPage;
