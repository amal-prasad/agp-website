import React, { memo } from 'react';
import Reveal from './Reveal';

const SectionHeading = memo(({ children, subtitle }) => (
    <Reveal>
        <div className="mb-12 md:mb-16 relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold mb-4 font-display uppercase tracking-wide text-[#3B2F26] dark:text-white drop-shadow-[0_4px_8px_rgba(59,47,38,0.2)] dark:drop-shadow-[0_4px_15px_rgba(34,211,238,0.5)] transition-all">
                {children}
            </h2>

            <div className="h-1 w-32 mb-6 bg-gradient-to-r from-[#A85832] via-[#A85832]/60 to-transparent dark:from-orange-500 dark:via-orange-400 rounded-full shadow-[0_0_15px_rgba(168,88,50,0.4)] dark:shadow-[0_0_20px_orange]" />

            <p className="text-xl max-w-2xl text-[#4A4238] dark:text-slate-300 transition-colors 
        font-medium dark:font-normal
        [text-shadow:0_2px_6px_rgba(237,228,211,0.5)] dark:[text-shadow:none]">
                {subtitle}
            </p>
        </div>
    </Reveal>
));

export default SectionHeading;
