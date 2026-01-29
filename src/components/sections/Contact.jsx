import React, { useState, useRef } from 'react';
import { Phone, Send, MapPin, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';
import Reveal from '../ui/Reveal';
import ScrollAnchor from '../ui/ScrollAnchor';

const EMAILJS_CONFIG = {
    SERVICE_ID: 'service_foh4x56',
    TEMPLATE_ID: 'template_o1ibewd',
    PUBLIC_KEY: '0tI03IJkKlik1sdYe'
};

const MAP_EMBED_URL = "https://maps.google.com/maps?q=22.657433,75.803163&z=19&output=embed";

const SERVICES = [
    "Visiting Cards", "Bill Books", "Flex Printing", "ID Cards",
    "Brochures", "Sticker Labels", "Offset Printing", "Logo Design"
];

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

    const inputClasses = "w-full px-6 py-4 outline-none transition-all font-medium backdrop-blur-md " +
        // Light Mode: Minimalist Notebook Style
        "bg-transparent text-[#3B2F26] placeholder-[#6B5E52] border-0 border-b-2 border-[#6B5E52]/30 rounded-none focus:border-[#A85832] focus:bg-transparent " +
        // Dark Mode: Card Style (Preserved)
        "dark:bg-slate-800/50 dark:text-white dark:placeholder-slate-500 dark:border dark:border-b dark:border-slate-700 dark:rounded-xl dark:focus:bg-slate-800 dark:shadow-sm dark:focus:shadow-md";

    return (
        <section className="py-24 relative scroll-mt-32" data-section="contact">
            <ScrollAnchor id="contact" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <Reveal>
                    <div className="rounded-[2rem] overflow-hidden shadow-[0_16px_48px_rgba(59,47,38,0.15)] dark:shadow-2xl grid lg:grid-cols-5 border border-[#6B5E52]/30 dark:border-white/10 bg-white/80 dark:bg-slate-900/40 backdrop-blur-xl transition-colors">
                        <div className="lg:col-span-2 bg-[#3B2F26] dark:bg-slate-900/60 p-12 text-[#EDE4D3] dark:text-white flex flex-col justify-between relative overflow-hidden border-r border-[#6B5E52]/30 dark:border-white/5 transition-colors">
                            <div className="absolute top-0 right-0 p-40 bg-[#A85832]/20 dark:bg-orange-500/10 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none"></div>
                            <div className="relative z-10">
                                <h3 className="text-4xl font-bold mb-6 font-display text-[#EDE4D3] dark:text-white transition-colors drop-shadow-[0_4px_8px_rgba(59,47,38,0.3)]">LET'S PRINT.</h3>
                                <div className="space-y-8 mb-12">
                                    <div className="flex items-center gap-5">
                                        <Phone className="text-[#A85832] dark:text-orange-500 drop-shadow-sm dark:drop-shadow-[0_0_8px_orange]" size={24} />
                                        <div>
                                            <p className="font-mono text-lg font-bold text-[#EDE4D3] dark:text-white tracking-wide">+91-7999406413</p>
                                            <p className="font-mono text-lg font-bold text-[#EDE4D3]/70 dark:text-slate-400 tracking-wide">+91-8269897212</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-5">
                                        <Send className="text-[#A85832] dark:text-orange-500 drop-shadow-sm dark:drop-shadow-[0_0_8px_orange]" size={24} />
                                        <p className="font-mono text-sm md:text-lg font-bold text-[#EDE4D3] dark:text-white tracking-wide text-ellipsis overflow-hidden">
                                            agpent2019@gmail.com
                                        </p>
                                    </div>

                                    <div className="flex items-start gap-5">
                                        <MapPin className="text-[#A85832] dark:text-orange-500 drop-shadow-sm dark:drop-shadow-[0_0_8px_orange] mt-1 shrink-0" size={24} />
                                        <p className="font-mono text-lg font-bold text-[#EDE4D3] dark:text-white tracking-wide leading-relaxed">
                                            Flat A36/104, Treasure Fantasy<br />
                                            CAT Road, Rau<br />
                                            Indore - 453331
                                        </p>
                                    </div>
                                </div>

                                <div className="w-full h-48 rounded-xl overflow-hidden border border-[#6B5E52]/40 dark:border-slate-700/50 shadow-inner relative group">
                                    <iframe
                                        src={MAP_EMBED_URL}
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen=""
                                        loading="lazy"
                                        className="opacity-80 group-hover:opacity-100 transition-all duration-500 sepia-[0.2] dark:grayscale-0 dark:invert-[.9] dark:hue-rotate-180 dark:contrast-125"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="Google Maps Location"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-3 p-8 md:p-12">
                            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <input name="user_name" required type="text" placeholder="Your Name" className={inputClasses} />
                                    <input name="user_phone" required type="tel" placeholder="+91-XXXXXXXXXX" className={inputClasses} />
                                </div>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <input name="user_email" required type="email" placeholder="Email Address" className={inputClasses} />

                                    <div className="relative">
                                        <select name="service_interest" className={`${inputClasses} appearance-none cursor-pointer`}>
                                            <option value="General" className="bg-[#EDE4D3] dark:bg-slate-900 text-[#3B2F26] dark:text-white">General Inquiry</option>
                                            {SERVICES.map(s => <option key={s} value={s} className="bg-[#EDE4D3] dark:bg-slate-900 text-[#3B2F26] dark:text-white">{s}</option>)}
                                        </select>
                                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-[#A85832]">
                                            <svg width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                        </div>
                                    </div>
                                </div>

                                <textarea name="message" required rows={4} className={inputClasses} placeholder="Message..." />

                                <button
                                    type="submit"
                                    disabled={status === 'sending' || status === 'success'}
                                    className={`w-full font-bold py-5 rounded-xl transition-all flex items-center justify-center gap-3 text-lg font-display uppercase tracking-wider shadow-[0_6px_20px_rgba(168,88,50,0.25)] dark:shadow-[0_0_20px_rgba(0,0,0,0.3)] border
                    ${status === 'success' ? 'bg-[#234F32] text-white border-[#234F32] shadow-[#234F32]/20' :
                                            status === 'error' ? 'bg-red-600 text-white border-red-500' :
                                                'bg-[#A85832] text-white hover:bg-[#8B4726] border-[#A85832] hover:shadow-[0_8px_30px_rgba(168,88,50,0.4)]'}`}
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

export default Contact;
