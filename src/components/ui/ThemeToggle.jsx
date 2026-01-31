import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Monitor } from 'lucide-react';

const ThemeToggle = ({ theme, setTheme, isVertical = false }) => {
    const icons = [
        { mode: 'light', icon: <Sun size={16} />, activeColor: 'text-amber-500' },
        { mode: 'system', icon: <Monitor size={16} />, activeColor: 'text-cyan-400' },
        { mode: 'dark', icon: <Moon size={16} />, activeColor: 'text-blue-400' }
    ];
    const currentIndex = icons.findIndex(i => i.mode === theme);

    return (
        <div className={`relative flex ${isVertical ? 'flex-col' : ''} items-center gap-0.5 p-1 
      ${isVertical ? 'rounded-2xl' : 'rounded-full'}
      bg-black/30 dark:bg-white/10 backdrop-blur-md 
      border border-white/20 dark:border-white/10 
      shadow-lg`}
        >
            {/* Animated pill indicator */}
            <motion.div
                layout
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className={`absolute ${isVertical ? 'w-[calc(100%-6px)] h-7' : 'h-7 w-7'} rounded-full bg-white/90 dark:bg-slate-700 shadow-md z-0`}
                style={isVertical ? {
                    top: `calc(${currentIndex * 30}px + 3px)`
                } : {
                    left: `calc(${currentIndex * 30}px + 3px)`
                }}
            />
            {icons.map(({ mode, icon, activeColor }) => (
                <button
                    key={mode}
                    onClick={() => setTheme(mode)}
                    aria-label={`Switch to ${mode} mode`}
                    className={`relative z-10 p-1.5 rounded-full transition-all duration-200
            ${theme === mode ? activeColor : 'text-white/60 dark:text-slate-400 hover:text-white/90'}`}
                >
                    {icon}
                </button>
            ))}
        </div>
    );
};

export default ThemeToggle;
