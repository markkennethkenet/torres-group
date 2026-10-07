"use strict";

const Payment = {
  busy: false,
  CARD_QR_DELAY_MS: 1600,

  check(amountStr) {
    if (!/^\d{1,7}$/.test(amountStr) || Number(amountStr) <= 0) {
      return { error: "invalid" };
    }

    const paidCents = Number(amountStr) * 100;
    const totalCents = Cart.totalCents();

    if (paidCents < totalCents) {
      return { error: "short", short: (totalCents - paidCents) / 100 };
    }

    return { cents: paidCents, change: (paidCents - totalCents) / 100 };
  },

  pay(method, cashCents, onStart) {
    if (this.busy) return;

    if (Cart.isEmpty()) {
      Shell.leave("index.html", Util.MSG.NEED_CART);
      return;
    }

    this.busy = true;
    if (onStart) onStart();

    const delay = method === "Cash" ? 0 : this.CARD_QR_DELAY_MS;

    setTimeout(() => {
      try {
        Tx.complete(method, cashCents);
        Shell.leave("success.html", Util.MSG.PAY_OK, "success");
      } catch (error) {
        this.busy = false;
        Util.toast(Util.MSG.PAY_FAIL, "error");
      }
    }, delay);
  },
};
