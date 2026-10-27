import { Section } from '@/components/Chain';
import { Reveal, SectionHead } from '@/components/Reveal';
import { TechIcon } from '@/components/TechIcon';
import { stack } from '@/data/site';

export const Stack = () => (
  <Section id="stack" className="py-20 md:py-28">
    <SectionHead label="Toolbox" title={<>Tools I <span className="grad-text">work with.</span></>} note="The languages, frameworks and platforms I use to ship." />

    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
      {stack.map((g, i) => (
        <Reveal key={g.group} delay={(i % 2) * 0.08} className={i === 1 ? 'md:row-span-1' : ''}>
          <div className="panel h-full p-6 md:p-8">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl md:text-2xl">{g.group}</h3>
              <span className="font-mono text-xs text-muted-foreground">{String(g.items.length).padStart(2, '0')} tools</span>
            </div>
            <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4">
              {g.items.map((it) => (
                <li
                  key={it}
                  className="group flex aspect-square flex-col items-center justify-center gap-2.5 rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-2 text-center transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:bg-accent/5"
                >
                  <TechIcon name={it} className="h-9 w-9 text-foreground transition-transform duration-300 group-hover:scale-110" />
                  <span className="text-[11px] font-medium leading-tight text-muted-foreground transition-colors group-hover:text-foreground">{it}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </div>
  </Section>
);
