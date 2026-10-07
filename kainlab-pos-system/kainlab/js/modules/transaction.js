"use strict";

const Tx = {
  seq: 0,
  used: new Set(),
  history: [],

  init() {
    const saved = Util.readJson(localStorage, Util.STORAGE.TX, {});
    if (saved.day === Util.ymd(new Date())) {
      this.seq = saved.seq || 0;
      (saved.used || []).forEach((ref) => this.used.add(ref));
    }

    const rows = Util.readJson(localStorage, Util.STORAGE.HISTORY, []);
    this.history = rows.map((tx) => ({
      ...tx,
      dateTime: new Date(tx.dateTime),
    }));
  },

  formatRef(seq) {
    return `TXN-${Util.ymd(new Date())}-${Util.pad(seq, 3)}`;
  },

  peekRef() {
    return this.formatRef(this.seq + 1);
  },

  newRef() {
    let ref;
    do {
      this.seq++;
      ref = this.formatRef(this.seq);
    } while (this.used.has(ref));

    this.used.add(ref);
    Util.writeJson(localStorage, Util.STORAGE.TX, {
      day: Util.ymd(new Date()),
      seq: this.seq,
      used: [...this.used],
    });
    return ref;
  },

  complete(method, cashCents) {
    if (Cart.isEmpty()) throw new Error("empty order");

    const totalCents = Cart.totalCents();
    const isCash = method === "Cash";
    const transaction = {
      transactionReference: this.newRef(),
      dateTime: new Date(),
      serviceMode: Cart.mode,
      items: Cart.items.map((item) => ({
        name: item.name,
        size: item.size,
        price: item.price,
        quantity: item.quantity,
        subtotal: Cart.subtotal(item),
      })),
      total: totalCents / 100,
      paymentMethod: method,
      cashReceived: isCash ? cashCents / 100 : null,
      change: isCash ? (cashCents - totalCents) / 100 : null,
      status: "PAID",
    };

    this.history.unshift(transaction);
    Util.writeJson(localStorage, Util.STORAGE.HISTORY, this.history);
    try {
      localStorage.setItem(Util.STORAGE.LAST, transaction.transactionReference);
    } catch (error) {}
    return transaction;
  },

  byRef(ref) {
    return this.history.find((tx) => tx.transactionReference === ref);
  },

  last() {
    return this.byRef(localStorage.getItem(Util.STORAGE.LAST));
  },

  clearLast() {
    Util.removeKey(localStorage, Util.STORAGE.LAST);
  },
};

Tx.init();
