"use strict";

const HistoryPage = {
  init() {
    Shell.mount("history");
    this.render();
    Shell.bind(this.handlers());
  },

  row(tx) {
    return /* HTML */ `
      <button data-a="open" data-ref="${tx.transactionReference}">
        <span>
          ${tx.transactionReference}<br />
          <small style="color:var(--mute)">
            ${Util.when(tx.dateTime, "medium")} · ${tx.paymentMethod} · ${tx.serviceMode}
          </small>
        </span>
        <b>${Util.peso(tx.total)}</b>
      </button>
    `;
  },

  render() {
    const rows = Tx.history.length
      ? Tx.history.map((tx) => this.row(tx)).join("")
      : Components.empty("No transactions yet.");

    Shell.app().innerHTML = /* HTML */ `
      <h1>History</h1>
      <p class="sub">Completed transactions.</p>
      <div class="hist">${rows}</div>
    `;
  },

  handlers() {
    return {
      open(button) {
        location.href = "receipt.html?ref=" + encodeURIComponent(button.dataset.ref);
      },
    };
  },
};

HistoryPage.init();
