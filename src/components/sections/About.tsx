import { Section } from '@/components/Chain';
import { Reveal } from '@/components/Reveal';
import { site } from '@/data/site';

const facts = [
  ['Based in', site.location],
  ['Degree', 'B.Tech CSE, completed'],
  ['Focus', 'Blockchain & full-stack'],
  ['Also', 'UI / web design'],
];

export const About = () => (
  <Section id="about" className="py-20 md:py-32">
    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
      <Reveal className="lg:col-span-5">
        <div className="relative mx-auto max-w-md">
          <div aria-hidden className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-primary/40 via-transparent to-accent/40 blur-2xl" />
          <div className="panel relative overflow-hidden p-2">
            <img
              src="/nishchal-kc-blockchain-developer-nepal.jpg"
              alt="Nishchal KC, blockchain and full-stack developer from Nepal, in his graduation gown"
              loading="lazy"
              className="aspect-[4/5] w-full rounded-[1.1rem] object-cover object-top"
            />
          </div>
          <div className="panel absolute -bottom-5 right-4 flex items-center gap-3 px-4 py-3 md:-right-6">
            <span className="pulse-dot h-2.5 w-2.5 rounded-full bg-accent" />
            <span className="text-sm font-medium">Available for freelance</span>
          </div>
        </div>
      </Reveal>

      <div className="lg:col-span-7">
        <Reveal>
          <p className="eyebrow flex items-center gap-3 text-accent">
            <span className="h-px w-8 grad-bg" />
            About me
          </p>
          <h2 className="mt-5 text-3xl leading-[1.1] md:text-5xl text-balance">
            I build secure, well-designed products for the <span className="grad-text">on-chain and web world.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-7 space-y-5 leading-relaxed text-muted-foreground">
          <p>
            I'm Nishchal, a developer from Nepal. I studied computer science at Sharda University in India, where blockchain
            and cybersecurity became my main focus, and I've now finished my degree and work as a freelancer.
          </p>
          <p>
            I've built voting and examination systems on Ethereum, a phishing-detection tool, a campus marketplace, a print
            service for Nepal and websites for real businesses. Sometimes I'm the developer, sometimes the designer, often both,
            so one person owns the whole thing.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-9 grid grid-cols-2 gap-3 md:grid-cols-4">
          {facts.map(([a, b]) => (
            <div key={a} className="rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-4">
              <p className="eyebrow text-muted-foreground">{a}</p>
              <p className="mt-2 text-sm font-semibold leading-snug">{b}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </div>
  </Section>
);
