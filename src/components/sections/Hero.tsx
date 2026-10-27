import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { marquee, site } from '@/data/site';
import { TechIcon } from '@/components/TechIcon';
import { useLocalTime } from '@/hooks/use-local-time';

/* tiny syntax colouring: [text, class] */
type Tok = [string, string?];
const k = 'text-[#c792ff]', f = 'text-[#7ab8ff]', s = 'text-[#7df9ff]', c = 'text-foreground/35', n = 'text-[#ff9ccf]';
const code: Tok[][] = [
  [['// SPDX-License-Identifier: MIT', c]],
  [['pragma ', k], ['solidity ', k], ['^0.8.20;']],
  [],
  [['contract ', k], ['Portfolio ', f], ['{']],
  [['  address public ', k], ['developer = msg.sender;']],
  [['  string public ', k], ['role = '], ['"Web3 + Full-stack"', s], [';']],
  [['  bool public ', k], ['availableForHire = '], ['true', n], [';']],
  [],
  [['  function ', k], ['hire', f], ['(string calldata brief)']],
  [['    external payable ', k], ['{']],
  [['    require', f], ['(availableForHire, '], ['"Let\'s talk"', s], [');']],
  [['    emit ', k], ['ProjectStarted', f], ['(msg.sender, brief);']],
  [['  }']],
  [['}']],
];

export const Hero = () => {
  const time = useLocalTime();

  return (
    <section id="top" className="relative overflow-hidden pt-28 md:pt-36">
      <div aria-hidden className="absolute inset-0 hidden bg-cover bg-center opacity-90 dark:block" style={{ backgroundImage: "url('/img/hero-bg.svg')" }} />
      <div aria-hidden className="absolute inset-0 bg-cover bg-center dark:hidden" style={{ backgroundImage: "url('/img/hero-bg-light.svg')" }} />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-[18%] top-1/4 h-64 w-64 rounded-full bg-accent/15 blur-3xl"
        animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-1/4 right-[16%] h-96 w-96 rounded-full bg-primary/15 blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent" />

      <div className="wrap relative">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2.5 rounded-full border border-foreground/10 bg-foreground/5 px-4 py-1.5 text-xs backdrop-blur"
            >
              <span className="pulse-dot h-2 w-2 rounded-full bg-accent" />
              Freelance · available for new projects
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mt-7 text-[clamp(2.6rem,6.4vw,5.6rem)] leading-[1] text-balance"
            >
              <span className="grad-text">Blockchain</span> &amp; full&#8209;stack developer who{' '}
              <span className="italic font-medium">designs</span> too.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground"
            >
              I'm Nishchal. I write smart contracts, build the web apps around them and design the interfaces people actually use,
              from first sketch to mainnet-ready launch.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-9 flex flex-wrap gap-3"
            >
              <a href="#work" className="group inline-flex h-12 items-center gap-2 rounded-full grad-bg pl-6 pr-5 font-semibold on-grad transition-transform hover:scale-[1.04]">
                View projects <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              </a>
              <a href="#contact" className="group inline-flex h-12 items-center gap-2 rounded-full border border-foreground/15 bg-foreground/5 pl-6 pr-5 font-medium backdrop-blur transition-colors hover:border-accent hover:text-accent">
                Hire me <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </motion.div>
          </div>

          {/* contract window over the isometric chain */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="relative lg:col-span-5"
          >
            <div className="dark animate-float panel overflow-hidden shadow-[0_30px_80px_-20px_rgba(163,92,255,0.5)]">
              <div className="flex items-center gap-2 border-b border-foreground/10 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                <span className="ml-3 font-mono text-xs text-foreground/40">Portfolio.sol</span>
              </div>
              <pre className="overflow-x-auto p-5 font-mono text-[12.5px] leading-[1.7] text-foreground/85 sm:text-[13px]">
                {code.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + i * 0.07 }}
                    className="flex"
                  >
                    <span className="mr-4 w-5 select-none text-right text-foreground/20">{i + 1}</span>
                    <span>
                      {line.length ? line.map(([t, cls], j) => <span key={j} className={cls}>{t}</span>) : ' '}
                      {i === code.length - 1 && <span className="caret ml-1 inline-block h-4 w-2 translate-y-0.5 bg-accent" />}
                    </span>
                  </motion.div>
                ))}
              </pre>
            </div>
          </motion.div>
        </div>

        {/* facts strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="panel mt-16 grid grid-cols-2 divide-foreground/10 md:mt-20 md:grid-cols-4 md:divide-x"
        >
          {[
            ['Degree', 'B.Tech CSE · completed'],
            ['Status', 'Freelance developer'],
            ['Delivered', '20+ projects'],
            ['Local time', `${time || '--:--'} ${site.timeLabel} · ${site.location}`],
          ].map(([a, b]) => (
            <div key={a} className="p-5 md:p-6">
              <p className="eyebrow text-muted-foreground">{a}</p>
              <p className="mt-2 font-display text-base font-medium md:text-lg">{b}</p>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="relative mt-14 overflow-hidden border-y border-foreground/10 bg-background/60 py-6" aria-hidden>
        <div className="flex w-max animate-marquee items-center gap-14">
          {[...marquee, ...marquee].map((m, i) => (
            <span key={i} className="flex items-center gap-14 text-foreground/80">
              <TechIcon name={m} className="h-9 w-9" />
              <span className="h-1.5 w-1.5 rotate-45 grad-bg" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
