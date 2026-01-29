import React from 'react';
import { useTheme } from './hooks/useTheme';

// Layout Components
import IndustrialBackground from './components/layout/IndustrialBackground';
import PolishedGlassLayer from './components/layout/PolishedGlassLayer';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Section Components
import Hero from './components/sections/Hero';
import Services from './components/sections/Services';
import Portfolio from './components/sections/Portfolio';
import About from './components/sections/About';
import Clients from './components/sections/Clients';
import Contact from './components/sections/Contact';

export default function App() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="antialiased bg-[#EDE4D3] dark:bg-[#050505] text-[#3B2F26] dark:text-slate-100 transition-colors duration-700 selection:bg-[#A85832] selection:text-white overflow-x-hidden relative min-h-[100dvh]">
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