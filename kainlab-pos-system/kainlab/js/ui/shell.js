"use strict";

const Shell = {
  STEP: {
    order: 1,
    review: 2,
    method: 3,
    cash: 3,
    qr: 3,
    card: 3,
    success: 4,
    receipt: 4,
    history: 0,
  },

  stepBar(page) {
    const current = this.STEP[page];

    return ["Order", "Review", "Payment", "Receipt"]
      .map((label, index) => {
        const step = index + 1;
        const done = page === "success" ? step <= 3 : step < current;
        const on = step === current && page !== "success";
        const className = on ? "on" : done ? "done" : "";
        const text = done ? "✓ " + label : step + " " + label;
        return /* HTML */ `<span class="${className}">${text}</span>`;
      })
      .join("");
  },

  navLink(page, id, href, icon, label, badge = "") {
    return /* HTML */ `
      <a class="nav ${page === id ? "on" : ""}" href="${href}" data-nav="${id}">
        ${ic(icon)} ${label}${badge}
      </a>
    `;
  },

  mount(page, { search = false } = {}) {
    const orderBadge = Cart.count() ? `<span class="bd">${Cart.count()}</span>` : "";
    const searchBox = search
      ? /* HTML */ `<div class="search">
          ${ic("search")}<input id="q" type="search" placeholder="Search menu" aria-label="Search menu" />
        </div>`
      : "";

    document.getElementById("root").innerHTML = /* HTML */ `
      <div class="shell">
        <aside>
          <div class="brand">${ic("dine")}KainLab</div>
          ${this.navLink(page, "order", "index.html", "menu", "Menu")}
          ${this.navLink(page, "review", "review.html", "bag", "My order", orderBadge)}
          ${this.navLink(page, "history", "history.html", "hist", "History")}
        </aside>
        <section class="content">
          <div class="top">
            ${searchBox}
            <div class="steps">${this.stepBar(page)}</div>
          </div>
          <div id="app"></div>
        </section>
      </div>
      <div id="toast" role="status" aria-live="polite"></div>
    `;

    this.guardReviewNav();
    this.showFlash();
  },

  guardReviewNav() {
    document.querySelector('[data-nav="review"]').addEventListener("click", (event) => {
      if (Cart.isEmpty()) {
        event.preventDefault();
        Util.toast(Util.MSG.NEED_CART, "warn");
      }
    });
  },

  showFlash() {
    const flash = Util.readJson(sessionStorage, Util.STORAGE.FLASH, null);
    if (!flash) return;
    Util.removeKey(sessionStorage, Util.STORAGE.FLASH);
    Util.toast(flash.msg, flash.type);
  },

  app() {
    return document.getElementById("app");
  },

  refreshBadge() {
    const link = document.querySelector('[data-nav="review"]');
    if (!link) return;

    const old = link.querySelector(".bd");
    if (old) old.remove();
    if (!Cart.count()) return;

    const badge = document.createElement("span");
    badge.className = "bd";
    badge.textContent = Cart.count();
    link.appendChild(badge);
  },

  leave(url, msg, type = "warn") {
    if (msg) Util.writeJson(sessionStorage, Util.STORAGE.FLASH, { msg, type });
    location.href = url;
  },

  require(ok, url, msg) {
    if (!ok) this.leave(url, msg);
    return ok;
  },

  needCart() {
    return this.require(!Cart.isEmpty(), "index.html", Util.MSG.NEED_CART);
  },

  bind(actions) {
    document.addEventListener("click", (event) => {
      const button = event.target.closest("#app [data-a]");
      if (!button || Payment.busy) return;
      const handler = actions[button.dataset.a];
      if (handler) handler(button);
    });
  },

  newTransaction() {
    Cart.reset();
    Tx.clearLast();
    this.leave("index.html", Util.MSG.NEW_TX, "success");
  },
};
