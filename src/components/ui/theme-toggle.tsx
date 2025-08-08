'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Switch } from '@/components/ui/switch';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  if (!mounted) return null;

  return (
    <div className="flex items-center space-x-2">
      <Sun
        className={`h-4 w-4 ${
          theme === 'dark' ? 'rotate-12 scale-75 text-gray-400' : 'scale-100 text-black'
        }`}
      />
      <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} aria-label="Toggle theme" />
      <Moon
        className={`h-5 w-5 ${
          theme === 'light' ? 'rotate-12 scale-75 text-gray-400' : 'scale-100 text-white'
        }`}
      />
    </div>
  );
}
