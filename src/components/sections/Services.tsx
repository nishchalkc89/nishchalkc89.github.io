import { ArrowRight, Database, Monitor, Server, type LucideIcon } from 'lucide-react';
import { ChainArt, Section } from '@/components/Chain';
import { Reveal, SectionHead } from '@/components/Reveal';
import { process, services } from '@/data/site';

const Chips = ({ items }: { items: string[] }) => (
  <ul className="flex flex-wrap gap-2">
    {items.map((it) => (
      <li key={it} className="rounded-full border border-foreground/10 bg-foreground/5 px-3.5 py-1.5 text-xs font-medium sm:text-sm">
        {it}
      </li>
    ))}
  </ul>
);

const Title = ({ n, t, d }: { n: string; t: string; d: string }) => (
  <>
    <p className="font-mono text-xs text-accent">{n}</p>
    <h3 className="mt-3 text-2xl md:text-3xl">{t}</h3>
    <p className="mt-3 max-w-md leading-relaxed text-muted-foreground">{d}</p>
  </>
);

const stackFlow: [LucideIcon, string][] = [
  [Monitor, 'Front-end'],
  [Server, 'API'],
  [Database, 'Database'],
];

export const Services = () => {
  const [chain, full, design] = services;

  return (
    <Section id="services" flip className="py-20 md:py-28">
      <SectionHead label="Services" title={<>What I can <span className="grad-text">build for you.</span></>} note="Hire me for one, or let me own the whole build." />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:gap-5">
        {/* blockchain: wide card with the animated chain */}
        <Reveal className="md:col-span-4">
          <article className="panel group relative h-full overflow-hidden p-7 md:p-9">
            <div className="relative z-10 flex flex-col md:h-full">
              <Title n="01" t={chain.title} d={chain.body} />
              <div className="mt-6"><Chips items={chain.items} /></div>
            </div>
            <ChainArt className="pointer-events-none mt-6 aspect-[740/340] h-auto w-full md:absolute md:-bottom-2 md:-right-2 md:mt-0 md:w-[60%]" />
          </article>
        </Reveal>

        {/* full-stack: front-end → API → database, linked like a chain */}
        <Reveal className="md:col-span-2" delay={0.08}>
          <article className="panel h-full p-7 md:p-8">
            <Title n="02" t={full.title} d={full.body} />
            <div className="my-7 rounded-2xl border border-foreground/10 bg-background/60 px-4 py-5">
              <div className="flex items-center">
                {stackFlow.map(([Icon, label], i) => (
                  <div key={label} className="flex flex-1 items-center last:flex-none">
                    <div className="flex flex-col items-center gap-2">
                      <span
                        className="fl-node grid h-12 w-12 place-items-center rounded-xl border border-accent/30 bg-foreground/5 text-accent"
                        style={{ animationDelay: `${i * 1.5 + (i ? 0.1 : 0)}s` }}
                      >
                        <Icon className="h-5 w-5" strokeWidth={1.7} />
                      </span>
                      <span className="font-mono text-[10px] text-muted-foreground">{label}</span>
                    </div>
                    {i < stackFlow.length - 1 && (
                      <div className="relative -mt-5 mx-2 flex-1">
                        <div className="fl-link-x" />
                        <span className="fl-packet" style={{ animationDelay: `${0.2 + i * 1.5}s` }} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <Chips items={full.items} />
          </article>
        </Reveal>

        {/* design: palette + type sample */}
        <Reveal className="md:col-span-2" delay={0.08}>
          <article className="panel h-full p-7 md:p-8">
            <Title n="03" t={design.title} d={design.body} />
            <div className="my-7 flex items-center gap-4 rounded-2xl border border-foreground/10 bg-background/60 p-4">
              <span className="font-display text-5xl font-semibold leading-none">Aa</span>
              <div className="flex gap-2">
                {['bg-primary', 'bg-accent', 'bg-[#4f8cff]', 'bg-foreground'].map((c) => (
                  <span key={c} className={`h-9 w-9 rounded-full ${c}`} />
                ))}
              </div>
            </div>
            <Chips items={design.items} />
          </article>
        </Reveal>

        {/* process: four steps joined by one animated chain */}
        <Reveal className="md:col-span-4" delay={0.12}>
          <article className="panel flex h-full flex-col justify-between gap-10 p-7 md:p-9">
            <div>
              <p className="font-mono text-xs text-accent">How we'll work</p>
              <h3 className="mt-3 text-2xl md:text-3xl">From first message to launch, in four steps.</h3>
            </div>

            <ol className="relative grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-0" style={{ ['--cycle' as string]: '6s' }}>
              {/* horizontal track (desktop) */}
              <div aria-hidden className="pointer-events-none absolute left-5 right-[calc(25%-1.25rem)] top-5 hidden md:block">
                <div className="fl-link-x" />
                <span className="fl-packet long" style={{ animationDelay: '0.2s' }} />
              </div>
              {/* vertical track (phone) */}
              <div aria-hidden className="fl-link-y pointer-events-none absolute bottom-6 left-5 top-6 -ml-px md:hidden" />

              {process.map((s, i) => (
                <li key={s.t} className="relative flex gap-4 md:block md:pr-4">
                  <span
                    className="fl-node relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full grad-bg font-display text-base font-semibold on-grad"
                    style={{ animationDelay: `${i}s` }}
                  >
                    {i + 1}
                  </span>
                  <div>
                    <h4 className="font-display text-lg font-semibold md:mt-4">{s.t}</h4>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>

            <a
              href="#contact"
              className="group inline-flex w-fit items-center gap-2 rounded-full border border-foreground/20 px-5 py-2.5 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
            >
              Start a project <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </article>
        </Reveal>
      </div>
    </Section>
  );
};
