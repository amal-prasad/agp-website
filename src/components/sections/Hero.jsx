import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Printer, CheckCircle } from 'lucide-react';
import Reveal from '../ui/Reveal';

const Hero = memo(() => (
    <section className="relative min-h-screen flex items-center overflow-visible pt-20" data-section="hero">
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <Reveal>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#3B2F26]/10 dark:bg-slate-800/80 border border-[#6B5E52]/30 dark:border-slate-700 text-[#A85832] dark:text-cyan-300 text-sm font-medium tracking-widest uppercase mb-8 shadow-[0_4px_12px_rgba(59,47,38,0.1)] dark:shadow-[0_0_15px_rgba(34,211,238,0.15)] backdrop-blur-md transition-colors">
                    <span className="w-2 h-2 rounded-full bg-[#A85832] dark:bg-cyan-300 animate-pulse dark:shadow-[0_0_10px_cyan]" /> Est. 2019
                </div>

                <h1 className="text-6xl md:text-8xl font-bold leading-[0.9] mb-8 font-display transition-colors">
                    {/* KRAFT PAPER: Warm levitation with Espresso Brown */}
                    <span className="block text-[#3B2F26] dark:text-white drop-shadow-[0_8px_16px_rgba(59,47,38,0.25)] dark:drop-shadow-[0_0_35px_rgba(255,255,255,0.3)]">PRECISION</span>
                    <span className="block text-[#A85832] dark:text-orange-500 drop-shadow-[0_8px_16px_rgba(168,88,50,0.3)] dark:drop-shadow-[0_0_50px_rgba(249,115,22,0.9)] relative z-10">
                        IN PRINT.
                    </span>
                </h1>

                <p className="text-xl md:text-2xl mb-10 leading-relaxed max-w-lg font-semibold dark:font-normal transition-colors">
                    <span className="text-[#4A4238] dark:text-slate-300 [text-shadow:0_2px_6px_rgba(237,228,211,0.5)] dark:[text-shadow:none]">Engineering your brand's physical identity with </span>
                    {/* Forest Green accent for "industrial-grade perfection" */}
                    <span className="font-bold text-force-production-black dark:text-force-production-cyan [text-shadow:0_4px_8px_rgba(35,79,50,0.3)] dark:[text-shadow:0_0_15px_rgba(34,211,238,0.5)] transition-none!">
                        industrial-grade perfection
                    </span>
                    <span className="text-[#4A4238] dark:text-slate-300 [text-shadow:0_2px_6px_rgba(237,228,211,0.5)] dark:[text-shadow:none]">.</span>
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                    <a href="#contact" className="bg-orange-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-700 transition-all shadow-[0_6px_20px_rgba(234,88,12,0.35)] dark:shadow-[0_0_25px_rgba(249,115,22,0.5)] flex items-center justify-center gap-2 font-display uppercase tracking-wide border border-transparent">
                        Start Project <ArrowRight size={20} />
                    </a>

                    <a href="#portfolio" className="border border-[#3B2F26]/40 dark:border-slate-600 text-[#3B2F26] dark:text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#3B2F26] hover:text-[#EDE4D3] dark:hover:bg-slate-800 dark:hover:border-cyan-300 dark:hover:text-cyan-300 transition-all flex items-center justify-center font-display uppercase tracking-wide backdrop-blur-sm shadow-[0_4px_12px_rgba(59,47,38,0.15)] dark:shadow-none bg-white/20 dark:bg-transparent">
                        Our Work
                    </a>
                </div>
            </Reveal>

            <Reveal delay={0.2}>
                <div className="relative hidden lg:block h-[500px]">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full -z-10 pointer-events-none"
                        style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.1) 0%, rgba(0,0,0,0) 70%)' }}>
                    </div>
                    <div className="absolute inset-0 bg-black/40 rounded-3xl border border-white/30 p-1 shadow-[0_0_40px_rgba(249,115,22,0.2)] dark:shadow-[0_0_100px_-20px_rgba(249,115,22,0.4)] backdrop-blur-xl transition-colors">
                        <div className="w-full h-full bg-black/30 rounded-2xl flex flex-col items-center justify-center text-slate-600 overflow-hidden relative transition-colors backdrop-blur-md border border-white/10">
                            <Printer size={140} strokeWidth={0.5} className="mb-4 text-white/80 drop-shadow-xl dark:drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] relative z-10 transition-colors" />
                            <p className="uppercase tracking-[0.5em] text-sm text-orange-500 font-bold relative z-10 drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]">High Fidelity Output</p>
                        </div>
                    </div>
                    <div
                        className="absolute -right-6 top-8 bg-white/95 dark:bg-slate-800/60 backdrop-blur-md p-5 rounded-xl shadow-xl dark:shadow-[0_0_30px_rgba(0,0,0,0.6)] max-w-xs z-20 border border-slate-200 dark:border-slate-600 border-l-4 border-l-orange-500 dark:border-l-cyan-400 animate-float-infinite"
                    >
                        <div className="flex items-center gap-4 mb-2">
                            <div className="p-3 bg-orange-100 dark:bg-cyan-400/10 rounded-full text-orange-600 dark:text-cyan-300 shadow-sm dark:shadow-[0_0_10px_rgba(34,211,238,0.4)]"><CheckCircle size={24} /></div>
                            <div>
                                <span className="font-bold text-black dark:text-white block font-display text-lg">Order Delivered</span>
                                <span className="text-xs text-orange-500 dark:text-cyan-300 uppercase tracking-wider font-bold">Just Now</span>
                            </div>
                        </div>
                        <p className="text-sm text-slate-900 dark:text-slate-300 font-medium">10,000 Brochures for Panasonic Pithampur.</p>
                    </div>
                </div>
            </Reveal>
        </div>
    </section>
));

export default Hero;
