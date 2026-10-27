import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Briefcase, GraduationCap, type LucideIcon } from 'lucide-react';
import { Section } from '@/components/Chain';
import { Reveal, SectionHead } from '@/components/Reveal';
import { education, work } from '@/data/site';

type Item = (typeof work)[number];

const ease = [0.22, 1, 0.36, 1] as const;

const Column = ({ title, icon: Icon, items, from }: { title: string; icon: LucideIcon; items: Item[]; from: -1 | 1 }) => {
  const ref = useRef<HTMLOListElement>(null);
  // the line fills as the column scrolls through the screen
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 55%'] });
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 28 });
  const head = useTransform(progress, [0, 1], ['0%', '100%']);

  return (
    <div className="panel h-full p-6 md:p-8">
      <motion.div
        className="flex items-center gap-3"
        initial={{ opacity: 0, x: from * -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease }}
      >
        <span className="grid grid-cols-1 h-11 w-11 place-items-center rounded-xl grad-bg on-grad">
          <Icon className="h-5 w-5" />
        </span>
        <h3 className="text-2xl">{title}</h3>
      </motion.div>

      <ol ref={ref} className="relative ml-1 mt-8 space-y-9 pl-7">
        <span aria-hidden className="absolute bottom-0 left-0 top-1 w-px bg-foreground/15" />
        <motion.span
          aria-hidden
          className="absolute bottom-0 left-0 top-1 w-px origin-top bg-gradient-to-b from-primary to-accent"
          style={{ scaleY: progress }}
        />
        <motion.span
          aria-hidden
          className="absolute -left-[5px] h-[11px] w-[11px] rounded-full bg-accent shadow-[0_0_14px_hsl(var(--accent))]"
          style={{ top: head }}
        />

        {items.map((e, i) => (
          <motion.li
            key={e.role}
            className="relative"
            initial={{ opacity: 0, x: from * 36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: i * 0.08, ease }}
          >
            <motion.span
              aria-hidden
              className={`absolute -left-[34px] top-1.5 grid h-4 w-4 place-items-center rounded-full border-2 border-background ${i === 0 ? 'bg-accent' : 'bg-primary'}`}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.15 + i * 0.08 }}
            >
              {i === 0 && <span className="pulse-dot absolute inset-0 rounded-full" />}
            </motion.span>
            <p className="font-mono text-xs text-accent">{e.period}</p>
            <h4 className="mt-1.5 font-display text-lg font-semibold leading-snug">{e.role}</h4>
            <p className="mt-0.5 text-sm text-muted-foreground">{e.place}</p>
            <p className="mt-2.5 text-sm leading-relaxed text-foreground/70">{e.body}</p>
          </motion.li>
        ))}
      </ol>
    </div>
  );
};

export const Experience = () => (
  <Section id="experience" flip className="py-20 md:py-28">
    <SectionHead label="Education" title={<>Experience &amp; <span className="grad-text">education.</span></>} />

    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
      <Reveal>
        <Column title="Experience" icon={Briefcase} items={work} from={-1} />
      </Reveal>
      <Reveal delay={0.08}>
        <Column title="Education" icon={GraduationCap} items={education} from={1} />
      </Reveal>
    </div>
  </Section>
);
