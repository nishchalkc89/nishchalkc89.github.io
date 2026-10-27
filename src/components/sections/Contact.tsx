import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp, Clock, Github, Linkedin, Mail, MapPin, RotateCcw, Timer, Twitter } from 'lucide-react';
import { useLocalTime } from '@/hooks/use-local-time';
import { toast } from 'sonner';
import { Section } from '@/components/Chain';
import { Reveal } from '@/components/Reveal';
import { site } from '@/data/site';

type Msg = { from: 'bot' | 'me'; text: string };
type Step = 'type' | 'details' | 'name' | 'email' | 'sending' | 'done';

const types = ['Smart contract', 'dApp', 'Website', 'UI design', 'Something else'];

const greeting: Msg[] = [
  { from: 'bot', text: "Hi, I'm Nishchal." },
  { from: 'bot', text: 'What would you like to build?' },
];

const socials = [
  { icon: Mail, label: 'Email', href: `mailto:${site.email}` },
  { icon: Linkedin, label: 'LinkedIn', href: site.linkedin },
  { icon: Github, label: 'GitHub', href: site.github },
  { icon: Twitter, label: 'X', href: site.x },
];

const Bubble = ({ m }: { m: Msg }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 14, scale: 0.97 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.35 }}
    className={`flex items-end gap-2.5 ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}
  >
    {m.from === 'bot' && <img src="/logo.png" alt="" className="mb-1 h-7 w-9 shrink-0 object-contain" />}
    <p
      className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-[15px] leading-relaxed ${
        m.from === 'me' ? 'rounded-br-md grad-bg on-grad font-medium' : 'rounded-bl-md bg-foreground/[0.07] text-foreground'
      }`}
    >
      {m.text}
    </p>
  </motion.div>
);

export const Contact = () => {
  const time = useLocalTime();
  const [msgs, setMsgs] = useState<Msg[]>(greeting);
  const [step, setStep] = useState<Step>('type');
  const [typing, setTyping] = useState(false);
  const [draft, setDraft] = useState('');
  const [data, setData] = useState({ project: '', message: '', name: '', email: '' });
  const box = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);

  // keep the newest message in view inside the chat only (never scrolls the page)
  useEffect(() => {
    box.current?.scrollTo({ top: box.current.scrollHeight, behavior: 'smooth' });
  }, [msgs, typing]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const botSay = (text: string, next: Step) => {
    setTyping(true);
    timers.current.push(
      window.setTimeout(() => {
        setMsgs((m) => [...m, { from: 'bot', text }]);
        setTyping(false);
        setStep(next);
      }, 750)
    );
  };

  const send = async (payload: typeof data) => {
    setStep('sending');
    try {
      const body = new URLSearchParams({ 'form-name': 'contact', ...payload }).toString();
      const res = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body });
      if (!res.ok) throw new Error(String(res.status));
      botSay(`Thanks ${payload.name.split(' ')[0]}, your message is in. I'll reply to ${payload.email} within a day or two.`, 'done');
    } catch {
      toast.error(`Couldn't send that. Please email me at ${site.email}`);
      botSay(`That didn't go through. Please email me directly at ${site.email}.`, 'done');
    }
  };

  const answer = (text: string) => {
    const value = text.trim();
    if (!value) return;
    setMsgs((m) => [...m, { from: 'me', text: value }]);
    setDraft('');

    if (step === 'type') {
      setData((d) => ({ ...d, project: value }));
      botSay('Nice. Tell me a little about it: what it should do, and any timeline or budget.', 'details');
    } else if (step === 'details') {
      setData((d) => ({ ...d, message: value }));
      botSay('Got it. What is your name?', 'name');
    } else if (step === 'name') {
      setData((d) => ({ ...d, name: value }));
      botSay(`Good to meet you, ${value.split(' ')[0]}. What is the best email to reach you on?`, 'email');
    } else if (step === 'email') {
      if (!/^\S+@\S+\.\S+$/.test(value)) {
        botSay("That doesn't look like an email address. Could you check it?", 'email');
        return;
      }
      const payload = { ...data, email: value };
      setData(payload);
      void send(payload);
    }
  };

  const restart = () => {
    timers.current.forEach(clearTimeout);
    setMsgs(greeting);
    setStep('type');
    setTyping(false);
    setDraft('');
    setData({ project: '', message: '', name: '', email: '' });
  };

  const busy = typing || step === 'sending';
  const placeholder = { details: 'Describe your project…', name: 'Your name', email: 'you@example.com' }[step as 'details' | 'name' | 'email'];

  return (
    <Section id="contact" className="py-24 md:py-32">
      <div className="grid grid-cols-1 items-stretch gap-14 lg:grid-cols-12 lg:gap-16">
        {/* left: who I am and how to reach me */}
        <Reveal className="lg:col-span-5">
          <p className="eyebrow flex items-center gap-3 text-accent">
            <span className="h-px w-8 grad-bg" />
            Contact
          </p>
          <h2 className="mt-5 text-5xl leading-[1.02] md:text-6xl text-balance">
            Let's <span className="grad-text">talk.</span>
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground">
            Have a smart contract, a web product or a design in mind? Answer a few quick questions in the chat and your message
            reaches me right away.
          </p>

          <div className="mt-8 flex items-center gap-4">
            <img src="/nishchal-kc-blockchain-developer-nepal.jpg" alt="Nishchal KC, freelance blockchain and full-stack developer" loading="lazy" className="h-20 w-20 rounded-full object-cover object-top ring-2 ring-accent/60 ring-offset-4 ring-offset-background" />
            <div>
              <p className="font-display text-xl font-semibold">{site.name}</p>
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="pulse-dot h-2 w-2 rounded-full bg-accent" /> Available for freelance
              </p>
            </div>
          </div>

          <ul className="mt-9 divide-y divide-foreground/10 border-y border-foreground/10">
            <li className="flex items-center gap-4 py-4">
              <MapPin className="h-5 w-5 text-accent" />
              <span className="text-sm text-muted-foreground">Based in</span>
              <span className="ml-auto font-medium">{site.location}</span>
            </li>
            <li className="flex items-center gap-4 py-4">
              <Clock className="h-5 w-5 text-accent" />
              <span className="text-sm text-muted-foreground">Local time</span>
              <span className="ml-auto font-medium">{time || '--:--'} {site.timeLabel}</span>
            </li>
            <li className="flex items-center gap-4 py-4">
              <Timer className="h-5 w-5 text-accent" />
              <span className="text-sm text-muted-foreground">Reply time</span>
              <span className="ml-auto font-medium">1–2 days</span>
            </li>
          </ul>

          <p className="mt-8 text-sm text-muted-foreground">Prefer to write directly?</p>
          <ul className="mt-3 flex flex-wrap gap-2.5">
            {socials.map(({ icon: Icon, label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-4 py-2 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
                >
                  <Icon className="h-4 w-4" /> {label === 'Email' ? site.email : label}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* right: the chat */}
        <Reveal delay={0.1} className="flex lg:col-span-7">
        <div className="panel flex min-h-[30rem] flex-1 flex-col p-5 md:p-7">
        {/* chat header */}
        <div className="flex items-center gap-3 border-b border-foreground/10 pb-4">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-foreground/[0.06]">
            <img src="/logo.png" alt="" className="h-6 w-8 object-contain" />
          </span>
          <div>
            <p className="font-display text-base font-semibold leading-none">{site.name}</p>
            <p className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-accent" /> Online · replies within 1–2 days
            </p>
          </div>
        </div>

        {/* conversation */}
        <div ref={box} className="flex min-h-[12rem] flex-1 flex-col overflow-y-auto py-5" aria-live="polite">
          <div className="mt-auto space-y-3">
          {msgs.map((m, i) => (
            <Bubble key={i} m={m} />
          ))}
          <AnimatePresence>
            {typing && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-end gap-2.5">
                <img src="/logo.png" alt="" className="mb-1 h-7 w-9 shrink-0 object-contain" />
                <span className="flex gap-1.5 rounded-2xl rounded-bl-md bg-foreground/[0.07] px-4 py-3.5" aria-label="Typing">
                  {[0, 1, 2].map((d) => (
                    <span key={d} className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: `${d * 150}ms` }} />
                  ))}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
          </div>
        </div>

        {/* answer area */}
        <div className="border-t border-foreground/10 pt-5">
          {step === 'type' && !busy && (
            <div className="flex flex-wrap justify-end gap-2">
              {types.map((t) => (
                <button
                  key={t}
                  onClick={() => answer(t)}
                  className="rounded-full border border-foreground/20 px-4 py-2 text-sm font-medium transition-colors hover:border-transparent hover:bg-accent hover:text-accent-foreground"
                >
                  {t}
                </button>
              ))}
            </div>
          )}

          {(step === 'details' || step === 'name' || step === 'email') && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!busy) answer(draft);
              }}
              className="flex items-end gap-3"
            >
              {step === 'details' ? (
                <textarea
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      if (!busy) answer(draft);
                    }
                  }}
                  rows={3}
                  autoFocus={false}
                  placeholder={placeholder}
                  aria-label="Your answer"
                  className="w-full resize-none rounded-2xl border border-foreground/20 bg-background/70 px-4 py-3 text-base placeholder:text-muted-foreground/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
              ) : (
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  type={step === 'email' ? 'email' : 'text'}
                  placeholder={placeholder}
                  aria-label="Your answer"
                  autoComplete={step === 'email' ? 'email' : 'name'}
                  className="h-12 w-full rounded-full border border-foreground/20 bg-background/70 px-5 text-base placeholder:text-muted-foreground/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
              )}
              <button
                type="submit"
                disabled={busy || !draft.trim()}
                aria-label="Send"
                className="grid h-12 w-12 shrink-0 place-items-center rounded-full grad-bg on-grad transition-transform hover:scale-105 disabled:opacity-40"
              >
                <ArrowUp className="h-5 w-5" />
              </button>
            </form>
          )}

          {step === 'done' && !busy && (
            <div className="text-center">
              <button onClick={restart} className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-4 py-2 text-sm font-medium transition-colors hover:border-accent hover:text-accent">
                <RotateCcw className="h-4 w-4" /> Send another message
              </button>
            </div>
          )}
        </div>
        </div>
        </Reveal>
      </div>
    </Section>
  );
};
