"use strict";

const ReceiptPage = {
  init() {
    Shell.mount("receipt");
    this.ref = new URLSearchParams(location.search).get("ref");
    this.transaction = this.ref ? Tx.byRef(this.ref) : Tx.last();
    if (!Shell.require(!!this.transaction, "index.html", Util.MSG.NO_RECEIPT)) return;
    this.render();
    Shell.bind(this.handlers());
  },

  render() {
    Shell.app().innerHTML = /* HTML */ `
      <div class="two" style="max-width:980px;margin:0 auto">
        ${Receipt.html(this.transaction)}
        <div class="side">
          <h1>Your receipt</h1>
          <p>
            Keep this for your records. Tap New Transaction when you are done — your order and payment
            details will be cleared.
          </p>
          <button class="pri" data-a="newTx">${ic("plus")} New Transaction</button>
          <button class="out" data-a="print">${ic("print")} Print Receipt</button>
          <button class="out" style="border-color:var(--line)" data-a="back">${ic("left")} Back</button>
        </div>
      </div>
    `;
  },

  handlers() {
    return {
      newTx() {
        Shell.newTransaction();
      },
      back: () => {
        location.href = this.ref ? "history.html" : "success.html";
      },
      print() {
        try {
          window.print();
        } catch (error) {
          Util.toast(Util.MSG.PRINT_FAIL, "warn");
        }
      },
    };
  },
};

ReceiptPage.init();
