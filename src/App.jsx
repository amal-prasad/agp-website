import React, { useState, useRef, useEffect, memo } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { 
  Printer, Layers, Send, Phone, MapPin, CheckCircle, 
  Palette, FileText, CreditCard, User, 
  Image as ImageIcon, Loader2, ArrowRight, Building2, GraduationCap, Factory, Star,
  Sun, Moon, Monitor 
} from 'lucide-react';

// --- STATIC CONSTANTS ---
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

const REVEAL_VARIANTS = {
  up:    { opacity: 0, y: 50 },
  left:  { opacity: 0, x: -50 },
  right: { opacity: 0, x: 50 }
};

// --- THEME HOOK ---
const useTheme = () => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem('theme') || 'system'
  );

  useEffect(() => {
    const element = document.documentElement;
    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = () => {
      const isDark = theme === 'dark' || (theme === 'system' && darkQuery.matches);
      if (isDark) {
        element.classList.add('dark');
        element.style.colorScheme = 'dark';
      } else {
        element.classList.remove('dark');
        element.style.colorScheme = 'light';
      }
    };

    applyTheme();
    
    const handleChange = () => {
      if (theme === 'system') applyTheme();
    };

    darkQuery.addEventListener('change', handleChange);
    
    if (theme === 'system') localStorage.removeItem('theme');
    else localStorage.setItem('theme', theme);

    return () => darkQuery.removeEventListener('change', handleChange);
  }, [theme]);

  return { theme, setTheme };
};

// --- ANIMATION ENGINE ---
const Reveal = memo(({ children, dir = "up", delay = 0, className = "" }) => (
  <motion.div
    initial={REVEAL_VARIANTS[dir]}
    whileInView={{ opacity: 1, x: 0, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
));

// --- BACKGROUND COMPONENTS ---

// Locate the IndustrialBackground component and replace it with this:

const IndustrialBackground = memo(() => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#F0F4F8] dark:bg-[#050505] transition-colors duration-700">
    
    {/* --- LIGHT MODE LAYERS (MODIFIED) --- */}
    <div className="absolute inset-0 dark:hidden">
      
      {/* 1. The Texture Layer: Blurred & Low Opacity */}
      <div 
        className="absolute inset-0 opacity-75 blur-[3px]"
        style={{ 
          backgroundImage: `url('/pexels-arina-krasnikova-7002683.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          // Performance optimization for full-screen filters
          willChange: 'transform', 
          transform: 'translateZ(0)' 
        }}
      />

      {/* 2. The Wash Layer: A white veil to reduce contrast range */}
      <div className="absolute inset-0 bg-white/30 mix-blend-overlay" />

      {/* 3. The Vignette: Focuses eye to center, completely independent of the blurred image */}
      <div 
        className="absolute inset-0"
        style={{ 
          background: `radial-gradient(circle at center, rgba(240, 244, 248, 0.2) 0%, rgba(240, 244, 248, 0.8) 100%)`
        }}
      />
    </div>

    {/* Optional: Warm Tint (Retained but made more subtle) */}
    <div className="absolute inset-0 bg-orange-500/[0.01] dark:hidden pointer-events-none mix-blend-multiply" />

    {/* --- DARK MODE LAYERS (UNCHANGED) --- */}
    <div className="hidden dark:block">
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent" />
      <div className="absolute -top-20 -right-20 w-[800px] h-[800px] bg-orange-600/10 blur-[100px] rounded-full mix-blend-screen" />
      <div className="absolute -bottom-40 -left-20 w-[800px] h-[800px] bg-red-600/5 blur-[100px] rounded-full mix-blend-screen" />
      <div className="absolute inset-0 bg-[size:100px_100px] bg-grid-pattern opacity-[0.03]" />
    </div>
   
  </div>
));

const PolishedGlassLayer = memo(() => (
  <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden hidden dark:block">
    <div className="absolute -top-[10%] left-1/2 -translate-x-1/2 w-[70%] h-[50%] bg-white/[0.03] blur-[100px] rounded-[100%] mix-blend-overlay" />
    <div className="absolute -bottom-[20%] left-1/2 -translate-x-1/2 w-[80%] h-[60%] bg-cyan-500/[0.05] blur-[120px] rounded-full mix-blend-screen" />
    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-transparent opacity-50" />
  </div>
));

// --- UI COMPONENTS ---
const ThemeToggle = ({ theme, setTheme, scrolled }) => {
  return (
    <div className={`p-1 rounded-full border flex items-center relative transition-colors duration-300 shadow-sm
      ${scrolled 
        ? 'bg-white/80 dark:bg-slate-800 border-slate-300 dark:border-slate-700' 
        : 'bg-[#F4EDE4]/20 border-[#F4EDE4]/30 dark:bg-slate-800 dark:border-slate-700' 
      }`}>
      <motion.div 
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={`absolute h-7 w-7 rounded-full shadow-sm border z-0 
          ${theme === 'light' ? 'left-1' : theme === 'system' ? 'left-[calc(50%-14px)]' : 'left-[calc(100%-32px)]'}
          ${scrolled
             ? 'bg-white dark:bg-slate-600 border-slate-100 dark:border-transparent'
             : 'bg-[#F4EDE4] dark:bg-slate-600 border-transparent'
          }
        `}
      />
      <button onClick={() => setTheme('light')} className={`relative z-10 p-1.5 rounded-full transition-colors ${theme === 'light' ? 'text-orange-600' : scrolled ? 'text-slate-500' : 'text-[#F4EDE4]/80'}`}>
        <Sun size={14} />
      </button>
      <button onClick={() => setTheme('system')} className={`relative z-10 p-1.5 rounded-full transition-colors ${theme === 'system' ? 'text-cyan-600 dark:text-cyan-400' : scrolled ? 'text-slate-500' : 'text-[#F4EDE4]/80'}`}>
        <Monitor size={14} />
      </button>
      <button onClick={() => setTheme('dark')} className={`relative z-10 p-1.5 rounded-full transition-colors ${theme === 'dark' ? 'text-blue-400' : scrolled ? 'text-slate-500' : 'text-[#F4EDE4]/80'}`}>
        <Moon size={14} />
      </button>
    </div>
  );
};

const StaticGlowCard = memo(({ children, className = "" }) => (
  <div className={`group relative border 
    border-white/60 dark:border-slate-800 
    bg-[#fafafa]/90 dark:bg-slate-900/20 
    backdrop-blur-xl dark:backdrop-blur-md 
    overflow-hidden transition-all duration-300 
    hover:-translate-y-2 
    shadow-lg hover:shadow-xl dark:shadow-[0_0_30px_rgba(249,115,22,0.15)] dark:hover:shadow-[0_0_30px_rgba(249,115,22,0.3)] 
    hover:border-orange-500/30 ${className}`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent opacity-100 dark:opacity-0 pointer-events-none" />
    <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
      style={{ background: `radial-gradient(circle at 50% 0%, rgba(34, 211, 238, 0.15) 20%, rgba(34, 211, 238, 0.05) 50%, transparent 80%)` }}
    />
    <div className="absolute inset-0 border border-cyan-500/0 group-hover:border-cyan-500/20 rounded-xl transition-colors duration-500 pointer-events-none" />
    <div className="relative h-full z-10">{children}</div>
  </div>
));

const SectionHeading = memo(({ children, subtitle }) => (
  <Reveal>
    <div className="mb-12 md:mb-16 relative z-10">
      {/* LEVITATION PHYSICS:
        Light Mode: Downward shadow (Distance from paper)
        Dark Mode:  Outward glow + Y-offset (Hovering neon) 
      */}
      <h2 className="text-4xl md:text-6xl font-bold mb-4 font-display uppercase tracking-wide text-orange-600 dark:text-white drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)] dark:drop-shadow-[0_4px_15px_rgba(34,211,238,0.5)] transition-all">
        {children}
      </h2>
      
      <div className="h-1 w-32 mb-6 bg-gradient-to-r from-orange-500 via-orange-400 to-transparent rounded-full shadow-[0_0_20px_orange]" />
      
      <p className="text-xl max-w-2xl text-[#3A2F26] dark:text-slate-300 transition-colors 
        font-bold dark:font-normal
        [text-shadow:0_0_20px_rgba(255,255,255,0.8)] dark:[text-shadow:none]">
        {subtitle}
      </p>
    </div>
  </Reveal>
));

const FormInput = memo((props) => (
  <input 
    {...props}
    className="w-full px-6 py-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-800/50 focus:bg-white dark:focus:bg-slate-800 focus:border-orange-500 outline-none transition-all font-medium text-black dark:text-white placeholder-slate-600 dark:placeholder-slate-500 backdrop-blur-sm shadow-sm focus:shadow-md"
  />
));

const TeamCard = memo(({ name, role, tag, img, colorClass, glowColor, delay = 0 }) => (
  <Reveal dir="left" delay={delay}>
    <div className="relative bg-[#fafafa] dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl dark:shadow-2xl group hover:border-orange-500/30 transition-all duration-300 mt-0 hover:-translate-y-2 hover:shadow-2xl dark:hover:shadow-[0_0_30px_rgba(249,115,22,0.3)]">
        <div className="aspect-[3/4] relative overflow-hidden rounded-t-2xl bg-white dark:bg-slate-900/50">
          <div className={`absolute bottom-0 left-0 w-full h-[80%] bg-gradient-to-t ${glowColor} blur-[50px] opacity-40 dark:opacity-60 group-hover:opacity-100 transition-all duration-500 z-0`} />
          <img src={img} loading="lazy" decoding="async" alt={role} className="absolute bottom-0 left-0 w-full h-[105%] object-contain object-bottom drop-shadow-2xl z-0 scale-100 group-hover:scale-105 transition-transform duration-500 origin-bottom" />
        </div>
        <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 relative z-10 rounded-b-2xl transition-colors">
          {/* LEVITATION: Dark mode subtle lift */}
          <h4 className="text-black dark:text-white font-display text-xl font-bold uppercase mb-1 drop-shadow-[0_3px_2px_rgba(0,0,0,0.3)] dark:drop-shadow-[0_4px_10px_rgba(255,255,255,0.2)]">{name}</h4>
          <p className="font-bold text-slate-700 dark:text-slate-300 font-display text-sm uppercase">{role}</p>
          <p className={`text-xs ${colorClass} tracking-widest font-bold mt-1`}>{tag}</p>
        </div>
    </div>
  </Reveal>
));

const ScrollAnchor = ({ id }) => <div id={id} className="absolute -top-32 left-0 w-full h-1 pointer-events-none opacity-0" aria-hidden="true" />;

// --- SECTIONS ---

const Navbar = memo(({ theme, setTheme }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (scrolled !== isScrolled) setScrolled(isScrolled);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
      bg-white/5 dark:bg-[#050505]/80
      backdrop-blur-xl
      border-b border-white/10
      shadow-[0_4px_30px_rgba(0,0,0,0.1)]
      ${scrolled ? 'py-4 rounded-b-2xl md:rounded-b-[2rem]' : 'py-6 md:py-8 rounded-b-none'}
    `}>
      <div className="max-w-[95rem] mx-auto px-6 md:px-10 flex items-center justify-between">
        
        {/* LOGO */}
        <div className="flex items-end gap-3 md:gap-5"> 
          <img src="/logo-agp.png" alt="AGP Logo" className="h-10 md:h-12 w-auto object-contain opacity-90" />
          {/* LEVITATION: White lift in dark mode */}
          <span className="font-bold text-3xl md:text-5xl tracking-tighter font-display flex items-center gap-2 leading-none -mb-1 md:translate-y-1.5 transition-colors text-[#F4EDE4] dark:text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
             ENTERPRISES
          </span>
        </div>

        {/* NAVIGATION LINKS */}
        <div className="hidden md:flex items-center gap-8 lg:gap-12">
          {NAV_LINKS.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} 
               // LEVITATION: Cyan glow in dark mode
               className="text-sm uppercase tracking-[0.2em] font-bold font-display transition-colors 
               text-[#F4EDE4]/90 hover:text-orange-500 dark:text-slate-300 dark:hover:text-cyan-300 
               drop-shadow-[0_3px_2px_rgba(0,0,0,0.3)] dark:drop-shadow-[0_0_8px_rgba(34,211,238,0.3)] hover:drop-shadow-[0_5px_5px_rgba(249,115,22,0.5)]"
            >
              {item}
            </a>
          ))}
          
          <ThemeToggle theme={theme} setTheme={setTheme} scrolled={scrolled} />

          <a href="#contact" className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-3 rounded-xl font-bold hover:shadow-[0_0_25px_rgba(249,115,22,0.6)] transition-all font-display tracking-widest border border-orange-400/50 text-sm uppercase">
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
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-orange-600 dark:text-cyan-300 text-sm font-bold tracking-widest uppercase mb-8 shadow-sm dark:shadow-[0_0_15px_rgba(34,211,238,0.15)] backdrop-blur-md transition-colors">
          <span className="w-2 h-2 rounded-full bg-orange-500 dark:bg-cyan-300 animate-pulse dark:shadow-[0_0_10px_cyan]"/> Est. 2019
        </div>
        
        {/* LEVITATION: Huge atmospheric glow in dark mode */}
        <h1 className="text-6xl md:text-8xl font-bold leading-[0.9] mb-8 font-display transition-colors">
          <span className="block text-[#F4EDE4] dark:text-white drop-shadow-[0_15px_10px_rgba(0,0,0,0.25)] dark:drop-shadow-[0_0_35px_rgba(255,255,255,0.3)]">PRECISION</span> 
          <span className="block text-orange-600 drop-shadow-[0_15px_10px_rgba(0,0,0,0.25)] dark:drop-shadow-[0_0_50px_rgba(249,115,22,0.9)] relative z-10">
            IN PRINT.
          </span>
        </h1>

        <p className="text-[#F4EDE4] dark:text-slate-300 text-xl md:text-2xl mb-10 leading-relaxed max-w-lg 
            font-bold dark:font-normal 
            transition-colors [text-shadow:0_2px_12px_rgba(0,0,0,0.4)] dark:[text-shadow:none]">
            Engineering your brand's physical identity with <span className="text-orange-600 dark:text-cyan-300 
            font-extrabold dark:font-semibold
            dark:drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">industrial-grade perfection</span>.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <a href="#contact" className="bg-orange-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-700 transition-all shadow-[0_4px_15px_rgba(249,115,22,0.3)] dark:shadow-[0_0_25px_rgba(249,115,22,0.5)] flex items-center justify-center gap-2 font-display uppercase tracking-wide border border-orange-500">
            Start Project <ArrowRight size={20} />
          </a>
          
          <a href="#portfolio" className="border border-[#F4EDE4]/40 dark:border-slate-600 text-[#F4EDE4] dark:text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#F4EDE4] hover:text-orange-900 dark:hover:bg-slate-800 dark:hover:border-cyan-300 dark:hover:text-cyan-300 transition-all flex items-center justify-center font-display uppercase tracking-wide backdrop-blur-sm shadow-sm dark:shadow-none bg-white/5 dark:bg-transparent">
            Our Work
          </a>
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <div className="relative hidden lg:block h-[500px]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full -z-10 pointer-events-none"
             style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.1) 0%, rgba(0,0,0,0) 70%)' }}>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-black rounded-3xl border border-slate-200 dark:border-slate-700/50 p-1 shadow-2xl dark:shadow-[0_0_100px_-20px_rgba(249,115,22,0.4)] backdrop-blur-sm transition-colors">
             <div className="w-full h-full bg-slate-50 dark:bg-slate-900/90 rounded-2xl flex flex-col items-center justify-center text-slate-600 overflow-hidden relative transition-colors">
                <Printer size={140} strokeWidth={0.5} className="mb-4 text-slate-800 dark:text-white drop-shadow-xl dark:drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] relative z-10 transition-colors" />
                <p className="uppercase tracking-[0.5em] text-sm text-orange-600 dark:text-orange-500 font-bold relative z-10 drop-shadow-sm dark:drop-shadow-[0_0_10px_orange]">High Fidelity Output</p>
             </div>
          </div>
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute -right-6 top-8 bg-white/95 dark:bg-slate-800/60 backdrop-blur-md p-5 rounded-xl shadow-xl dark:shadow-[0_0_30px_rgba(0,0,0,0.6)] max-w-xs z-20 border border-slate-200 dark:border-slate-600 border-l-4 border-l-orange-500 dark:border-l-cyan-400"
          >
            <div className="flex items-center gap-4 mb-2">
              <div className="p-3 bg-orange-100 dark:bg-cyan-400/10 rounded-full text-orange-600 dark:text-cyan-300 shadow-sm dark:shadow-[0_0_10px_rgba(34,211,238,0.4)]"><CheckCircle size={24} /></div>
              <div>
                 <span className="font-bold text-black dark:text-white block font-display text-lg">Order Delivered</span>
                 <span className="text-xs text-orange-500 dark:text-cyan-300 uppercase tracking-wider font-bold">Just Now</span>
              </div>
            </div>
            <p className="text-sm text-slate-900 dark:text-slate-300 font-medium">10,000 Brochures for Panasonic Pithampur.</p>
          </motion.div>
        </div>
      </Reveal>
    </div>
  </section>
);

const Services = () => (
  <section className="py-24 relative border-t border-[#F4EDE4]/20 dark:border-slate-800 transition-colors">
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
                  <div className="h-14 w-14 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-400 rounded-xl flex items-center justify-center mb-6 border border-slate-200 dark:border-slate-700 group-hover:bg-orange-500 dark:group-hover:bg-cyan-400 group-hover:text-white dark:group-hover:text-black group-hover:border-orange-400 dark:group-hover:border-cyan-300 transition-all shadow-sm">
                    {service.icon}
                  </div>
                  {/* LEVITATION: Card titles lift in dark mode */}
                  <h3 className="text-xl font-bold text-[#3A2F26] dark:text-white mb-3 font-display uppercase tracking-wide group-hover:text-orange-600 dark:group-hover:text-cyan-300 transition-colors drop-shadow-[0_3px_2px_rgba(0,0,0,0.2)] dark:drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">{service.title}</h3>
                  
                  <p className="text-[#3A2F26] dark:text-slate-400 text-sm leading-relaxed 
                    font-bold dark:font-normal 
                    group-hover:text-black dark:group-hover:text-slate-300 [text-shadow:0_0_15px_rgba(255,255,255,0.9)] dark:[text-shadow:none]">
                    {service.desc}
                  </p>
               </div>
            </StaticGlowCard>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const Portfolio = () => (
  <section className="py-24 relative border-t border-[#F4EDE4]/20 dark:border-slate-900 transition-colors bg-white/5 dark:bg-transparent">
    <ScrollAnchor id="portfolio" />
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <SectionHeading subtitle="A showcase of our recent industrial printing projects.">
        Featured Work
      </SectionHeading>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {PORTFOLIO.map((item, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#fafafa] dark:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-all duration-300 hover:-translate-y-2 shadow-sm hover:shadow-xl dark:hover:shadow-[0_0_30px_rgba(249,115,22,0.3)] hover:border-orange-500/30 hover:scale-[1.02]">
              <div className={`absolute inset-0 ${item.color} opacity-10 dark:opacity-20 group-hover:opacity-20 dark:group-hover:opacity-30 transition-opacity`} />
              <div className="absolute inset-0 flex items-center justify-center">
                 <ImageIcon size={48} className="text-slate-400 dark:text-slate-600 opacity-50" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent dark:from-black dark:opacity-90" />
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <p className="text-xs font-bold text-orange-600 dark:text-orange-500 uppercase tracking-widest mb-1">{item.category}</p>
                {/* LEVITATION: Portfolio titles lift in dark mode */}
                <h3 className="text-xl font-bold text-black dark:text-white font-display group-hover:text-orange-600 dark:group-hover:text-cyan-300 transition-colors drop-shadow-[0_3px_2px_rgba(0,0,0,0.3)] dark:drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">{item.title}</h3>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <div className="mt-12 text-center">
         <p className="text-[#3A2F26] dark:text-slate-500 text-sm font-bold"> * Actual project photos coming soon.</p>
      </div>
    </div>
  </section>
);

const About = () => (
  <section className="py-32 relative overflow-hidden border-t border-[#F4EDE4]/20 dark:border-slate-800 transition-colors">
    <ScrollAnchor id="about" />
    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center relative z-10">
       <div className="grid grid-cols-2 gap-6 relative z-10">
        <TeamCard 
           name="M. Sivaprasad" role="Director" tag="LEADERSHIP" 
           img="/person-blue.png" 
           colorClass="text-cyan-600 dark:text-cyan-300"
           glowColor="from-blue-400/30 dark:from-blue-600/50 via-cyan-400/10 dark:via-cyan-500/20 to-transparent" 
        />
        <div className="mt-12">
            <TeamCard 
               name="Ajay Pandey" role="Ops Head" tag="EXECUTION" 
               img="/person-grey.png" 
               colorClass="text-orange-600 dark:text-orange-500"
               glowColor="from-orange-400/30 dark:from-orange-600/50 via-red-400/10 dark:via-red-500/20 to-transparent"
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
              <div key={i} className="flex gap-5 group hover:translate-x-2 transition-transform duration-300 p-4 rounded-xl bg-white/50 hover:bg-white dark:hover:bg-slate-800/30 border border-transparent hover:border-slate-200 dark:hover:border-white/5 backdrop-blur-sm shadow-sm dark:shadow-none">
                <div className="mt-1 min-w-[32px] h-[32px] rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700 text-orange-500 shadow-sm dark:shadow-[0_0_15px_rgba(249,115,22,0.3)] group-hover:shadow-[0_0_25px_rgba(249,115,22,0.6)] transition-all">
                    <Star size={18} fill="currentColor" />
                </div>
                <div>
                  {/* LEVITATION: Card headers */}
                  <h4 className="text-2xl font-bold mb-2 text-[#3A2F26] dark:text-white font-display uppercase group-hover:text-orange-600 dark:group-hover:text-cyan-300 transition-colors drop-shadow-[0_2px_2px_rgba(0,0,0,0.2)] dark:drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">{item.title}</h4>
                  
                  <p className="text-[#3A2F26] dark:text-slate-400 leading-relaxed text-lg 
                    font-bold dark:font-normal 
                    group-hover:text-black dark:group-hover:text-slate-200 [text-shadow:0_0_15px_rgba(255,255,255,0.9)] dark:[text-shadow:none]">
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
);

const Clients = () => (
  <section className="py-20 relative border-y border-[#F4EDE4]/20 dark:border-slate-800 transition-colors bg-white/5 dark:bg-transparent">
    <ScrollAnchor id="clients" />
    <div className="max-w-7xl mx-auto px-6 relative z-10">
       <Reveal>
        <div className="text-center mb-12">
            <h3 className="text-orange-600 dark:text-orange-500 font-display font-bold text-xl tracking-[0.3em] uppercase mb-4 drop-shadow-sm dark:drop-shadow-[0_0_15px_rgba(249,115,22,0.6)]">Trusted By The Best</h3>
        </div>
      </Reveal>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
        {CLIENTS.map((client, i) => (
           <Reveal key={i} delay={i * 0.1}>
             <div className="flex flex-col items-center justify-center gap-4 group cursor-default p-6 
                bg-black/70 hover:bg-black/90 dark:bg-black/[0.85] dark:hover:bg-black 
                rounded-2xl transition-all duration-300 
                border border-white/10 hover:border-orange-500/50 
                backdrop-blur-xl shadow-lg hover:shadow-2xl 
                hover:-translate-y-2 hover:scale-105"
             >
                <div className="w-20 h-20 rounded-2xl 
                    bg-white/5 border border-white/10 
                    flex items-center justify-center 
                    text-slate-300 group-hover:text-white 
                    group-hover:bg-orange-600 group-hover:border-orange-500 
                    group-hover:shadow-[0_0_25px_rgba(249,115,22,0.4)] 
                    transition-all duration-300"
                >
                    {client.icon}
                </div>
                
                <div className="text-center">
                    <h4 className="text-white font-bold font-display text-xl group-hover:text-orange-500 transition-colors drop-shadow-md">
                        {client.name}
                    </h4>
                    <p className="text-xs text-slate-400 group-hover:text-slate-200 uppercase tracking-widest mt-1">
                        {client.type}
                    </p>
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formRef.current) return;
    setStatus('sending');
    try {
      await emailjs.sendForm(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        formRef.current,
        EMAILJS_CONFIG.PUBLIC_KEY
      );
      setStatus('success');
      e.target.reset();
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section className="py-24 relative scroll-mt-32">
       <ScrollAnchor id="contact" />
       
       <div className="max-w-7xl mx-auto px-6 relative z-10">
         <Reveal>
          <div className="rounded-[2rem] overflow-hidden shadow-2xl grid lg:grid-cols-5 border border-slate-200 dark:border-white/10 bg-white/95 dark:bg-slate-900/40 backdrop-blur-xl transition-colors">
             <div className="lg:col-span-2 bg-slate-50 dark:bg-slate-900/60 p-12 text-slate-900 dark:text-white flex flex-col justify-between relative overflow-hidden border-r border-slate-200 dark:border-white/5 transition-colors">
                  <div className="absolute top-0 right-0 p-40 bg-orange-500/10 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none"></div>
                  <div className="relative z-10">
                    <h3 className="text-4xl font-bold mb-6 font-display text-black dark:text-white transition-colors">LET'S PRINT.</h3>
                    <div className="space-y-8 mb-12">
                      <div className="flex items-center gap-5">
                        <Phone className="text-orange-600 dark:text-orange-500 drop-shadow-sm dark:drop-shadow-[0_0_8px_orange]" size={24} />
                        <div>
                          <p className="font-mono text-lg font-bold text-slate-900 dark:text-white tracking-wide">+91-7999406413</p>
                          <p className="font-mono text-lg font-bold text-slate-600 dark:text-slate-400 tracking-wide">+91-8269897212</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-5">
                        <Send className="text-orange-600 dark:text-orange-500 drop-shadow-sm dark:drop-shadow-[0_0_8px_orange]" size={24} />
                        <p className="font-mono text-sm md:text-lg font-bold text-slate-900 dark:text-white tracking-wide text-ellipsis overflow-hidden">
                          agpent2019@gmail.com
                        </p>
                      </div>

                      <div className="flex items-start gap-5">
                        <MapPin className="text-orange-600 dark:text-orange-500 drop-shadow-sm dark:drop-shadow-[0_0_8px_orange] mt-1 shrink-0" size={24} />
                        <p className="font-mono text-lg font-bold text-slate-900 dark:text-white tracking-wide leading-relaxed">
                          Flat A36/104, Treasure Fantasy<br/>
                          CAT Road, Rau<br/>
                          Indore - 453331
                        </p>
                      </div>
                    </div>

                    <div className="w-full h-48 rounded-xl overflow-hidden border border-slate-300 dark:border-slate-700/50 shadow-inner relative group">
                        <iframe 
                          src={MAP_EMBED_URL}
                          width="100%" 
                          height="100%" 
                          style={{ border: 0 }}
                          allowFullScreen="" 
                          loading="lazy" 
                          className="opacity-80 group-hover:opacity-100 transition-all duration-500 grayscale dark:grayscale-0 dark:invert-[.9] dark:hue-rotate-180 dark:contrast-125"
                          referrerPolicy="no-referrer-when-downgrade"
                          title="Google Maps Location"
                        />
                    </div>
                  </div>
             </div>

            <div className="lg:col-span-3 p-8 md:p-12">
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormInput name="user_name" required type="text" placeholder="Your Name" />
                  <FormInput name="user_phone" required type="tel" placeholder="+91-XXXXXXXXXX" />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <FormInput name="user_email" required type="email" placeholder="Email Address" />
                  
                  <div className="relative">
                    <select name="service_interest" className="w-full px-6 py-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-800/50 focus:bg-white dark:focus:bg-slate-800 focus:border-orange-500 outline-none transition-all font-medium text-black dark:text-white appearance-none cursor-pointer shadow-sm">
                      <option value="General" className="bg-white dark:bg-slate-900 text-black dark:text-white">General Inquiry</option>
                      {SERVICES.map(s => <option key={s.title} value={s.title} className="bg-white dark:bg-slate-900 text-black dark:text-white">{s.title}</option>)}
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-orange-500">
                      <svg width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                  </div>
                </div>

                <textarea name="message" required rows={4} className="w-full px-6 py-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-800/50 focus:bg-white dark:focus:bg-slate-800 focus:border-orange-500 outline-none transition-all font-medium text-black dark:text-white placeholder-slate-600 dark:placeholder-slate-500 backdrop-blur-sm shadow-sm" placeholder="Message..." />
                
                <button 
                  type="submit"
                  disabled={status === 'sending' || status === 'success'}
                  className={`w-full font-bold py-5 rounded-xl transition-all flex items-center justify-center gap-3 text-lg font-display uppercase tracking-wider shadow-lg dark:shadow-[0_0_20px_rgba(0,0,0,0.3)] border
                    ${status === 'success' ? 'bg-green-600 text-white border-green-500 shadow-green-900/20' : 
                      status === 'error' ? 'bg-red-600 text-white border-red-500' : 
                      'bg-orange-600 text-white hover:bg-orange-700 border-orange-500 hover:shadow-[0_5px_20px_rgba(249,115,22,0.4)]'}`}
                >
                  {status === 'sending' ? <Loader2 className="animate-spin" /> : <Send size={20} />}
                  {status === 'sending' ? 'Sending...' : status === 'success' ? 'Enquiry Sent!' : status === 'error' ? 'Failed - Retry' : 'Send Enquiry'}
                </button>
              </form>
            </div>
          </div>
         </Reveal>
       </div>
    </section>
  );
};

const Footer = memo(() => (
  <footer className="bg-[#F4EDE4]/90 dark:bg-black text-slate-900 dark:text-slate-500 py-12 border-t border-slate-200 dark:border-slate-900 text-sm relative z-10 transition-colors backdrop-blur-sm">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex items-center gap-3">
         <img src="/logo-agp.png" alt="Footer Logo" className="h-6 grayscale opacity-80 hover:grayscale-0 transition-all" />
         <p className="font-medium">© {new Date().getFullYear()} AGP Enterprises. Precision Printing Solutions.</p>
      </div>
    </div>
  </footer>
));

// --- MAIN WRAPPER ---
export default function App() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="antialiased bg-[#F0F4F8] dark:bg-[#050505] text-slate-900 dark:text-slate-100 transition-colors duration-700 selection:bg-orange-500 selection:text-white overflow-x-hidden relative min-h-screen">
      <IndustrialBackground />
      <PolishedGlassLayer />
      <Navbar theme={theme} setTheme={setTheme} />
      <main className="relative z-10">
        <Hero />
        <Services />
        <Portfolio />
        <About />
        <Clients />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}