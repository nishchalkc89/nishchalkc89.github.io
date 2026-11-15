import {
  siDocker, siEthereum, siFigma, siFramer, siGit, siGithub, siGo, siHtml5, siIpfs, siJavascript,
  siMysql, siNetlify, siNodedotjs, siPython, siReact, siSolidity, siSupabase, siTailwindcss, siTypescript,
  siVercel, siWeb3dotjs,
} from 'simple-icons';
import { Blocks } from 'lucide-react';

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

/**
 * Official full-colour logos for tools the icon set does not have, or draws differently.
 * Hardhat, MetaMask and CSS3 are their own project and standards logos; Truffle is from trufflesuite.com.
 */
const logoFiles: Record<string, string> = {
  Hardhat: '/tech/hardhat.svg',
  MetaMask: '/tech/metamask.svg',
  Truffle: '/tech/truffle.png',
  CSS3: '/tech/css3.svg',
};

/** logos that are (near) black or white by brand follow the theme text colour so they stay visible */
const adaptive = new Set(['Solidity', 'GitHub', 'Vercel']);

export const TechIcon = ({ name, className = 'h-7 w-7' }: { name: string; className?: string }) => {
  const file = logoFiles[name];
  if (file) {
    return <img src={file} alt={name} className={`${className} object-contain`} loading="lazy" decoding="async" />;
  }
  const b = brands[name];
  if (b) {
    return (
      <svg role="img" aria-label={name} viewBox="0 0 24 24" className={className} fill={adaptive.has(name) ? 'currentColor' : `#${b.hex}`}>
        <title>{name}</title>
        <path d={b.path} />
      </svg>
    );
  }
  return <Blocks aria-label={name} className={className} strokeWidth={1.7} style={{ color: '#9CA3AF' }} />;
};
