"use strict";

const QrPage = {
  init() {
    Shell.mount("qr");
    if (!Shell.needCart()) return;
    Shell.bind(this.handlers());
    this.render(false);
  },

  render(processing) {
    Shell.app().innerHTML = /* HTML */ `
      <div class="two" style="margin-top:20px">
        <div class="qrcard">
          <div>
            <div class="qrbox">
              <i style="top:8%;left:8%"></i>
              <i style="top:8%;right:8%"></i>
              <i style="bottom:8%;left:8%"></i>
              <div>QR CODE<br /><small>placeholder</small></div>
            </div>
            <div class="note">Ref: QR-${Tx.peekRef()}</div>
          </div>
        </div>
        <div>
          <h2>
            ${ic("qr")} QR Payment
            <small style="font-size:16px;color:var(--brand)">(simulation)</small>
          </h2>
          ${Components.amountBox("Amount to pay", Cart.total(), true)}
          <ul class="how">
            <li><b>1</b>Scan the QR code using your supported payment application.</li>
            <li>
              <b>2</b>Check that the amount is ${Util.peso(Cart.total())} and approve it in your app.
            </li>
            <li><b>3</b>Tap Confirm Payment below.</li>
          </ul>
          ${processing ? Components.processing("Please wait. Do not close this screen.") : ""}
          ${Components.payActions("Confirm Payment", processing, "check")}
          <p class="note">
            Simulated payment — the amount paid will equal the total, with ₱0.00 change.
          </p>
        </div>
      </div>
    `;
  },

  handlers() {
    return {
      back() {
        location.href = "method.html";
      },
      pay: () => Payment.pay("QR Payment", null, () => this.render(true)),
    };
  },
};

QrPage.init();
