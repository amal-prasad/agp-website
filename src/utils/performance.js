export const throttle = (fn, ms) => {
    let lastCall = 0;
    return (...args) => {
        const now = Date.now();
        if (now - lastCall >= ms) {
            lastCall = now;
            fn(...args);
        }
    };
};
