import React, { memo } from 'react';

const StaticGlowCard = memo(({ children, className = "" }) => (
    <div className={`group relative border 
    border-[#6B5E52]/30 dark:border-slate-800 
    bg-white/50 dark:bg-slate-900/20 
    backdrop-blur-xl 
    overflow-hidden transition-all duration-300 
    hover:-translate-y-2 
    shadow-[0_8px_24px_rgba(59,47,38,0.12)] hover:shadow-[0_16px_40px_rgba(59,47,38,0.2)] 
    dark:shadow-[0_0_30px_rgba(249,115,22,0.15)] dark:hover:shadow-[0_0_30px_rgba(249,115,22,0.3)] 
    hover:border-[#A85832]/40 dark:hover:border-orange-500/30 ${className}`}
    >
        {/* Warm glass gradient overlay for light mode */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-[#EDE4D3]/20 to-transparent dark:opacity-0 pointer-events-none" />
        {/* Hover glow effect */}
        <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
            style={{ background: `radial-gradient(circle at 50% 0%, rgba(168, 88, 50, 0.1) 20%, rgba(168, 88, 50, 0.05) 50%, transparent 80%)` }}
        />
        <div className="absolute inset-0 border border-[#A85832]/0 group-hover:border-[#A85832]/20 rounded-xl transition-colors duration-500 pointer-events-none" />
        <div className="relative h-full z-10">{children}</div>
    </div>
));

export default StaticGlowCard;
