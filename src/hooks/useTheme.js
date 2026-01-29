import { useState, useEffect } from 'react';

export const useTheme = () => {
    const [theme, setTheme] = useState('system');

    useEffect(() => {
        const element = document.documentElement;
        const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const applyTheme = () => {
            const isDark = theme === 'dark' || (theme === 'system' && darkQuery.matches);
            if (isDark) {
                element.classList.add('dark');
            } else {
                element.classList.remove('dark');
            }
        };

        applyTheme();

        const handleChange = () => {
            if (theme === 'system') applyTheme();
        };

        darkQuery.addEventListener('change', handleChange);
        return () => darkQuery.removeEventListener('change', handleChange);
    }, [theme]);

    // Return specific values to notify of current state if needed, 
    // but for now sticking to the original API
    return { theme, setTheme };
};
