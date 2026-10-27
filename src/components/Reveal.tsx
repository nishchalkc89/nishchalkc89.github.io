import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export const Reveal = ({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

export const SectionHead = ({ label, title, note }: { label: string; title: ReactNode; note?: string }) => (
  <div className="mb-10 md:mb-14 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
    <Reveal>
      <p className="eyebrow flex items-center gap-3 text-accent">
        <span className="h-px w-8 grad-bg" />
        {label}
      </p>
      <h2 className="mt-5 max-w-3xl text-4xl leading-[1.02] md:text-6xl text-balance">{title}</h2>
    </Reveal>
    {note && (
      <Reveal delay={0.1}>
        <p className="max-w-xs text-muted-foreground">{note}</p>
      </Reveal>
    )}
  </div>
);
