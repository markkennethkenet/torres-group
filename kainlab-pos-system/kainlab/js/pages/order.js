"use strict";

const OrderPage = {
  state: {
    category: "Coffee",
    query: "",
    selection: {},
  },

  searchInput: null,

  init() {
    Shell.mount("order", { search: true });
    this.searchInput = document.getElementById("q");
    this.searchInput.addEventListener("input", () => {
      this.state.query = this.searchInput.value;
      this.render();
    });
    Shell.bind(this.handlers());
    this.render();
  },

  getSelection(productId) {
    return this.state.selection[productId] || (this.state.selection[productId] = { size: "Small", qty: 1 });
  },

  productFromButton(button) {
    return Catalog.byId(button.dataset.id);
  },

  visibleProducts() {
    const query = this.state.query.trim().toLowerCase();
    return Catalog.ITEMS.filter((product) =>
      query ? product.name.toLowerCase().includes(query) : product.cat === this.state.category,
    );
  },

  sizeButtons(product, selected) {
    if (!Catalog.hasSizes(product)) return "";

    const buttons = ["Small", "Large"]
      .map((size) => {
        const extra = size === "Large" ? " +₱" + Catalog.LARGE_EXTRA : "";
        return /* HTML */ `
          <button
            class="${selected.size === size ? "on" : ""}"
            data-a="size"
            data-id="${product.id}"
            data-s="${size}"
          >
            ${size}${extra}
          </button>
        `;
      })
      .join("");

    return /* HTML */ `<div class="sz">
      <small>Size</small>
      <div>${buttons}</div>
    </div>`;
  },

  productCard(product) {
    const selected = this.getSelection(product.id);
    const inCart = Cart.items.some((item) => item.productId === product.id);
    const price = Catalog.unitPrice(product, selected.size);

    return /* HTML */ `
      <div class="pc ${inCart ? "in" : ""}">
        <div class="img">${art(product)}</div>
        <div class="pn">
          <span style="color:var(--ink)">${product.name}</span>
          <span>${Util.peso(price)}</span>
        </div>
        <p class="desc">${product.desc}</p>
        ${this.sizeButtons(product, selected)}
        <div class="ar">
          <div class="st">
            <button data-a="qtyMinus" data-id="${product.id}" aria-label="Less">${ic("minus")}</button>
            <b>${selected.qty}</b>
            <button data-a="qtyPlus" data-id="${product.id}" aria-label="More">${ic("plus")}</button>
          </div>
          <button class="add" data-a="add" data-id="${product.id}">Add to Cart</button>
        </div>
      </div>
    `;
  },

  gridHtml() {
    const list = this.visibleProducts();
    if (!list.length) {
      return Components.empty("No products found.<br />Try another name or category.");
    }
    return list.map((product) => this.productCard(product)).join("");
  },

  categoryPills() {
    return Catalog.CATEGORIES.map(
      (category) => /* HTML */ `
        <button
          class="${!this.state.query && category === this.state.category ? "on" : ""}"
          data-a="cat"
          data-c="${category}"
        >
          ${category}
        </button>
      `,
    ).join("");
  },

  modeButtons() {
    return [
      ["Dine in", "dine"],
      ["Take away", "take"],
      ["Delivery", "ride"],
    ]
      .map(
        ([mode, icon]) => /* HTML */ `
          <button class="${Cart.mode === mode ? "on" : ""}" data-a="mode" data-m="${mode}">
            ${ic(icon)}${mode}
          </button>
        `,
      )
      .join("");
  },

  cartItem(item) {
    const product = Catalog.byId(item.productId);
    const sizeLabel = item.size ? item.size + " · " : "";

    return /* HTML */ `
      <div class="item">
        <div class="th">${art(product)}</div>
        <div>
          <b>${item.name}</b>
          <small>${sizeLabel}${Util.peso(item.price)} each</small>
          <div class="q">
            <button data-a="dec" data-k="${item.key}" aria-label="Decrease ${item.name}">
              ${ic("minus")}
            </button>
            <i>${item.quantity}</i>
            <button data-a="inc" data-k="${item.key}" aria-label="Increase ${item.name}">
              ${ic("plus")}
            </button>
          </div>
        </div>
        <div class="rt">
          <b>${Util.peso(Cart.subtotal(item))}</b>
          <br />
          <button class="del" data-a="remove" data-k="${item.key}" aria-label="Remove ${item.name}">
            ${ic("trash")}
          </button>
        </div>
      </div>
    `;
  },

  cartBody() {
    if (Cart.isEmpty()) {
      return /* HTML */ `<div class="empty">
        ${ic("cart")}<b>Your order is empty</b><br />Tap Add to Cart on a product.
      </div>`;
    }
    return Cart.items.map((item) => this.cartItem(item)).join("");
  },

  cartBox() {
    return /* HTML */ `
      <div class="cart">
        <h3>Cart summary</h3>
        <div class="mode">${this.modeButtons()}</div>
        ${this.cartBody()}
        <div class="row2">
          <span>Price</span>
          <span>${Util.peso(Cart.total())}</span>
        </div>
        <div class="row2 g">
          <span>Grand total</span>
          <b>${Util.peso(Cart.total())}</b>
        </div>
        <button class="wide pri ${Cart.isEmpty() ? "dis" : ""}" data-a="place">Place an order</button>
      </div>
    `;
  },

  render() {
    Shell.app().innerHTML = /* HTML */ `
      <h1>Menu</h1>
      <div class="pills">${this.categoryPills()}</div>
      <div class="cols">
        <div class="grid" id="grid">${this.gridHtml()}</div>
        ${this.cartBox()}
      </div>
    `;
    Shell.refreshBadge();
  },

  refreshGrid() {
    document.getElementById("grid").innerHTML = this.gridHtml();
  },

  setCategory(button) {
    this.state.category = button.dataset.c;
    this.state.query = "";
    this.searchInput.value = "";
    this.render();
  },

  setSize(button) {
    this.getSelection(+button.dataset.id).size = button.dataset.s;
    this.refreshGrid();
  },

  changeQty(button, delta) {
    const selected = this.getSelection(+button.dataset.id);
    const next = selected.qty + delta;
    if (next < 1 || next > 20) return;
    selected.qty = next;
    this.refreshGrid();
  },

  addToCart(button) {
    const product = this.productFromButton(button);
    const selected = this.getSelection(product.id);
    const size = Catalog.hasSizes(product) ? selected.size : null;
    Cart.add(product, size, selected.qty);
    selected.qty = 1;
    this.render();
    Util.toast(`${product.name}${size ? " (" + size + ")" : ""} added to order.`);
  },

  changeLine(button, delta) {
    const quantity = Cart.find(button.dataset.k)?.quantity;
    Cart.change(button.dataset.k, delta);
    this.render();
    if (delta < 0 && quantity === 1) Util.toast(Util.MSG.ITEM_REMOVED, "warn");
  },

  removeLine(button) {
    Cart.remove(button.dataset.k);
    this.render();
    Util.toast(Util.MSG.ITEM_REMOVED, "warn");
  },

  placeOrder() {
    if (Cart.isEmpty()) {
      Util.toast(Util.MSG.NEED_CART, "warn");
      return;
    }
    location.href = "review.html";
  },

  handlers() {
    return {
      cat: (button) => this.setCategory(button),
      size: (button) => this.setSize(button),
      qtyPlus: (button) => this.changeQty(button, 1),
      qtyMinus: (button) => this.changeQty(button, -1),
      add: (button) => this.addToCart(button),
      mode: (button) => {
        Cart.setMode(button.dataset.m);
        this.render();
      },
      inc: (button) => this.changeLine(button, 1),
      dec: (button) => this.changeLine(button, -1),
      remove: (button) => this.removeLine(button),
      place: () => this.placeOrder(),
    };
  },
};

OrderPage.init();
