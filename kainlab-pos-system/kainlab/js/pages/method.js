"use strict";

const MethodPage = {
  OPTIONS: [
    {
      href: "cash.html",
      icon: "cash",
      title: "Cash",
      detail: "Enter the amount you are paying. Change is computed for you.",
      bg: "#dcfce7",
      fg: "#166534",
    },
    {
      href: "qr.html",
      icon: "qr",
      title: "QR Payment",
      detail: "Scan with a supported e-wallet or banking app.",
      bg: "#dbeafe",
      fg: "#1d4ed8",
    },
    {
      href: "card.html",
      icon: "card",
      title: "Credit / Debit Card",
      detail: "Tap, insert, or swipe your card at the reader.",
      bg: "#ede9fe",
      fg: "#6d28d9",
    },
  ],

  init() {
    Shell.mount("method");
    if (!Shell.needCart()) return;
    this.render();
    Shell.bind(this.handlers());
  },

  methodCard(option) {
    return /* HTML */ `
      <button class="method" data-a="pick" data-href="${option.href}">
        <span class="mic" style="background:${option.bg};color:${option.fg}">${ic(option.icon)}</span>
        <h3>${option.title}</h3>
        ${option.detail}
      </button>
    `;
  },

  render() {
    Shell.app().innerHTML = /* HTML */ `
      <div class="top" style="margin:0">
        <div>
          <h1>How would you like to pay?</h1>
          <p class="sub">Tap one of the options below.</p>
        </div>
        <div class="due">
          <small>AMOUNT DUE</small>
          <b>${Util.peso(Cart.total())}</b>
        </div>
      </div>
      <div class="methods">${this.OPTIONS.map((option) => this.methodCard(option)).join("")}</div>
      <button class="out" data-a="back">${ic("left")} Back to Order</button>
    `;
  },

  handlers() {
    return {
      pick(button) {
        location.href = button.dataset.href;
      },
      back() {
        location.href = "review.html";
      },
    };
  },
};

MethodPage.init();
