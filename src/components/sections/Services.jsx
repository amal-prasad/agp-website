import React, { memo } from 'react';
import { User, FileText, Layers, CreditCard, Palette, CheckCircle, Printer, Image as ImageIcon } from 'lucide-react';
import Reveal from '../ui/Reveal';
import ScrollAnchor from '../ui/ScrollAnchor';
import SectionHeading from '../ui/SectionHeading';
import StaticGlowCard from '../ui/StaticGlowCard';

const SERVICES = [
    { title: "Visiting Cards", Icon: User, desc: "Premium matte, gloss, and textured finishes." },
    { title: "Bill Books", Icon: FileText, desc: "Carbonless multi-copy invoice solutions." },
    { title: "Flex Printing", Icon: Layers, desc: "High-durability outdoor banners & hoardings." },
    { title: "ID Cards", Icon: CreditCard, desc: "PVC cards with lanyards for corporate use." },
    { title: "Brochures", Icon: Palette, desc: "Tri-fold, bi-fold, and catalog printing." },
    { title: "Sticker Labels", Icon: CheckCircle, desc: "Product packaging and adhesive labels." },
    { title: "Offset Printing", Icon: Printer, desc: "High-volume bulk printing with precision." },
    { title: "Logo Design", Icon: ImageIcon, desc: "Brand identity creation and vectorization." },
];

const Services = memo(() => (
    <section className="py-24 relative transition-colors" data-section="services">
        <ScrollAnchor id="services" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
            <SectionHeading subtitle="Comprehensive printing solutions tailored for businesses of all scales.">
                Our Services
            </SectionHeading>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {SERVICES.map((service, idx) => (
                    <Reveal dir="left" key={service.title} delay={idx * 0.05}>
                        <StaticGlowCard className="rounded-2xl p-8 h-full">
                            <div className="relative z-10">
                                <div className="h-14 w-14 bg-[#EDE4D3] dark:bg-slate-800 text-[#6B5E52] dark:text-slate-400 rounded-xl flex items-center justify-center mb-6 border border-[#6B5E52]/30 dark:border-slate-700 group-hover:bg-[#A85832] dark:group-hover:bg-cyan-400 group-hover:text-white dark:group-hover:text-black group-hover:border-[#A85832] dark:group-hover:border-cyan-300 transition-all shadow-sm">
                                    <service.Icon />
                                </div>
                                <h3 className="text-xl font-bold text-[#3B2F26] dark:text-white mb-3 font-display uppercase tracking-wide group-hover:text-[#A85832] dark:group-hover:text-cyan-300 transition-colors">{service.title}</h3>

                                <p className="text-[#6B5E52] dark:text-slate-400 text-sm leading-relaxed 
                    font-medium dark:font-normal 
                    group-hover:text-[#4A4238] dark:group-hover:text-slate-300">
                                    {service.desc}
                                </p>
                            </div>
                        </StaticGlowCard>
                    </Reveal>
                ))}
            </div>
        </div>
    </section>
));

export default Services;
