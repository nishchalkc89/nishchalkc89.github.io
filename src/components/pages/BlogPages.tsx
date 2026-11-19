import { Link } from 'react-router-dom';
import { Breadcrumb, CtaBand, H2, PageShell } from './PageShell';
import { articleBySlug, articles, formatDate, serviceBySlug, urls } from '@/content';
import NotFound from '@/pages/NotFound';

export const BlogIndex = () => (
  <PageShell>
    <div className="wrap max-w-4xl pb-20">
      <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Blog' }]} />
      <p className="eyebrow text-accent">Blog</p>
      <h1 className="mt-4 text-4xl leading-[1.05] md:text-6xl text-balance">Notes on blockchain and web development</h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
        Practical articles for people who are about to build, buy or hire. Written by Nishchal KC, a freelance blockchain and full-stack developer from Nepal.
      </p>
      <ul className="mt-12 space-y-5">
        {articles.map((a) => (
          <li key={a.slug}>
            <Link to={urls.article(a.slug)} className="panel group block p-6 md:p-8">
              <p className="font-mono text-xs text-muted-foreground">{formatDate(a.date)} · {a.minutes} min read</p>
              <h2 className="mt-2 text-2xl group-hover:text-accent md:text-3xl">{a.title}</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">{a.metaDescription}</p>
            </Link>
          </li>
        ))}
      </ul>
      <CtaBand />
    </div>
  </PageShell>
);

export const BlogPost = ({ slug }: { slug: string }) => {
  const a = articleBySlug(slug);
  if (!a) return <NotFound />;
  const service = serviceBySlug(a.service);
  const more = articles.filter((x) => x.slug !== a.slug).slice(0, 3);

  return (
    <PageShell>
      <article className="wrap max-w-3xl pb-20">
        <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Blog', href: urls.blog }, { name: a.title }]} />
        <h1 className="text-4xl leading-[1.1] md:text-5xl text-balance">{a.title}</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          By <a href="/" className="text-foreground hover:text-accent">Nishchal KC</a> · <time dateTime={a.date}>{formatDate(a.date)}</time> · {a.minutes} min read
        </p>
        <p className="mt-8 text-lg leading-relaxed md:text-xl md:leading-relaxed">{a.intro}</p>

        {a.blocks.map((b, i) => {
          if (b.h2) return <H2 key={i}>{b.h2}</H2>;
          if (b.p) return <p key={i} className="mt-5 leading-relaxed text-foreground/85">{b.p}</p>;
          if (b.ul) return (
            <ul key={i} className="mt-5 list-disc space-y-2 pl-6 leading-relaxed text-foreground/85">
              {b.ul.map((t) => <li key={t}>{t}</li>)}
            </ul>
          );
          if (b.ol) return (
            <ol key={i} className="mt-5 list-decimal space-y-2 pl-6 leading-relaxed text-foreground/85">
              {b.ol.map((t) => <li key={t}>{t}</li>)}
            </ol>
          );
          return null;
        })}

        {service && (
          <p className="panel mt-12 p-6 leading-relaxed">
            Need help with this? See my{' '}
            <Link to={urls.service(service.slug)} className="font-semibold text-accent hover:underline">{service.name.toLowerCase()} service</Link>{' '}
            or <a href="/#contact" className="font-semibold text-accent hover:underline">send me a message</a>.
          </p>
        )}

        <H2>Keep reading</H2>
        <ul className="mt-5 space-y-3">
          {more.map((x) => (
            <li key={x.slug}>
              <Link to={urls.article(x.slug)} className="block rounded-xl border border-foreground/10 p-4 hover:border-accent">{x.title}</Link>
            </li>
          ))}
        </ul>

        <CtaBand />
      </article>
    </PageShell>
  );
};
