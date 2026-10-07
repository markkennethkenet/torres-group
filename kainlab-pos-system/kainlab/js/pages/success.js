"use strict";

const SuccessPage = {
  init() {
    Shell.mount("success");
    this.transaction = Tx.last();
    if (!Shell.require(!!this.transaction, "index.html", Util.MSG.NO_TX)) return;
    this.render();
    Shell.bind(this.handlers());
  },

  changeRow(transaction) {
    if (transaction.paymentMethod !== "Cash") return "";
    return /* HTML */ `<div>
      <span>Change</span>
      <b class="g">${Util.peso(transaction.change)}</b>
    </div>`;
  },

  render() {
    const transaction = this.transaction;
    const isCash = transaction.paymentMethod === "Cash";
    const paid = Util.peso(isCash ? transaction.cashReceived : transaction.total);

    Shell.app().innerHTML = /* HTML */ `
      <div class="okc">
        <div class="bigok">${ic("check")}</div>
        <h2>Payment Successful</h2>
        <p class="sub">Transaction completed successfully. Thank you!</p>
        <div class="kv">
          <div>
            <span>Transaction Reference</span>
            <b class="m">${transaction.transactionReference}</b>
          </div>
          <div>
            <span>Payment method</span>
            <b>${transaction.paymentMethod}</b>
          </div>
          <div>
            <span>Amount paid</span>
            <b>${paid}</b>
          </div>
          <div>
            <span>Transaction amount</span>
            <b>${Util.peso(transaction.total)}</b>
          </div>
          ${this.changeRow(transaction)}
        </div>
        <button class="pri" data-a="receipt">${ic("receipt")} View Receipt</button>
        <button class="out" data-a="newTx">${ic("plus")} New Transaction</button>
      </div>
    `;
  },

  handlers() {
    return {
      receipt() {
        location.href = "receipt.html";
      },
      newTx() {
        Shell.newTransaction();
      },
    };
  },
};

SuccessPage.init();
