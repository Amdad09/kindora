'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <button
                type="button"
                aria-label="Change theme"
                disabled
                className="rounded-lg p-2 text-foreground"
            >
                <Sun size={21} />
            </button>
        );
    }

    const isDark = theme === 'dark';

    return (
        <button
            type="button"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
            title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
            className="rounded-lg p-2 text-foreground transition-colors hover:bg-muted"
        >
            {isDark ? <Sun size={21} /> : <Moon size={21} />}
        </button>
    );
};

export default ThemeToggle;
