import {
  siCss, siDocker, siEthereum, siFigma, siFramer, siGit, siGithub, siGo, siHtml5, siIpfs, siJavascript,
  siMysql, siNetlify, siNodedotjs, siPython, siReact, siSolidity, siSupabase, siTailwindcss, siTypescript,
  siVercel, siWeb3dotjs,
} from 'simple-icons';
import { Blocks, Hammer, Wallet, type LucideIcon } from 'lucide-react';

type Brand = { title: string; path: string; hex: string };

const brands: Record<string, Brand> = {
  Solidity: siSolidity,
  Ethereum: { ...siEthereum, hex: '627EEA' },
  IPFS: siIpfs,
  'Web3.js': siWeb3dotjs,
  React: siReact,
  TypeScript: siTypescript,
  JavaScript: siJavascript,
  'Tailwind CSS': siTailwindcss,
  'Framer Motion': { ...siFramer, hex: '0055FF' },
  HTML5: siHtml5,
  CSS3: { ...siCss, hex: '3A8FE0' },
  'Node.js': siNodedotjs,
  Python: siPython,
  Go: siGo,
  MySQL: siMysql,
  Supabase: siSupabase,
  Git: siGit,
  GitHub: siGithub,
  Docker: siDocker,
  Vercel: siVercel,
  Netlify: siNetlify,
  Figma: siFigma,
};

/** brand colours for tools that have no logo in the icon set */
const fallback: Record<string, { Icon: LucideIcon; hex: string }> = {
  Hardhat: { Icon: Hammer, hex: 'F7D51D' },
  Truffle: { Icon: Blocks, hex: 'C9A27E' },
  MetaMask: { Icon: Wallet, hex: 'F6851B' },
};

/** logos that are (near) black or white by brand follow the theme text colour so they stay visible */
const adaptive = new Set(['Solidity', 'GitHub', 'Vercel']);

export const TechIcon = ({ name, className = 'h-7 w-7' }: { name: string; className?: string }) => {
  const b = brands[name];
  if (b) {
    return (
      <svg role="img" aria-label={name} viewBox="0 0 24 24" className={className} fill={adaptive.has(name) ? 'currentColor' : `#${b.hex}`}>
        <title>{name}</title>
        <path d={b.path} />
      </svg>
    );
  }
  const f = fallback[name];
  const Icon = f?.Icon ?? Blocks;
  return <Icon aria-label={name} className={className} strokeWidth={1.7} style={{ color: `#${f?.hex ?? '9CA3AF'}` }} />;
};
