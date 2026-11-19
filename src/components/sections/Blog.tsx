import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Section } from '@/components/Chain';
import { Reveal, SectionHead } from '@/components/Reveal';
import { articles, formatDate, urls } from '@/content';

export const Blog = () => (
  <Section id="blog" className="py-20 md:py-28">
    <SectionHead label="Blog" title={<>From the <span className="grad-text">blog.</span></>} note="Practical notes before you build, buy or hire." />
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
      {articles.slice(0, 3).map((a, i) => (
        <li key={a.slug}>
          <Reveal delay={i * 0.06} className="h-full">
            <Link to={urls.article(a.slug)} className="panel group flex h-full flex-col p-7">
              <p className="font-mono text-xs text-muted-foreground">{formatDate(a.date)} · {a.minutes} min read</p>
              <h3 className="mt-3 text-xl leading-snug group-hover:text-accent md:text-2xl">{a.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{a.metaDescription}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">Read article <ArrowRight className="h-4 w-4" /></span>
            </Link>
          </Reveal>
        </li>
      ))}
    </ul>
    <Link to={urls.blog} className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline">
      All articles <ArrowRight className="h-4 w-4" />
    </Link>
  </Section>
);
