import React from 'react';
import { useTheme } from './hooks/useTheme';

// Layout Components
import IndustrialBackground from './components/layout/IndustrialBackground';
import PolishedGlassLayer from './components/layout/PolishedGlassLayer';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Section Components
// Section Components (Lazy Loaded)
const Services = React.lazy(() => import('./components/sections/Services'));
const Portfolio = React.lazy(() => import('./components/sections/Portfolio'));
const About = React.lazy(() => import('./components/sections/About'));
const Clients = React.lazy(() => import('./components/sections/Clients'));
const Contact = React.lazy(() => import('./components/sections/Contact'));

// Keep Hero eager loaded for LCP
import Hero from './components/sections/Hero';

export default function App() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="antialiased text-[#3B2F26] dark:text-slate-100 selection:bg-[#A85832] selection:text-white overflow-x-hidden relative min-h-[100dvh] transition-colors duration-700">
      <IndustrialBackground />
      <PolishedGlassLayer />
      <Navbar theme={theme} setTheme={setTheme} />
      <main className="relative z-10">
        <Hero />
        <React.Suspense fallback={<div className="min-h-[200px]" />}>
          <Services />
          <Portfolio />
          <About />
          <Clients />
          <Contact />
        </React.Suspense>
      </main>
      <Footer />
    </div>
  );
}