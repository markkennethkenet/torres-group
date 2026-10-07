"use strict";

const Art = {
  cupFillY(y) {
    return 30 + ((y - 30) * 5) / 55;
  },

  cup(product) {
    const layers = product.layers
      .map(([top, bottom, color]) => {
        const xTop = this.cupFillY(top);
        const xBottom = this.cupFillY(bottom);
        return /* HTML */ `<polygon
          points="${xTop},${top} ${70 - (xTop - 30)},${top} ${70 - (xBottom - 30)},${bottom} ${xBottom},${bottom}"
          fill="${color}"
        />`;
      })
      .join("");

    return (
      layers +
      `<path d="M30 30h40l-5 56a5 5 0 01-5 4H40a5 5 0 01-5-4z" fill="rgba(255,255,255,.25)" stroke="#8d969c" stroke-width="2"/>` +
      `<rect x="42" y="50" width="10" height="10" rx="2" fill="#fff" opacity=".5" transform="rotate(12 47 55)"/>` +
      `<rect x="53" y="62" width="9" height="9" rx="2" fill="#fff" opacity=".45"/>` +
      `<path d="M56 30l6-22" stroke="#e9d9c6" stroke-width="3" stroke-linecap="round"/>`
    );
  },

  croissant() {
    return /* HTML */ `
      <path
        d="M15 62c4-24 22-34 35-34s31 10 35 34c-8-6-12-8-18-6-3-8-9-12-17-12s-14 4-17 12c-6-2-10 0-18 6z"
        fill="#d9954a"
      />
      <path d="M38 40l5 14M50 36v18M62 40l-5 14" stroke="#b9722e" stroke-width="3" stroke-linecap="round" />
    `;
  },

  sandwich() {
    return /* HTML */ `
      <path d="M14 66L50 24l36 42z" fill="#e8c27c" />
      <path d="M20 66l30-34 30 34z" fill="#8fbf5a" />
      <path d="M26 66l24-26 24 26z" fill="#e5533d" />
      <path d="M14 66h72v8H14z" fill="#e8c27c" />
    `;
  },

  cookie() {
    return /* HTML */ `
      <circle cx="50" cy="52" r="30" fill="#c58a4a" />
      <circle cx="40" cy="44" r="4" fill="#4a2c1a" />
      <circle cx="58" cy="40" r="4" fill="#4a2c1a" />
      <circle cx="52" cy="58" r="4" fill="#4a2c1a" />
      <circle cx="36" cy="60" r="3.5" fill="#4a2c1a" />
      <circle cx="64" cy="58" r="3.5" fill="#4a2c1a" />
    `;
  },

  cake() {
    return /* HTML */ `
      <path d="M14 70L50 30l36 40z" fill="#f6dfa6" />
      <path d="M14 70h72v8H14z" fill="#d9a65c" />
      <path d="M50 30l36 40H50z" fill="#f0cd84" />
      <circle cx="50" cy="26" r="6" fill="#d33d5b" />
    `;
  },

  donut() {
    return /* HTML */ `
      <circle cx="50" cy="52" r="32" fill="#e7b06b" />
      <circle cx="50" cy="50" r="30" fill="#f3a0b8" />
      <circle cx="50" cy="50" r="10" fill="var(--img)" />
      <path
        d="M30 38l5 3M62 32l-3 5M70 56l-5 2M40 70l3-5M58 70l-2-5"
        stroke="#fff"
        stroke-width="3"
        stroke-linecap="round"
      />
    `;
  },

  svg(product) {
    const draw = this[product.art];
    return /* HTML */ `<svg viewBox="0 0 100 100" role="img" aria-label="${product.name}">
      ${draw.call(this, product)}
    </svg>`;
  },
};

function art(product) {
  return Art.svg(product);
}
