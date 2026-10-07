"use strict";

const Icons = {
  PATHS: {
    cup: "M4 8h13v8a4 4 0 01-4 4H8a4 4 0 01-4-4V8zM17 10h1a3 3 0 010 6h-1M8 2v3M12 2v3",
    menu: "M4 6h16M4 12h16M4 18h16",
    bag: "M5 8h14l-1 12H6L5 8zM9 8a3 3 0 016 0",
    hist: "M3 12a9 9 0 109-9 9 9 0 00-7 3.5M3 4v4h4M12 7v5l3 2",
    search: "M11 4a7 7 0 100 14 7 7 0 000-14zM21 21l-5-5",
    cash: "M2 6h20v12H2zM12 9a3 3 0 100 6 3 3 0 000-6z",
    qr: "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h3v3h-3zM20 14v3M14 20h3M20 20h1",
    card: "M2 5h20v14H2zM2 10h20M6 15h4",
    trash: "M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3",
    cart: "M3 4h2l2.5 11h10L20 7H6M9 20h.01M17 20h.01",
    check: "M5 13l4 4L19 7",
    left: "M19 12H5M11 6l-6 6 6 6",
    right: "M5 12h14M13 6l6 6-6 6",
    receipt: "M6 3h12v18l-3-2-3 2-3-2-3 2V3zM9 8h6M9 12h6",
    plus: "M12 5v14M5 12h14",
    minus: "M5 12h14",
    print: "M6 9V3h12v6M6 18H4v-7h16v7h-2M7 14h10v7H7z",
    back: "M21 5H9l-6 7 6 7h12V5zM12 9l5 6M17 9l-5 6",
    alert: "M12 8v5M12 17h.01M12 2a10 10 0 100 20 10 10 0 000-20z",
    dine: "M7 3v8M5 3v5a2 2 0 004 0V3M7 11v10M17 3c-2 2-3 5-3 8h3v10",
    take: "M5 8h14l-1 12H6L5 8zM9 8a3 3 0 016 0",
    ride: "M2 7h11v9H2zM13 10h4l3 3v3h-7M6 19a2 2 0 100-4 2 2 0 000 4zM17 19a2 2 0 100-4 2 2 0 000 4z",
  },

  draw(name) {
    return /* HTML */ `<svg class="i" viewBox="0 0 24 24" aria-hidden="true">
      <path d="${this.PATHS[name]}" />
    </svg>`;
  },
};

function ic(name) {
  return Icons.draw(name);
}
