import React, { memo } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import Reveal from '../ui/Reveal';
import ScrollAnchor from '../ui/ScrollAnchor';
import SectionHeading from '../ui/SectionHeading';

const PORTFOLIO = [
    { category: "Packaging", title: "Product Boxes", color: "bg-orange-500" },
    { category: "Corporate", title: "ID Card Sets", color: "bg-blue-500" },
    { category: "Marketing", title: "Glossy Brochures", color: "bg-purple-500" },
    { category: "Outdoor", title: "Large Flex Banners", color: "bg-emerald-500" },
];

const Portfolio = memo(() => (
    <section className="py-24 relative border-t border-[#6B5E52]/20 dark:border-slate-900 transition-colors bg-[#EDE4D3]/50 dark:bg-transparent" data-section="portfolio">
        <ScrollAnchor id="portfolio" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
            <SectionHeading subtitle="A showcase of our recent industrial printing projects.">
                Featured Work
            </SectionHeading>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {PORTFOLIO.map((item, i) => (
                    <Reveal key={i} delay={i * 0.1}>
                        <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-white/60 dark:bg-slate-800 backdrop-blur-xl border border-[#6B5E52]/30 dark:border-slate-700 transition-all duration-300 hover:-translate-y-2 shadow-[0_8px_24px_rgba(59,47,38,0.12)] hover:shadow-[0_16px_40px_rgba(59,47,38,0.2)] dark:hover:shadow-[0_0_30px_rgba(249,115,22,0.3)] hover:border-[#A85832]/40 hover:scale-[1.02]">
                            <div className={`absolute inset-0 ${item.color} opacity-10 dark:opacity-20 group-hover:opacity-15 dark:group-hover:opacity-30 transition-opacity`} />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <ImageIcon size={48} className="text-[#6B5E52] dark:text-slate-600 opacity-40" />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-[#EDE4D3]/80 via-transparent to-transparent dark:from-black dark:opacity-90" />
                            <div className="absolute bottom-0 left-0 p-6 w-full">
                                <p className="text-xs font-bold text-[#A85832] dark:text-orange-500 uppercase tracking-widest mb-1">{item.category}</p>
                                <h3 className="text-xl font-bold text-[#3B2F26] dark:text-white font-display group-hover:text-[#A85832] dark:group-hover:text-cyan-300 transition-colors">{item.title}</h3>
                            </div>
                        </div>
                    </Reveal>
                ))}
            </div>
            <div className="mt-12 text-center">
                <p className="text-[#6B5E52] dark:text-slate-500 text-sm font-bold"> * Actual project photos coming soon.</p>
            </div>
        </div>
    </section>
));

export default Portfolio;
