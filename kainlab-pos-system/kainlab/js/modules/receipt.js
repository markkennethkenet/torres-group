"use strict";

const Receipt = {
  itemRows(transaction) {
    return transaction.items
      .map(
        (item) => /* HTML */ `
          <div class="r">
            <b>${Util.itemLabel(item)}</b>
            <span>${Util.peso(item.subtotal)}</span>
          </div>
          <small>${item.quantity} × ${Util.peso(item.price)}</small>
        `,
      )
      .join("");
  },

  cashRows(transaction) {
    if (transaction.paymentMethod !== "Cash") return "";

    return /* HTML */ `
      <div class="r">
        <span>Cash received</span>
        <span>${Util.peso(transaction.cashReceived)}</span>
      </div>
      <div class="r">
        <span>Change</span>
        <span>${Util.peso(transaction.change)}</span>
      </div>
    `;
  },

  html(transaction) {
    return /* HTML */ `
      <div class="rc">
        <h3>KAINLAB POS</h3>
        <div class="c">Official Digital Receipt</div>
        <hr />
        <div class="r">
          <span>Transaction</span>
          <b>${transaction.transactionReference}</b>
        </div>
        <div class="r">
          <span>Date</span>
          <span>${Util.when(transaction.dateTime)}</span>
        </div>
        <div class="r">
          <span>Order type</span>
          <span>${transaction.serviceMode}</span>
        </div>
        <hr />
        ${this.itemRows(transaction)}
        <hr />
        <div class="r t">
          <span>TOTAL</span>
          <span>${Util.peso(transaction.total)}</span>
        </div>
        <div class="r">
          <span>Payment</span>
          <span>${transaction.paymentMethod}</span>
        </div>
        ${this.cashRows(transaction)}
        <div class="r">
          <span>Status</span>
          <span class="okk">Payment Successful</span>
        </div>
        <hr />
        <div class="c">Thank you! Come back soon.</div>
      </div>
    `;
  },
};
