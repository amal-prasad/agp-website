import React, { memo } from 'react';

const Footer = memo(() => (
    <footer className="bg-[#3B2F26]/90 dark:bg-black text-[#EDE4D3] dark:text-slate-500 py-12 border-t border-[#6B5E52]/30 dark:border-slate-900 text-sm relative z-10 transition-colors backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
                <img src="/logo.png" alt="Footer Logo" className="h-6 opacity-80 hover:opacity-100 transition-all" />
                <p className="font-medium">© {new Date().getFullYear()} AGP Enterprises. Precision Printing Solutions.</p>
            </div>
        </div>
    </footer>
));

export default Footer;
