// The three tongue-in-cheek stats, each a function of page scroll progress (0..1).
// Shown on the first screen and again on the last.
export const depth = (p) => `${Math.round(p * 100)}%`
export const sayHi = (p) => `${(3.2 + p * 94.1).toFixed(1)}%`
export const stillHere = (p) => `${Math.round(100 - p * 81)}%`
