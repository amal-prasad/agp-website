import React, { memo } from 'react';
import Reveal from './Reveal';

const TeamCard = memo(({ name, role, tag, img, colorClass, glowColor, delay = 0 }) => (
    <Reveal dir="left" delay={delay}>
        <div className="relative bg-white/60 dark:bg-slate-800 backdrop-blur-xl rounded-2xl border border-[#6B5E52]/30 dark:border-slate-700 shadow-[0_8px_24px_rgba(59,47,38,0.12)] dark:shadow-2xl group hover:border-[#A85832]/40 dark:hover:border-orange-500/30 transition-all duration-300 mt-0 hover:-translate-y-2 hover:shadow-[0_16px_40px_rgba(59,47,38,0.2)] dark:hover:shadow-[0_0_30px_rgba(249,115,22,0.3)] overflow-visible">
            <div className="aspect-[3/4] relative overflow-hidden group-hover:overflow-visible rounded-t-2xl bg-[#EDE4D3]/50 dark:bg-slate-900/50">
                <div className={`absolute bottom-0 left-0 w-full h-[80%] bg-gradient-to-t ${glowColor} blur-[50px] opacity-40 dark:opacity-60 group-hover:opacity-100 transition-all duration-500 z-0`} />
                <img src={img} loading="lazy" decoding="async" alt={role} className="absolute bottom-0 left-0 w-full h-[105%] object-contain object-bottom drop-shadow-2xl z-10 scale-100 group-hover:scale-110 transition-transform duration-500 origin-bottom" />
            </div>
            <div className="p-4 bg-white/70 dark:bg-slate-900 backdrop-blur-md border-t border-[#6B5E52]/20 dark:border-slate-800 relative z-10 rounded-b-2xl transition-colors">
                <h4 className="text-[#3B2F26] dark:text-white font-display text-xl font-bold uppercase mb-1 drop-shadow-[0_2px_4px_rgba(59,47,38,0.15)] dark:drop-shadow-[0_4px_10px_rgba(255,255,255,0.2)]">{name}</h4>
                <p className="font-bold text-[#6B5E52] dark:text-slate-300 font-display text-sm uppercase">{role}</p>
                <p className={`text-xs ${colorClass} tracking-widest font-bold mt-1`}>{tag}</p>
            </div>
        </div>
    </Reveal>
));

export default TeamCard;
