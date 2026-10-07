"use strict";

const CashPage = {
  cashStr: "",

  init() {
    Shell.mount("cash");
    if (!Shell.needCart()) return;
    Shell.bind(this.handlers());
    this.render();
  },

  keypadButtons() {
    const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9]
      .map((digit) => /* HTML */ `<button data-a="key" data-k="${digit}">${digit}</button>`)
      .join("");

    return (
      digits +
      /* HTML */ `
        <button class="f" data-a="clear">Clear</button>
        <button data-a="key" data-k="0">0</button>
        <button class="f" data-a="bksp" aria-label="Backspace">${ic("back")}</button>
      `
    );
  },

  quickButtons(amount) {
    const exactActive = this.cashStr && amount === Math.ceil(Cart.total()) ? "on" : "";
    const presets = [200, 500, 1000]
      .map((value) => {
        const active = this.cashStr && amount === value ? "on" : "";
        return /* HTML */ `
          <button data-a="quick" data-v="${value}" class="${active}">₱${value.toLocaleString()}</button>
        `;
      })
      .join("");

    return /* HTML */ `
      <button data-a="quick" data-v="${Cart.total()}" class="${exactActive}">Exact</button>
      ${presets}
    `;
  },

  shortAlert(result) {
    if (!result || result.error !== "short") return "";

    return /* HTML */ `
      <div class="alert">
        ${ic("alert")}
        <div>
          <b>Insufficient cash.</b>
          Please enter an amount equal to or greater than the total. You are short by
          ${Util.peso(result.short)}.
        </div>
      </div>
    `;
  },

  render() {
    const amount = this.cashStr ? Number(this.cashStr) : 0;
    const result = this.cashStr ? Payment.check(this.cashStr) : null;
    const short = result && result.error === "short";
    const ok = result && !result.error;
    const changeNote = ok ? `<small>${Util.peso(amount)} − ${Util.peso(Cart.total())}</small>` : "";

    Shell.app().innerHTML = /* HTML */ `
      <div class="two">
        <div>
          <h2>${ic("cash")} Cash Payment</h2>
          ${Components.amountBox("Total amount", Cart.total())}
          <span class="lbl">Amount paid</span>
          <div class="field ${short ? "bad" : ""} ${this.cashStr ? "" : "z"}">${Util.peso(amount)}</div>
          ${this.shortAlert(result)}
          <span class="lbl" style="color:var(--mute)">Quick amounts</span>
          <div class="quick">${this.quickButtons(amount)}</div>
          <div class="chg ${ok ? "ok" : ""}">
            <div>Change${changeNote}</div>
            <b>${ok ? Util.peso(result.change) : "—"}</b>
          </div>
        </div>
        <div>
          <div class="pad">${this.keypadButtons()}</div>
          <button class="wide pri" style="margin-top:12px" data-a="pay">Pay Now</button>
          <button class="wide out" data-a="back">${ic("left")} Change payment method</button>
        </div>
      </div>
    `;
  },

  typeDigit(digit) {
    if (this.cashStr.length >= 7) return;
    this.cashStr = (this.cashStr + digit).replace(/^0+/, "");
    this.render();
  },

  setAmount(value) {
    this.cashStr = String(Math.ceil(Number(value)));
    this.render();
  },

  pay() {
    const result = this.cashStr ? Payment.check(this.cashStr) : { error: "invalid" };
    if (result.error === "invalid") return Util.toast(Util.MSG.INVALID_AMOUNT, "error");
    if (result.error === "short") return Util.toast(Util.MSG.SHORT_CASH, "error");
    Payment.pay("Cash", result.cents);
  },

  handlers() {
    return {
      key: (button) => this.typeDigit(button.dataset.k),
      clear: () => {
        this.cashStr = "";
        this.render();
      },
      bksp: () => {
        this.cashStr = this.cashStr.slice(0, -1);
        this.render();
      },
      quick: (button) => this.setAmount(button.dataset.v),
      back() {
        location.href = "method.html";
      },
      pay: () => this.pay(),
    };
  },
};

CashPage.init();
