import React, { memo } from 'react';
import { GraduationCap, Factory, Building2 } from 'lucide-react';
import Reveal from '../ui/Reveal';
import ScrollAnchor from '../ui/ScrollAnchor';

const CLIENTS = [
    { name: "IIT Indore", Icon: GraduationCap, type: "Education" },
    { name: "IIM Indore", Icon: GraduationCap, type: "Management" },
    { name: "Panasonic", Icon: Factory, type: "Industrial" },
    { name: "RRCAT", Icon: Building2, type: "Research" },
];

const Clients = memo(() => (
    <section className="py-20 relative border-y border-[#6B5E52]/20 dark:border-slate-800 transition-colors bg-[#EDE4D3]/60 dark:bg-transparent" data-section="clients">
        <ScrollAnchor id="clients" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
            <Reveal>
                <div className="text-center mb-12">
                    <h3 className="text-[#A85832] dark:text-orange-500 font-display font-bold text-xl tracking-[0.3em] uppercase mb-4 drop-shadow-[0_2px_4px_rgba(168,88,50,0.2)] dark:drop-shadow-[0_0_15px_rgba(249,115,22,0.6)]">Trusted By The Best</h3>
                </div>
            </Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                {CLIENTS.map((client, i) => (
                    <Reveal key={i} delay={i * 0.1}>
                        <div className="flex flex-col items-center justify-center gap-4 group cursor-default p-6 
                bg-white/70 hover:bg-white/90 dark:bg-black/70 dark:hover:bg-black/80
                rounded-2xl transition-all duration-300 
                border border-[#6B5E52]/30 hover:border-[#A85832]/50 dark:border-white/30 dark:hover:border-orange-500/60
                backdrop-blur-xl 
                shadow-[0_8px_24px_rgba(59,47,38,0.1)] hover:shadow-[0_16px_40px_rgba(168,88,50,0.2)] dark:shadow-[0_0_20px_rgba(249,115,22,0.15)] dark:hover:shadow-[0_0_35px_rgba(249,115,22,0.4)]
                hover:-translate-y-2 hover:scale-105"
                        >
                            <div className="w-20 h-20 rounded-2xl 
                    bg-[#EDE4D3] dark:bg-white/5 border border-[#6B5E52]/30 dark:border-white/20
                    flex items-center justify-center 
                    text-[#6B5E52] dark:text-slate-300 group-hover:text-white 
                    group-hover:bg-[#A85832] dark:group-hover:bg-orange-600 group-hover:border-[#A85832] dark:group-hover:border-orange-500
                    group-hover:shadow-[0_0_20px_rgba(168,88,50,0.4)] dark:group-hover:shadow-[0_0_25px_rgba(249,115,22,0.5)]
                    transition-all duration-300"
                            >
                                <client.Icon size={32} />
                            </div>

                            <div className="text-center">
                                <h4 className="text-[#3B2F26] dark:text-white font-bold font-display text-xl group-hover:text-[#A85832] dark:group-hover:text-orange-500 transition-colors drop-shadow-sm">
                                    {client.name}
                                </h4>
                                <p className="text-xs text-[#6B5E52] dark:text-slate-400 group-hover:text-[#4A4238] dark:group-hover:text-slate-200 uppercase tracking-widest mt-1">
                                    {client.type}
                                </p>
                            </div>
                        </div>
                    </Reveal>
                ))}
            </div>
        </div>
    </section>
));

export default Clients;
