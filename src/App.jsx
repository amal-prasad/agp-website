import React, { useState, useRef, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { 
  Printer, Layers, Send, Phone, MapPin, CheckCircle, 
  Menu, X, Palette, FileText, CreditCard, User, 
  Image as ImageIcon, Loader2, ArrowRight, Building2, GraduationCap, Factory, Star 
} from 'lucide-react';

// --- CONSTANTS & CONFIG ---
const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_foh4x56',
  TEMPLATE_ID: 'template_o1ibewd',
  PUBLIC_KEY: '0tI03IJkKlik1sdYe'
};

const MAP_EMBED_URL = "https://maps.google.com/maps?q=Treasure+Fantasy+Cat+Road+Rau+Indore&t=&z=15&ie=UTF8&iwloc=&output=embed";

const NAV_LINKS = ['Services', 'Portfolio', 'About', 'Contact'];

const SERVICES = [
  { title: "Visiting Cards", icon: <User />, desc: "Premium matte, gloss, and textured finishes." },
  { title: "Bill Books", icon: <FileText />, desc: "Carbonless multi-copy invoice solutions." },
  { title: "Flex Printing", icon: <Layers />, desc: "High-durability outdoor banners & hoardings." },
  { title: "ID Cards", icon: <CreditCard />, desc: "PVC cards with lanyards for corporate use." },
  { title: "Brochures", icon: <Palette />, desc: "Tri-fold, bi-fold, and catalog printing." },
  { title: "Sticker Labels", icon: <CheckCircle />, desc: "Product packaging and adhesive labels." },
  { title: "Offset Printing", icon: <Printer />, desc: "High-volume bulk printing with precision." },
  { title: "Logo Design", icon: <ImageIcon />, desc: "Brand identity creation and vectorization." },
];

const CLIENTS = [
  { name: "IIT Indore", icon: <GraduationCap size={32} />, type: "Education" },
  { name: "IIM Indore", icon: <GraduationCap size={32} />, type: "Management" },
  { name: "Panasonic", icon: <Factory size={32} />, type: "Industrial" },
  { name: "RRCAT", icon: <Building2 size={32} />, type: "Research" },
];

const PORTFOLIO = [
  { category: "Packaging", title: "Product Boxes", color: "bg-orange-500" },
  { category: "Corporate", title: "ID Card Sets", color: "bg-blue-500" },
  { category: "Marketing", title: "Glossy Brochures", color: "bg-purple-500" },
  { category: "Outdoor", title: "Large Flex Banners", color: "bg-emerald-500" },
];

// --- UNIFIED ANIMATION ENGINE ---
const Reveal = ({ children, dir = "up", delay = 0, className = "" }) => {
  const variants = {
    up:    { opacity: 0, y: 50 },
    left:  { opacity: 0, x: -50 },
    right: { opacity: 0, x: 50 }
  };

  return (
    <motion.div
      initial={variants[dir]}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// --- OPTIMIZED BACKGROUND COMPONENTS (Memoized) ---
const RotatingRig = memo(({ position, color, iconColor, shadowColor, className = "" }) => (
  <div className={`absolute ${position} w-48 h-48 hidden md:block ${className}`}>
    <div className={`absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-${color} to-transparent`} />
    <div className={`absolute top-0 left-0 h-full w-[1px] bg-gradient-to-b from-${color} to-transparent`} />
    <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ willChange: "transform" }}
      >
        <Printer 
          size={80} 
          strokeWidth={0.5} 
          className={`${iconColor} drop-shadow-[0_0_15px_${shadowColor}]`} 
        />
      </motion.div>
    </div>
  </div>
));

const IndustrialBackground = memo(() => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    <div className="absolute inset-0 bg-[#050505]" />
    <div 
      className="absolute inset-0 opacity-[0.05] mix-blend-overlay translate-z-0"
      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
    />
    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent pointer-events-none" />
    <div className="absolute -top-20 -right-20 w-[800px] h-[800px] bg-orange-600/10 blur-[100px] rounded-full mix-blend-screen" />
    <div className="absolute -bottom-40 -left-20 w-[800px] h-[800px] bg-red-600/5 blur-[100px] rounded-full mix-blend-screen" />

    {/* Top Left Rig */}
    <RotatingRig 
      position="top-20 left-20" 
      color="cyan-500" 
      iconColor="text-cyan-500/30" 
      shadowColor="rgba(34,211,238,0.6)" 
    />
    
    {/* Bottom Right Rig (Inverted via Rotate) */}
    <RotatingRig 
      position="bottom-20 right-20" 
      color="orange-500" 
      iconColor="text-orange-500/30" 
      shadowColor="rgba(249,115,22,0.6)"
      className="rotate-180"
    />

    <div className="absolute inset-0 bg-[size:100px_100px] bg-grid-pattern opacity-[0.03]" />
  </div>
));

const PolishedGlassLayer = memo(() => (
  <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
    <div className="absolute -top-[10%] left-1/2 -translate-x-1/2 w-[70%] h-[50%] bg-white/[0.03] blur-[100px] rounded-[100%] pointer-events-none mix-blend-overlay" />
    <div className="absolute -bottom-[20%] left-1/2 -translate-x-1/2 w-[80%] h-[60%] bg-cyan-500/[0.05] blur-[120px] rounded-full mix-blend-screen" />
    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-transparent opacity-50" />
  </div>
));

// --- UI COMPONENT PRIMITIVES ---
const StaticGlowCard = ({ children, className = "" }) => (
  <div
    className={`group relative border border-slate-800 bg-slate-900/20 backdrop-blur-md overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(249,115,22,0.3)] hover:border-orange-500/30 ${className}`}
    style={{ contain: 'paint' }} 
  >
    <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
      style={{
        background: `radial-gradient(circle at 50% 0%, rgba(34, 211, 238, 0.25) 20%, rgba(34, 211, 238, 0.05) 50%, transparent 80%)`
      }}
    />
    <div className="absolute inset-0 border border-cyan-500/0 group-hover:border-cyan-500/20 rounded-xl transition-colors duration-500 pointer-events-none" />
    <div className="relative h-full">{children}</div>
  </div>
);

const SectionHeading = ({ children, subtitle, dark = false }) => (
  <Reveal>
    <div className="mb-12 md:mb-16 relative z-10">
      <h2 className={`text-4xl md:text-6xl font-bold mb-4 font-display uppercase tracking-wide 
        ${dark ? 'text-white drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]' : 'text-brand-black'}
      `}>
        {children}
      </h2>
      <div className="h-1 w-32 mb-6 bg-gradient-to-r from-brand-orange via-orange-400 to-transparent rounded-full shadow-[0_0_20px_orange]" />
      <p className={`text-xl max-w-2xl font-medium ${dark ? 'text-slate-300' : 'text-slate-600'}`}>
        {subtitle}
      </p>
    </div>
  </Reveal>
);

const FormInput = (props) => (
  <input 
    {...props}
    className="w-full px-6 py-4 rounded-xl border border-slate-700 bg-slate-800/50 focus:bg-slate-800 focus:border-brand-orange outline-none transition-all font-medium text-white placeholder-slate-500 backdrop-blur-sm"
  />
);

const TeamCard = ({ name, role, tag, img, colorClass, glowColor, delay = 0 }) => (
  <Reveal dir="left" delay={delay}>
    <div className="relative bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl group hover:border-orange-500/30 transition-all duration-300 mt-0 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(249,115,22,0.3)]">
        <div className="aspect-[3/4] relative">
          <div className={`absolute bottom-0 left-0 w-full h-[80%] bg-gradient-to-t ${glowColor} blur-[50px] opacity-60 group-hover:opacity-100 transition-all duration-500 z-0`} />
          <img src={img} loading="lazy" decoding="async" alt={role} className="absolute bottom-0 left-0 w-full h-[105%] object-contain object-bottom drop-shadow-2xl z-0 scale-100 group-hover:scale-105 transition-transform duration-500 origin-bottom" />
        </div>
        <div className="p-4 bg-slate-900 border-t border-slate-800 relative z-10 rounded-b-2xl">
          <h4 className="text-white font-display text-xl font-bold uppercase mb-1 drop-shadow-md">{name}</h4>
          <p className="font-bold text-slate-300 font-display text-sm uppercase">{role}</p>
          <p className={`text-xs ${colorClass} tracking-widest font-bold mt-1`}>{tag}</p>
        </div>
    </div>
  </Reveal>
);

// A dedicated invisible landing pad for navigation
const ScrollAnchor = ({ id }) => (
  <div 
    id={id} 
    className="absolute -top-32 left-0 w-full h-1 pointer-events-none opacity-0" 
    aria-hidden="true"
  />
);

// --- SECTIONS ---

const Navbar = memo(() => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (scrolled !== isScrolled) setScrolled(isScrolled);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <nav className="hidden md:block fixed w-full z-50 top-0 transition-all duration-300">
      <div 
        className={`mx-auto flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
          ${scrolled 
            ? 'bg-brand-black/70 backdrop-blur-xl border-b border-x border-slate-800/80 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.6)] rounded-b-[2.5rem] py-6 px-10 max-w-[90rem]' 
            : 'bg-transparent border-transparent py-10 px-10 max-w-[95rem]'
          }
        `}
      >
        <div className="flex items-end gap-5"> 
          <img src="/logo-agp.png" alt="AGP Logo" className="h-14 w-auto object-contain bg-white/5 rounded-lg px-2 border border-white/10" />
          <span className="text-white font-bold text-5xl tracking-tighter font-display flex items-center gap-2 drop-shadow-md leading-none translate-y-1.5">
             ENTERPRISES
          </span>
        </div>

        <div className="flex items-center gap-12">
          {NAV_LINKS.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-slate-300 hover:text-cyan-300 transition-colors text-sm uppercase tracking-[0.2em] font-bold font-display hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">
              {item}
            </a>
          ))}
          <a href="#contact" className="bg-gradient-to-r from-brand-orange to-red-500 text-white px-9 py-3.5 rounded-xl font-bold hover:shadow-[0_0_25px_rgba(249,115,22,0.6)] transition-all font-display tracking-widest border border-orange-400/50 text-base uppercase">
            Get Quote
          </a>
        </div>
      </div>
    </nav>
  );
});

const Hero = () => (
  <section className="relative min-h-screen flex items-center overflow-visible pt-20">
    <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
      <Reveal>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-cyan-300 text-sm font-bold tracking-widest uppercase mb-8 shadow-[0_0_15px_rgba(34,211,238,0.15)] backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-cyan-300 animate-pulse shadow-[0_0_10px_cyan]"/> Est. 2019
        </div>
        <h1 className="text-6xl md:text-8xl font-bold text-white leading-[0.9] mb-8 font-display text-depth">
          PRECISION <br />
          <span className="text-brand-orange drop-shadow-[0_0_35px_rgba(249,115,22,0.8)] relative z-10">
            IN PRINT.
          </span>
        </h1>
        <p className="text-slate-300 text-xl md:text-2xl mb-10 leading-relaxed max-w-lg font-light">
          Engineering your brand's physical identity with <span className="text-cyan-300 font-semibold drop-shadow-lg">industrial-grade perfection</span>.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a href="#contact" className="bg-brand-orange text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-600 transition-all shadow-[0_0_25px_rgba(249,115,22,0.5)] flex items-center justify-center gap-2 font-display uppercase tracking-wide border border-orange-400">
            Start Project <ArrowRight size={20} />
          </a>
          <a href="#portfolio" className="border border-slate-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-slate-800 hover:border-cyan-300 hover:text-cyan-300 transition-all flex items-center justify-center font-display uppercase tracking-wide backdrop-blur-md">
            Our Work
          </a>
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <div className="relative hidden lg:block h-[500px]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full -z-10 pointer-events-none"
             style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.1) 0%, rgba(0,0,0,0) 70%)' }}>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-black rounded-3xl border border-slate-700/50 p-1 shadow-[0_0_100px_-20px_rgba(249,115,22,0.4)] backdrop-blur-sm">
             <div className="w-full h-full bg-slate-900/90 rounded-2xl flex flex-col items-center justify-center text-slate-600 overflow-hidden relative">
                <Printer size={140} strokeWidth={0.5} className="mb-4 text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] relative z-10" />
                <p className="uppercase tracking-[0.5em] text-sm text-brand-orange font-bold relative z-10 drop-shadow-[0_0_10px_orange]">High Fidelity Output</p>
             </div>
          </div>
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute -right-6 top-8 bg-slate-800/60 backdrop-blur-md p-5 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.6)] max-w-xs z-20 border border-slate-600 border-l-4 border-l-cyan-400"
          >
            <div className="flex items-center gap-4 mb-2">
              <div className="p-3 bg-cyan-400/10 rounded-full text-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.4)]"><CheckCircle size={24} /></div>
              <div>
                 <span className="font-bold text-white block font-display text-lg">Order Delivered</span>
                 <span className="text-xs text-cyan-300 uppercase tracking-wider font-bold">Just Now</span>
              </div>
            </div>
            <p className="text-sm text-slate-300 font-medium">10,000 Brochures for Panasonic Pithampur.</p>
          </motion.div>
        </div>
      </Reveal>
    </div>
  </section>
);

// ... existing imports and code ...

const Services = () => (
  <section className="py-24 relative border-t border-slate-800">
    {/* INVISIBLE MARKER */}
    <ScrollAnchor id="services" />
    
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <SectionHeading dark subtitle="Comprehensive printing solutions tailored for businesses of all scales.">
        Our Services
      </SectionHeading>
      {/* ... rest of services content ... */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {SERVICES.map((service, idx) => (
          <Reveal dir="left" key={service.title} delay={idx * 0.05}>
            <StaticGlowCard className="rounded-2xl p-8 h-full">
               <div className="relative z-10">
                  <div className="h-14 w-14 bg-slate-800 text-slate-400 rounded-xl flex items-center justify-center mb-6 border border-slate-700 group-hover:bg-cyan-400 group-hover:text-brand-black group-hover:border-cyan-300 transition-all shadow-lg">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 font-display uppercase tracking-wide group-hover:text-cyan-300 transition-colors">{service.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed font-medium group-hover:text-slate-300">{service.desc}</p>
               </div>
            </StaticGlowCard>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const Portfolio = () => (
  <section className="py-24 relative border-t border-slate-900">
    {/* INVISIBLE MARKER */}
    <ScrollAnchor id="portfolio" />

    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <SectionHeading dark subtitle="A showcase of our recent industrial printing projects.">
        Featured Work
      </SectionHeading>
      {/* ... rest of portfolio content ... */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {PORTFOLIO.map((item, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-slate-800 border border-slate-700 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(249,115,22,0.3)] hover:border-orange-500/30 hover:scale-[1.02]">
              <div className={`absolute inset-0 ${item.color} opacity-20 group-hover:opacity-30 transition-opacity`} />
              <div className="absolute inset-0 flex items-center justify-center">
                 <ImageIcon size={48} className="text-slate-600 opacity-50" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <p className="text-xs font-bold text-brand-orange uppercase tracking-widest mb-1">{item.category}</p>
                <h3 className="text-xl font-bold text-white font-display group-hover:text-cyan-300 transition-colors">{item.title}</h3>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <div className="mt-12 text-center">
         <p className="text-slate-500 text-sm"> * Actual project photos coming soon.</p>
      </div>
    </div>
  </section>
);

const About = () => (
  <section className="py-32 text-white relative overflow-hidden border-t border-slate-800">
    {/* INVISIBLE MARKER */}
    <ScrollAnchor id="about" />

    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center relative z-10">
      {/* ... rest of about content ... */}
       <div className="grid grid-cols-2 gap-6 relative z-10">
        <TeamCard 
           name="M. Sivaprasad" role="Director" tag="LEADERSHIP" 
           img="/person-blue.png" 
           colorClass="text-cyan-300"
           glowColor="from-blue-600/50 via-cyan-500/20 to-transparent" 
        />
        <div className="mt-12">
            <TeamCard 
               name="Ajay Pandey" role="Ops Head" tag="EXECUTION" 
               img="/person-grey.png" 
               colorClass="text-brand-orange"
               glowColor="from-brand-orange/50 via-red-500/20 to-transparent"
               delay={0.2}
            />
        </div>
      </div>

      <div>
        <Reveal dir="right">
          <SectionHeading dark subtitle="Trusted by industry giants. Built on absolute reliability.">
            Why Choose AGP?
          </SectionHeading>
          <div className="space-y-8">
            {[
              { title: "Precision Tech", desc: "Latest offset machinery for crisp, vibrant results." },
              { title: "Strict Deadlines", desc: "We respect your time. Deliveries on schedule, always." },
              { title: "End-to-End", desc: "From design conceptualization to final finishing." }
            ].map((item, i) => (
              <div key={i} className="flex gap-5 group hover:translate-x-2 transition-transform duration-300 p-4 rounded-xl hover:bg-slate-800/30 border border-transparent hover:border-white/5 backdrop-blur-sm">
                <div className="mt-1 min-w-[32px] h-[32px] rounded-lg bg-slate-800 flex items-center justify-center border border-slate-700 text-brand-orange shadow-[0_0_15px_rgba(249,115,22,0.3)] group-hover:shadow-[0_0_25px_rgba(249,115,22,0.6)] transition-all">
                    <Star size={18} fill="currentColor" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold mb-2 text-white font-display uppercase group-hover:text-cyan-300 transition-colors drop-shadow-md">{item.title}</h4>
                  <p className="text-slate-400 leading-relaxed text-lg group-hover:text-slate-200">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

const Clients = () => (
  <section className="py-20 relative border-y border-slate-800">
    {/* INVISIBLE MARKER */}
    <ScrollAnchor id="clients" />

    <div className="max-w-7xl mx-auto px-6 relative z-10">
      {/* ... rest of clients content ... */}
       <Reveal>
        <div className="text-center mb-12">
            <h3 className="text-brand-orange font-display font-bold text-xl tracking-[0.3em] uppercase mb-4 drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]">Trusted By The Best</h3>
        </div>
      </Reveal>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
        {CLIENTS.map((client, i) => (
           <Reveal key={i} delay={i * 0.1}>
             <div className="flex flex-col items-center justify-center gap-4 group cursor-default p-6 hover:bg-slate-800/80 rounded-2xl transition-all border border-transparent hover:border-orange-500/30 backdrop-blur-sm duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-[0_0_30px_rgba(249,115,22,0.3)]">
                <div className="w-20 h-20 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 group-hover:text-cyan-300 group-hover:border-cyan-400 group-hover:shadow-[0_0_25px_rgba(34,211,238,0.4)] transition-all duration-300">
                    {client.icon}
                </div>
                <div className="text-center">
                    <h4 className="text-white font-bold font-display text-xl group-hover:text-cyan-300 transition-colors">{client.name}</h4>
                    <p className="text-xs text-slate-500 uppercase tracking-widest">{client.type}</p>
                </div>
             </div>
           </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const Contact = () => {
  const formRef = useRef();
  const [status, setStatus] = useState('idle');
  // ... existing submit handler ...
  const handleSubmit = (e) => { /* ... */ };

  return (
    <section className="py-24 relative scroll-mt-32">
       {/* INVISIBLE MARKER - Removed the ref from section, formRef is on form anyway */}
       <ScrollAnchor id="contact" />
       
       <div className="max-w-7xl mx-auto px-6 relative z-10">
         {/* ... rest of contact content ... */}
         <Reveal>
          {/* GLASS CONTAINER */}
          <div className="rounded-[2rem] overflow-hidden shadow-2xl grid lg:grid-cols-5 border border-white/10 bg-slate-900/40 backdrop-blur-xl">
             {/* ... content ... */}
             <div className="lg:col-span-2 bg-slate-900/60 p-12 text-white flex flex-col justify-between relative overflow-hidden border-r border-white/5">
                {/* ... left column ... */}
                  <div className="absolute top-0 right-0 p-40 bg-brand-orange/10 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none"></div>
                  <div className="relative z-10">
                    <h3 className="text-4xl font-bold mb-6 font-display text-white text-depth">LET'S PRINT.</h3>
                    <div className="space-y-8 mb-12">
                      <div className="flex items-center gap-5">
                        <Phone className="text-brand-orange drop-shadow-[0_0_8px_orange]" size={24} />
                        <div>
                          <p className="font-mono text-lg font-bold text-white tracking-wide">+91-7999406413</p>
                          <p className="font-mono text-lg font-bold text-slate-400 tracking-wide">+91-8269897212</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-5">
                        <Send className="text-brand-orange drop-shadow-[0_0_8px_orange]" size={24} />
                        <p className="font-mono text-sm md:text-lg font-bold text-white tracking-wide text-ellipsis overflow-hidden">
                          agpent2019@gmail.com
                        </p>
                      </div>

                      <div className="flex items-start gap-5">
                        <MapPin className="text-brand-orange drop-shadow-[0_0_8px_orange] mt-1 shrink-0" size={24} />
                        <p className="font-mono text-lg font-bold text-white tracking-wide leading-relaxed">
                          Flat A36/104, Treasure Fantasy<br/>
                          CAT Road, Rau<br/>
                          Indore - 453331
                        </p>
                      </div>
                    </div>

                    {/* Fixed Map Implementation */}
                    <div className="w-full h-48 rounded-xl overflow-hidden border border-slate-700/50 shadow-inner relative group">
                        <iframe 
                          src={MAP_EMBED_URL}
                          width="100%" 
                          height="100%" 
                          style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(1.2)' }} 
                          allowFullScreen="" 
                          loading="lazy" 
                          className="opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                          referrerPolicy="no-referrer-when-downgrade"
                          title="Google Maps Location"
                        />
                    </div>
                  </div>
             </div>

             {/* RIGHT COLUMN: FORM */}
            <div className="lg:col-span-3 p-8 md:p-12">
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                 {/* ... form inputs ... */}
                  <div className="grid md:grid-cols-2 gap-6">
                  <FormInput name="user_name" required type="text" placeholder="Your Name" />
                  <FormInput name="user_phone" required type="tel" placeholder="+91-XXXXXXXXXX" />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <FormInput name="user_email" required type="email" placeholder="Email Address" />
                  
                  <div className="relative">
                    <select name="service_interest" className="w-full px-6 py-4 rounded-xl border border-slate-700 bg-slate-800/50 focus:bg-slate-800 focus:border-brand-orange outline-none transition-all font-medium text-white appearance-none cursor-pointer">
                      <option value="General" className="bg-slate-900 text-white">General Inquiry</option>
                      {SERVICES.map(s => <option key={s.title} value={s.title} className="bg-slate-900 text-white">{s.title}</option>)}
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-brand-orange">
                      <svg width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                  </div>
                </div>

                <textarea name="message" required rows={4} className="w-full px-6 py-4 rounded-xl border border-slate-700 bg-slate-800/50 focus:bg-slate-800 focus:border-brand-orange outline-none transition-all font-medium text-white placeholder-slate-500 backdrop-blur-sm" placeholder="Message..." />
                
                <button 
                  type="submit"
                  disabled={status === 'sending' || status === 'success'}
                  className={`w-full font-bold py-5 rounded-xl transition-all flex items-center justify-center gap-3 text-lg font-display uppercase tracking-wider shadow-[0_0_20px_rgba(0,0,0,0.3)] border
                    ${status === 'success' ? 'bg-green-600 text-white border-green-500 shadow-green-900/20' : 
                      status === 'error' ? 'bg-red-600 text-white border-red-500' : 
                      'bg-brand-orange text-white hover:bg-orange-600 border-orange-500 shadow-[0_0_30px_rgba(249,115,22,0.4)]'}`}
                >
                  {status === 'sending' ? <Loader2 className="animate-spin" /> : <Send size={20} />}
                  {status === 'sending' ? 'Sending...' : status === 'success' ? 'Enquiry Sent!' : 'Send Enquiry'}
                </button>
              </form>
            </div>
          </div>
         </Reveal>
       </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-brand-black text-slate-500 py-12 border-t border-slate-900 text-sm relative z-10">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex items-center gap-3">
         <img src="/logo-agp.png" alt="Footer Logo" className="h-6 grayscale opacity-50 hover:grayscale-0 transition-all" />
         <p>© {new Date().getFullYear()} AGP Enterprises. Precision Printing Solutions.</p>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="antialiased bg-brand-black selection:bg-brand-orange selection:text-white overflow-x-hidden relative min-h-screen">
      <IndustrialBackground />
      <PolishedGlassLayer />
      <Navbar />
      <Hero />
      <Services />
      <Portfolio />
      <About />
      <Clients />
      <Contact />
      <Footer />
    </div>
  );
}