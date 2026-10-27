import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Section } from '@/components/Chain';
import { Reveal, SectionHead } from '@/components/Reveal';
import { collegePeriod, gallery, type Photo } from '@/data/site';

export const Gallery = () => {
  const [open, setOpen] = useState<Photo | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null);
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <Section id="photos" className="py-20 md:py-28">
      <SectionHead
        label="Photos"
        title={<>Moments from my <span className="grad-text">college years.</span></>}
        note={`Life at Sharda University, ${collegePeriod}: sports, festivals and the people along the way.`}
      />

      <div className="columns-2 gap-3 md:columns-3 md:gap-5 lg:columns-4">
        {gallery.map((p, i) => (
          <Reveal key={p.file} delay={(i % 4) * 0.06} className="mb-3 break-inside-avoid md:mb-5">
            <figure className="group panel overflow-hidden p-1.5">
              <button
                type="button"
                onClick={() => setOpen(p)}
                className="relative block w-full overflow-hidden rounded-[1.1rem] text-left"
                aria-label={`Open photo: ${p.title}`}
              >
                <img
                  src={`/gallery/${p.file}`}
                  alt={p.alt}
                  width={p.w}
                  height={p.h}
                  loading="lazy"
                  className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-3 pt-10 text-white md:p-4 md:pt-14">
                  <p className="font-display text-base font-semibold leading-tight md:text-lg">{p.title}</p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-white/70">College · {collegePeriod}</p>
                </figcaption>
              </button>
            </figure>
          </Reveal>
        ))}
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={open.title}
          className="fixed inset-0 z-[70] grid place-items-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={() => setOpen(null)}
        >
          <button
            type="button"
            onClick={() => setOpen(null)}
            aria-label="Close photo"
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>
          <figure className="max-h-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
            <img src={`/gallery/${open.file}`} alt={open.alt} className="max-h-[78vh] w-auto max-w-full rounded-2xl object-contain" />
            <figcaption className="mt-4 text-center text-white">
              <p className="font-display text-xl font-semibold">{open.title}</p>
              <p className="mt-1 text-sm text-white/75">{open.caption}</p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-white/50">College · {collegePeriod}</p>
            </figcaption>
          </figure>
        </div>
      )}
    </Section>
  );
};
