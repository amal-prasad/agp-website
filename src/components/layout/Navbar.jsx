import React, { useState, useEffect, useRef, memo } from 'react';
import { motion } from 'framer-motion';
import ThemeToggle from '../ui/ThemeToggle';
import { throttle } from '../../utils/performance';

const NAV_LINKS = ['Services', 'Portfolio', 'About', 'Contact'];

const Navbar = memo(({ theme, setTheme }) => {
    const [visible, setVisible] = useState(true);
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = Math.max(0, window.scrollY);
            const isAtTop = currentScrollY < 50;
            const isScrollingUp = currentScrollY < lastScrollY.current;

            setScrolled(!isAtTop);
            setVisible(isAtTop || isScrollingUp);

            lastScrollY.current = currentScrollY;
        };

        const throttledScroll = throttle(handleScroll, 16);
        handleScroll();
        window.addEventListener('scroll', throttledScroll, { passive: true });
        return () => window.removeEventListener('scroll', throttledScroll);
    }, []);

    return (
        <>
            <nav data-section="navbar" className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] transform-gpu
        ${visible ? 'translate-y-0' : '-translate-y-full'}
        ${scrolled
                    ? 'py-3 md:py-4 bg-[#EDE4D3]/90 dark:bg-[#050505]/90 backdrop-blur-xl border-b border-[#6B5E52]/20 dark:border-white/10 shadow-[0_4px_24px_rgba(59,47,38,0.15)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.3)]'
                    : 'py-5 md:py-8 bg-transparent border-b border-transparent shadow-none'
                }
      `}>
                <div className="max-w-[95rem] mx-auto px-4 md:px-10 flex items-center justify-between">

                    {/* LOGO */}
                    <div className="flex items-end gap-2 md:gap-5">
                        <img
                            src="/logo.png"
                            alt="AGP Logo"
                            className="h-10 md:h-12 w-auto object-contain contrast-125 saturate-150 drop-shadow-[0_3px_6px_rgba(59,47,38,0.3)]"
                        />
                        <span className="font-bold text-3xl md:text-5xl tracking-tighter font-display leading-none translate-y-1 md:translate-y-3 transition-colors text-[#3B2F26] dark:text-white drop-shadow-[0_2px_4px_rgba(59,47,38,0.2)] dark:drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">ENTERPRISES</span>
                    </div>

                    {/* DESKTOP NAVIGATION */}
                    <div className="hidden md:flex items-center gap-8 lg:gap-12">
                        {NAV_LINKS.map((item) => (
                            <a key={item} href={`#${item.toLowerCase()}`}
                                className="text-sm uppercase tracking-[0.2em] font-bold font-display transition-colors text-[#3B2F26] hover:text-[#A85832] dark:text-white/90 dark:hover:text-cyan-300 drop-shadow-[0_1px_2px_rgba(59,47,38,0.15)] dark:drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] hover:drop-shadow-[0_0_8px_rgba(168,88,50,0.4)] dark:hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                            >
                                {item}
                            </a>
                        ))}

                        <ThemeToggle theme={theme} setTheme={setTheme} />

                        <a href="#contact" className="bg-[#A85832] dark:bg-gradient-to-r dark:from-orange-600 dark:to-red-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-[#8B4726] hover:shadow-[0_0_20px_rgba(168,88,50,0.5)] dark:hover:shadow-[0_0_25px_rgba(249,115,22,0.6)] transition-all font-display tracking-widest border border-[#A85832] dark:border-orange-400/50 text-sm uppercase">
                            Get Quote
                        </a>
                    </div>

                    {/* MOBILE: Hamburger Only */}
                    <div className="flex md:hidden items-center gap-3">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 rounded-lg backdrop-blur-md border transition-colors bg-[#3B2F26]/10 border-[#6B5E52]/30 text-[#3B2F26] dark:bg-black/30 dark:border-white/20 dark:text-white"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                {mobileMenuOpen ? (
                                    <path d="M18 6L6 18M6 6l12 12" />
                                ) : (
                                    <path d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>

            {/* FLOATING VERTICAL TOGGLE - Hidden when scrolled */}
            <motion.div
                data-section="floating-toggle"
                initial={{ opacity: 1, x: 0 }}
                animate={{
                    /* FIX: Show when NOT scrolled OR when scrolling UP (visible) */
                    opacity: visible ? 1 : 0,
                    x: visible ? 0 : 20,
                    pointerEvents: visible ? 'auto' : 'none'
                }}
                transition={{ duration: 0.3 }}
                className="fixed top-24 md:top-28 right-4 z-50 md:hidden"
            >
                <ThemeToggle theme={theme} setTheme={setTheme} isVertical={true} />
            </motion.div>

            {/* MOBILE MENU OVERLAY */}
            {mobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="fixed inset-0 z-40 pt-20 bg-[#EDE4D3]/98 dark:bg-black/95 backdrop-blur-xl md:hidden"
                >
                    <div className="flex flex-col items-center gap-6 p-8">
                        {NAV_LINKS.map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-2xl uppercase tracking-[0.2em] font-bold font-display text-[#3B2F26] dark:text-white hover:text-[#A85832] dark:hover:text-cyan-400 transition-colors"
                            >
                                {item}
                            </a>
                        ))}
                        <a
                            href="#contact"
                            onClick={() => setMobileMenuOpen(false)}
                            className="mt-4 bg-[#A85832] dark:bg-gradient-to-r dark:from-orange-600 dark:to-red-600 text-white px-10 py-4 rounded-xl font-bold text-lg font-display tracking-widest border border-[#A85832] dark:border-orange-400/50 uppercase"
                        >
                            Get Quote
                        </a>
                    </div>
                </motion.div>
            )}
        </>
    );
});

export default Navbar;
