import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const dark = !mounted || resolvedTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(dark ? 'light' : 'dark')}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={dark ? 'Light mode' : 'Dark mode'}
      className="relative grid h-10 w-[4.5rem] shrink-0 grid-cols-2 items-center rounded-full border border-foreground/15 bg-foreground/5 p-1 transition-colors hover:border-accent"
    >
      <span
        aria-hidden
        className={`absolute top-1 h-8 w-8 rounded-full grad-bg shadow-md transition-all duration-300 ${dark ? 'left-1' : 'left-[calc(100%-2.25rem)]'}`}
      />
      <Moon className={`relative z-10 mx-auto h-4 w-4 transition-colors ${dark ? 'on-grad' : 'text-muted-foreground'}`} />
      <Sun className={`relative z-10 mx-auto h-4 w-4 transition-colors ${dark ? 'text-muted-foreground' : 'on-grad'}`} />
    </button>
  );
};
