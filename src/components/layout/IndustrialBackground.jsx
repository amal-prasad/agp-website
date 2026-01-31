import React, { memo } from 'react';

const IndustrialBackground = memo(() => (
    <div aria-hidden="true" className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#EDE4D3] dark:bg-[#050505] transition-colors duration-700 min-h-[100dvh]" data-section="background">

        {/* --- LIGHT MODE: KRAFT PAPER AESTHETIC --- */}
        <div className="absolute inset-0 light-mode-only gpu-accelerate">
            {/* Kraft paper background with subtle blur for depth */}
            <div
                className="absolute inset-0 blur-[6px] bg-center bg-cover bg-no-repeat gpu-accelerate transition-opacity duration-700"
                style={{
                    backgroundImage: `url('/kraft-texture-v2.webp')`,
                }}
            />
            {/* Warm cream overlay to enhance paper texture */}
            <div className="absolute inset-0 bg-[#EDE4D3]/30 gpu-accelerate" />
        </div>

        {/* --- DARK MODE LAYERS (UNCHANGED) --- */}
        <div className="dark-mode-only absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent" />
            <div className="absolute -top-20 -right-20 w-[800px] h-[800px] bg-orange-600/10 blur-[100px] rounded-full mix-blend-screen" />
            <div className="absolute -bottom-40 -left-20 w-[800px] h-[800px] bg-red-600/5 blur-[100px] rounded-full mix-blend-screen" />
            <div className="absolute inset-0 bg-[size:100px_100px] bg-grid-pattern opacity-[0.03]" />
        </div>

    </div>
));

export default IndustrialBackground;
