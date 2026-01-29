import React from 'react';

const ScrollAnchor = ({ id }) => (
    <div id={id} className="absolute -top-32 left-0 w-full h-1 pointer-events-none opacity-0" aria-hidden="true" />
);

export default ScrollAnchor;
