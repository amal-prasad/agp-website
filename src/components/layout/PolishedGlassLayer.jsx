import React, { memo } from 'react';

const PolishedGlassLayer = memo(() => (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden dark-mode-only gpu-accelerate">
        <div className="absolute -top-[10%] left-1/2 -translate-x-1/2 w-[70%] h-[50%] bg-white/[0.03] blur-[100px] rounded-[100%] mix-blend-overlay" />
        <div className="absolute -bottom-[20%] left-1/2 -translate-x-1/2 w-[80%] h-[60%] bg-cyan-500/[0.05] blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-transparent opacity-50" />
    </div>
));

export default PolishedGlassLayer;
