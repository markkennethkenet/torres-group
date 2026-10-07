"use strict";

const Util = {
  STORAGE: {
    CART: "kl_cart",
    TX: "kl_tx",
    HISTORY: "kl_history",
    LAST: "kl_last",
    FLASH: "kl_flash",
  },

  MSG: {
    NEED_CART: "Please add at least one product before proceeding.",
    ITEM_REMOVED: "Item removed.",
    PAY_FAIL: "Payment could not be completed.",
    PAY_OK: "Payment successful!",
    NEW_TX: "New transaction started — previous order cleared",
    NO_TX: "No completed transaction yet.",
    NO_RECEIPT: "Receipt not found.",
    INVALID_AMOUNT: "Please enter a valid amount.",
    SHORT_CASH: "Insufficient cash.",
    PRINT_FAIL: "Printing is not available here.",
  },

  cents(amount) {
    return Math.round(Number(amount) * 100);
  },

  peso(amount) {
    return (
      "₱" +
      Number(amount).toLocaleString("en-PH", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    );
  },

  pad(value, length) {
    return String(value).padStart(length, "0");
  },

  ymd(date) {
    return date.getFullYear() + Util.pad(date.getMonth() + 1, 2) + Util.pad(date.getDate(), 2);
  },

  when(date, dateStyle = "long") {
    return date.toLocaleString("en-PH", {
      dateStyle,
      timeStyle: "short",
    });
  },

  itemLabel(item) {
    return item.size ? `${item.name} (${item.size})` : item.name;
  },

  readJson(storage, key, fallback) {
    try {
      const raw = storage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (error) {
      return fallback;
    }
  },

  writeJson(storage, key, value) {
    try {
      storage.setItem(key, JSON.stringify(value));
    } catch (error) {}
  },

  removeKey(storage, key) {
    try {
      storage.removeItem(key);
    } catch (error) {}
  },

  toast(message, type = "success") {
    const el = document.getElementById("toast");
    el.innerHTML = ic(type === "success" ? "check" : "alert") + `<span>${message}</span>`;
    el.className = "show " + type;
    clearTimeout(Util._toastTimer);
    Util._toastTimer = setTimeout(() => {
      el.className = "";
    }, 2400);
  },
};
