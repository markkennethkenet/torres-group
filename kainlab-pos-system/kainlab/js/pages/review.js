"use strict";

const ReviewPage = {
  init() {
    Shell.mount("review");
    if (!Shell.needCart()) return;
    this.render();
    Shell.bind(this.handlers());
  },

  itemRows() {
    return Cart.items
      .map(
        (item) => /* HTML */ `
          <div class="tr">
            <b>${Util.itemLabel(item)}</b>
            <b>${item.quantity}</b>
            <span>${Util.peso(item.price)}</span>
            <b>${Util.peso(Cart.subtotal(item))}</b>
          </div>
        `,
      )
      .join("");
  },

  render() {
    Shell.app().innerHTML = /* HTML */ `
      <div style="max-width:1000px">
        <h1>Order summary</h1>
        <p class="sub">
          ${Cart.mode} · Check your items before paying. Tap Back to make changes — your items stay in
          the cart.
        </p>
        <div class="panelbox">
          <div class="tr h">
            <span>PRODUCT</span>
            <span>QTY</span>
            <span>UNIT PRICE</span>
            <span>SUBTOTAL</span>
          </div>
          ${this.itemRows()}
          <div class="tsum">
            <div>
              <b style="font-size:20px;color:var(--ink)">Total Amount</b>
              <br />
              <span style="color:var(--mute)">${Cart.count()} items</span>
            </div>
            <b>${Util.peso(Cart.total())}</b>
          </div>
        </div>
        <div class="btns">
          <button class="out" data-a="back">${ic("left")} Back / Modify Order</button>
          <button class="pri" data-a="next">Proceed to Payment ${ic("right")}</button>
        </div>
      </div>
    `;
  },

  handlers() {
    return {
      back() {
        location.href = "index.html";
      },
      next() {
        if (Cart.isEmpty()) {
          Shell.leave("index.html", Util.MSG.NEED_CART);
          return;
        }
        location.href = "method.html";
      },
    };
  },
};

ReviewPage.init();
