import { ArrowUpRight, Github } from 'lucide-react';
import { Laptop } from '@/components/Laptop';
import { Section } from '@/components/Chain';
import { Reveal, SectionHead } from '@/components/Reveal';
import { projects, type Project } from '@/data/site';

const Row = ({ p, i }: { p: Project; i: number }) => {
  const flip = i % 2 === 1;
  return (
    <Reveal>
      <article className="group grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-14">
        <div className={`lg:col-span-6 ${flip ? 'lg:order-2' : ''}`}>
          <Laptop src={p.image ?? `/img/cover-${p.cover}.svg`} alt={`${p.title} website screenshot, a project built by Nishchal KC`} />
        </div>

        <div className={`lg:col-span-6 ${flip ? 'lg:order-1' : ''}`}>
          <p className="font-mono text-sm text-accent">
            {String(i + 1).padStart(2, '0')} <span className="text-muted-foreground">/ {p.kind}</span>
          </p>
          <h3 className="mt-3 text-4xl leading-[1.05] md:text-5xl lg:text-5xl">{p.title}</h3>
          {p.highlight && (
            <span className="mt-4 inline-block rounded-full border border-accent/50 px-3.5 py-1 text-xs font-semibold text-accent">{p.highlight}</span>
          )}
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground md:text-xl md:leading-relaxed">{p.blurb}</p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {p.stack.map((s) => (
              <li key={s} className="rounded-md bg-foreground/5 px-3 py-1.5 font-mono text-xs text-foreground/80">
                {s}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex items-center gap-3">
            {p.live ? (
              <a href={p.live} target="_blank" rel="noopener noreferrer" className="group/btn inline-flex h-12 items-center gap-2 rounded-full grad-bg px-6 text-sm font-semibold on-grad transition-transform hover:scale-[1.04]">
                Visit site <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
              </a>
            ) : (
              <span className="inline-flex h-12 items-center rounded-full border border-foreground/15 px-6 text-sm text-muted-foreground">Private project</span>
            )}
            {p.github && (
              <a href={p.github} target="_blank" rel="noopener noreferrer" aria-label={`${p.title} source on GitHub`} className="grid grid-cols-1 h-12 w-12 place-items-center rounded-full border border-foreground/15 transition-colors hover:border-accent hover:text-accent">
                <Github className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
};

export const Work = () => (
  <Section id="work" className="py-20 md:py-28">
    <SectionHead
      label="Projects"
      title={<>20+ projects delivered. <span className="grad-text">Here are the highlights.</span></>}
      note="Blockchain systems, full-stack products and websites for real businesses."
    />
    <div>
      {projects.map((p, i) => (
        <div key={p.title} className={i > 0 ? "mt-20 md:mt-28" : ""}>
                    <Row p={p} i={i} />
        </div>
      ))}
    </div>
  </Section>
);
