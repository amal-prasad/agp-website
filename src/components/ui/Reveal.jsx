import React, { memo } from 'react';
import { motion } from 'framer-motion';

const REVEAL_VARIANTS = {
    up: { opacity: 0, y: 50 },
    left: { opacity: 0, x: -50 },
    right: { opacity: 0, x: 50 }
};

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

export default Reveal;
