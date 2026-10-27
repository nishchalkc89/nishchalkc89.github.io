import type { ReactNode } from 'react';

/**
 * Section wrapper with the same blockchain background as the hero.
 * The tile image is mirrored top-to-bottom, so it repeats down a tall section without a visible seam.
 */
export const Section = ({
  id, className = '', flip = false, children,
}: { id?: string; className?: string; flip?: boolean; children: ReactNode }) => {
  const mask = 'linear-gradient(to bottom, transparent, #000 140px, #000 calc(100% - 140px), transparent)';
  const tile = (src: string, extra: string) => (
    <div
      className={`absolute inset-0 bg-[length:auto_1800px] bg-repeat-y ${flip ? 'bg-[position:50%_900px]' : 'bg-[position:50%_0]'} ${extra}`}
      style={{ backgroundImage: `url('${src}')` }}
    />
  );
  return (
    <section id={id} className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ maskImage: mask, WebkitMaskImage: mask }}>
        {tile('/img/section-tile.svg', 'hidden dark:block')}
        {tile('/img/section-tile-light.svg', 'dark:hidden')}
      </div>
      <div className={`wrap relative ${className}`}>{children}</div>
    </section>
  );
};

/* ---------- animated blockchain: blocks linked together, a transaction travels along the chain ---------- */
const cubePts = (x: number, y: number, k: number) => {
  const hx = k * 0.866, hy = k * 0.5;
  return {
    top: `${x},${y} ${x + hx},${y + hy} ${x},${y + 2 * hy} ${x - hx},${y + hy}`,
    left: `${x - hx},${y + hy} ${x},${y + 2 * hy} ${x},${y + 2 * hy + k} ${x - hx},${y + hy + k}`,
    right: `${x + hx},${y + hy} ${x},${y + 2 * hy} ${x},${y + 2 * hy + k} ${x + hx},${y + hy + k}`,
  };
};

const blocks = [[110, 250], [255, 170], [400, 90], [545, 170], [690, 250]];
const K = 56;
const centers = blocks.map(([x, y]) => [x, y + K]);
const route = centers.map(([x, y], i) => `${i ? 'L' : 'M'}${x} ${y}`).join(' ');

export const ChainArt = ({ className = '' }: { className?: string }) => (
  <svg viewBox="40 40 740 340" className={className} fill="none" role="img" aria-label="Blocks linked together as a blockchain">
    <defs>
      <linearGradient id="chainLink" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="hsl(var(--primary))" />
        <stop offset="1" stopColor="hsl(var(--accent))" />
      </linearGradient>
      <radialGradient id="chainGlow" cx=".5" cy=".5" r=".5">
        <stop offset="0" stopColor="hsl(var(--primary))" stopOpacity=".35" />
        <stop offset="1" stopColor="hsl(var(--primary))" stopOpacity="0" />
      </radialGradient>
    </defs>
    <ellipse cx="400" cy="230" rx="360" ry="150" fill="url(#chainGlow)" />

    {/* links between blocks */}
    {centers.slice(1).map(([x, y], i) => (
      <g key={i}>
        <line x1={centers[i][0]} y1={centers[i][1]} x2={x} y2={y} stroke="url(#chainLink)" strokeOpacity=".28" strokeWidth="3" />
        <line x1={centers[i][0]} y1={centers[i][1]} x2={x} y2={y} stroke="url(#chainLink)" strokeWidth="3" strokeLinecap="round" strokeDasharray="7 17" className="flow" />
      </g>
    ))}

    {/* blocks, each lights up as the transaction reaches it */}
    {blocks.map(([x, y], i) => {
      const c = cubePts(x, y, K);
      return (
        <g key={i} className="chain-cube" style={{ animationDelay: `${i}s` }}>
          <polygon points={c.left} fill="hsl(var(--primary) / 0.5)" stroke="hsl(var(--primary))" strokeWidth="1.6" strokeLinejoin="round" />
          <polygon points={c.right} fill="hsl(var(--accent) / 0.5)" stroke="hsl(var(--accent))" strokeWidth="1.6" strokeLinejoin="round" />
          <polygon points={c.top} fill="hsl(var(--accent) / 0.85)" stroke="hsl(var(--accent))" strokeWidth="1.6" strokeLinejoin="round" />
          <text x={x} y={y + K + 6} textAnchor="middle" fontFamily="monospace" fontSize="15" fontWeight="700" fill="hsl(var(--background))">
            #{i + 1}
          </text>
        </g>
      );
    })}

    {/* the transaction */}
    <g>
      <circle r="16" fill="hsl(var(--accent))" opacity=".3" />
      <circle r="7" fill="hsl(var(--accent))" />
      <animateMotion dur="5s" repeatCount="indefinite" path={route} keyTimes="0;0.8;1" keyPoints="0;1;1" calcMode="linear" />
      <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.8;0.86;1" dur="5s" repeatCount="indefinite" />
    </g>
  </svg>
);
