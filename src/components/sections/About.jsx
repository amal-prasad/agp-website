import React, { memo } from 'react';
import { Star } from 'lucide-react';
import Reveal from '../ui/Reveal';
import ScrollAnchor from '../ui/ScrollAnchor';
import SectionHeading from '../ui/SectionHeading';
import TeamCard from '../ui/TeamCard';

const About = memo(() => (
    <section className="py-32 relative overflow-hidden border-t border-[#6B5E52]/20 dark:border-slate-800 transition-colors" data-section="about">
        <ScrollAnchor id="about" />
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center relative z-10">
            <div className="grid grid-cols-2 gap-6 relative z-10">
                <TeamCard
                    name="M. Sivaprasad" role="Director" tag="LEADERSHIP"
                    img="/person-blue.png"
                    colorClass="text-[#334E68] dark:text-cyan-300"
                    glowColor="from-[#334E68]/30 dark:from-blue-600/50 via-[#334E68]/10 dark:via-cyan-500/20 to-transparent"
                />
                <div className="mt-12">
                    <TeamCard
                        name="Ajay Pandey" role="Ops Head" tag="EXECUTION"
                        img="/person-grey.png"
                        colorClass="text-[#A85832] dark:text-orange-500"
                        glowColor="from-[#A85832]/30 dark:from-orange-600/50 via-[#A85832]/10 dark:via-red-500/20 to-transparent"
                        delay={0.2}
                    />
                </div>
            </div>

            <div>
                <Reveal dir="right">
                    <SectionHeading subtitle="Trusted by industry giants. Built on absolute reliability.">
                        Why Choose AGP?
                    </SectionHeading>
                    <div className="space-y-8">
                        {[
                            { title: "Precision Tech", desc: "Latest offset machinery for crisp, vibrant results." },
                            { title: "Strict Deadlines", desc: "We respect your time. Deliveries on schedule, always." },
                            { title: "End-to-End", desc: "From design conceptualization to final finishing." }
                        ].map((item, i) => (
                            <div key={i} className="flex gap-5 group hover:translate-x-2 transition-transform duration-300 p-6 rounded-xl 
                bg-white/60 dark:bg-slate-800/40 
                hover:bg-white/80 dark:hover:bg-slate-800/60 
                border border-[#6B5E52]/20 dark:border-white/10 hover:border-[#A85832]/40 dark:hover:border-orange-500/30 
                backdrop-blur-xl shadow-[0_6px_20px_rgba(59,47,38,0.1)] dark:shadow-[0_0_30px_rgba(0,0,0,0.3)]
                hover:shadow-[0_8px_30px_rgba(168,88,50,0.15)] dark:hover:shadow-[0_0_40px_rgba(249,115,22,0.2)]"
                            >
                                <div className="mt-1 min-w-[32px] h-[32px] rounded-lg bg-[#EDE4D3] dark:bg-slate-800 flex items-center justify-center border border-[#6B5E52]/30 dark:border-slate-700 text-[#A85832] shadow-sm dark:shadow-[0_0_15px_rgba(249,115,22,0.3)] group-hover:shadow-[0_0_20px_rgba(168,88,50,0.4)] transition-all">
                                    <Star size={18} fill="currentColor" />
                                </div>
                                <div>
                                    <h4 className="text-xl md:text-2xl font-bold mb-2 text-[#3B2F26] dark:text-white font-display uppercase group-hover:text-[#A85832] dark:group-hover:text-cyan-300 transition-colors">
                                        {item.title}
                                    </h4>

                                    <p className="text-[#6B5E52] dark:text-slate-400 leading-relaxed text-base md:text-lg 
                    font-medium dark:font-normal 
                    group-hover:text-[#4A4238] dark:group-hover:text-slate-200">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Reveal>
            </div>
        </div>
    </section>
));

export default About;
