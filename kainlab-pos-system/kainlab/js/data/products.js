"use strict";

const Catalog = {
  LARGE_EXTRA: 20,

  CATEGORIES: ["Coffee", "Non Coffee", "Food", "Snack", "Dessert"],

  ITEMS: [
    {
      id: 1,
      name: "Cappuccino",
      price: 95,
      cat: "Coffee",
      sizes: 1,
      art: "cup",
      layers: [
        [30, 44, "#f6e8d6"],
        [44, 88, "#a8744a"],
      ],
      desc: "Espresso with steamed milk and a thick foam cap.",
    },
    {
      id: 2,
      name: "Caffe Latte",
      price: 100,
      cat: "Coffee",
      sizes: 1,
      art: "cup",
      layers: [
        [30, 56, "#f1e2cf"],
        [56, 88, "#c89a6c"],
      ],
      desc: "Smooth espresso over cold milk and ice.",
    },
    {
      id: 3,
      name: "Americano",
      price: 80,
      cat: "Coffee",
      sizes: 1,
      art: "cup",
      layers: [[30, 88, "#3a2218"]],
      desc: "Bold espresso topped with cold water.",
    },
    {
      id: 4,
      name: "Matcha Latte",
      price: 120,
      cat: "Non Coffee",
      sizes: 1,
      art: "cup",
      layers: [
        [30, 52, "#a9c06f"],
        [52, 88, "#eef0d6"],
      ],
      desc: "Ceremonial matcha whisked with milk.",
    },
    {
      id: 5,
      name: "Choco Milk",
      price: 90,
      cat: "Non Coffee",
      sizes: 1,
      art: "cup",
      layers: [[30, 88, "#7a4a31"]],
      desc: "Rich dark chocolate with cold milk.",
    },
    {
      id: 6,
      name: "Croissant",
      price: 85,
      cat: "Food",
      art: "croissant",
      desc: "Buttery, flaky, baked fresh each morning.",
    },
    {
      id: 7,
      name: "Club Sandwich",
      price: 130,
      cat: "Food",
      art: "sandwich",
      desc: "Chicken, egg, lettuce and tomato on toast.",
    },
    {
      id: 8,
      name: "Cookies",
      price: 45,
      cat: "Snack",
      art: "cookie",
      desc: "Two chewy chocolate chip cookies.",
    },
    {
      id: 9,
      name: "Cheesecake",
      price: 110,
      cat: "Dessert",
      art: "cake",
      desc: "Creamy baked cheesecake with berry sauce.",
    },
    {
      id: 10,
      name: "Donut",
      price: 55,
      cat: "Dessert",
      art: "donut",
      desc: "Glazed ring donut, soft and fluffy.",
    },
  ],

  byId(id) {
    return this.ITEMS.find((product) => product.id === Number(id));
  },

  hasSizes(product) {
    return Boolean(product && product.sizes);
  },

  unitPrice(product, size) {
    const extra = this.hasSizes(product) && size === "Large" ? this.LARGE_EXTRA : 0;
    return product.price + extra;
  },
};
