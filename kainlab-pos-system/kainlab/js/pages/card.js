"use strict";

const CardPage = {
  init() {
    Shell.mount("card");
    if (!Shell.needCart()) return;
    Shell.bind(this.handlers());
    this.render(false);
  },

  readerSvg(processing) {
    return /* HTML */ `
      <svg
        viewBox="0 0 300 330"
        width="100%"
        style="max-width:320px"
        role="img"
        aria-label="Card reader"
      >
        <rect x="40" y="40" width="190" height="270" rx="30" fill="#3b2a20" />
        <rect x="58" y="62" width="154" height="90" rx="10" fill="#1d1511" />
        <text x="72" y="95" fill="#f4a46c" font-size="12" font-family="monospace">
          ${processing ? "PROCESSING" : "READY"}
        </text>
        <text x="72" y="130" fill="#fff" font-size="22" font-weight="800" font-family="sans-serif">
          ${Util.peso(Cart.total())}
        </text>
        <path
          d="M110 200a30 30 0 010 50M125 190a45 45 0 010 70"
          stroke="#f4a46c"
          stroke-width="6"
          fill="none"
          stroke-linecap="round"
        />
        <g transform="rotate(-12 200 110)">
          <rect x="150" y="60" width="130" height="85" rx="12" fill="#a0643a" />
          <rect x="165" y="80" width="26" height="20" rx="4" fill="#fcd34d" />
          <text x="165" y="125" fill="#fff" font-size="11" font-family="monospace">
            •••• •••• •••• 4821
          </text>
        </g>
      </svg>
    `;
  },

  render(processing) {
    Shell.app().innerHTML = /* HTML */ `
      <div class="two" style="margin-top:20px">
        <div class="term">${this.readerSvg(processing)}</div>
        <div>
          <h2>
            ${ic("card")} Credit / Debit Card
            <small style="font-size:16px;color:var(--brand)">(simulation)</small>
          </h2>
          ${Components.amountBox("Amount due", Cart.total(), true)}
          <h3 style="font-size:22px;margin:0 0 12px">Please tap, insert, or swipe your card.</h3>
          ${processing
            ? Components.processing("Do not remove your card until the payment is complete.")
            : ""}
          ${Components.payActions("Process Payment", processing)}
          <p class="note">Simulation only. No real card data is read or stored.</p>
        </div>
      </div>
    `;
  },

  handlers() {
    return {
      back() {
        location.href = "method.html";
      },
      pay: () => Payment.pay("Card", null, () => this.render(true)),
    };
  },
};

CardPage.init();
