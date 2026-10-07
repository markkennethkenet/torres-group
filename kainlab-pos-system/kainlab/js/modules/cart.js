"use strict";

const Cart = {
  KEY: Util.STORAGE.CART,
  items: [],
  mode: "Dine in",

  load() {
    const saved = Util.readJson(localStorage, this.KEY, {});
    this.items = Array.isArray(saved.items)
      ? saved.items.filter((item) => item && item.quantity >= 1 && item.price >= 0)
      : [];
    this.mode = saved.mode || "Dine in";
  },

  save() {
    Util.writeJson(localStorage, this.KEY, {
      items: this.items,
      mode: this.mode,
    });
  },

  find(key) {
    return this.items.find((item) => item.key === key);
  },

  lineKey(product, size) {
    return product.id + (size || "");
  },

  add(product, size, qty) {
    const key = this.lineKey(product, size);
    const existing = this.find(key);

    if (existing) {
      existing.quantity += qty;
    } else {
      this.items.push({
        key,
        productId: product.id,
        name: product.name,
        size,
        price: Catalog.unitPrice(product, size),
        quantity: qty,
      });
    }

    this.save();
  },

  change(key, delta) {
    const item = this.find(key);
    if (!item) return;

    if (item.quantity + delta < 1) {
      this.remove(key);
      return;
    }

    item.quantity += delta;
    this.save();
  },

  remove(key) {
    this.items = this.items.filter((item) => item.key !== key);
    this.save();
  },

  setMode(mode) {
    this.mode = mode;
    this.save();
  },

  reset() {
    this.items = [];
    this.mode = "Dine in";
    this.save();
  },

  subtotal(item) {
    return (Util.cents(item.price) * item.quantity) / 100;
  },

  totalCents() {
    return this.items.reduce((sum, item) => sum + Util.cents(item.price) * item.quantity, 0);
  },

  total() {
    return this.totalCents() / 100;
  },

  count() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  },

  isEmpty() {
    return !this.items.length;
  },
};

Cart.load();
