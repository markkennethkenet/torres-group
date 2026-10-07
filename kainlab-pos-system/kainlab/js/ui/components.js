"use strict";

const Components = {
  processing(note) {
    return /* HTML */ `
      <div class="proc">
        <b>Processing payment…</b>
        <div class="bar"><i></i></div>
        <small>${note}</small>
      </div>
    `;
  },

  empty(message) {
    return /* HTML */ `<div class="empty">${message}</div>`;
  },

  amountBox(label, amount, highlight = false) {
    const color = highlight ? " style=\"color:var(--brand)\"" : "";
    return /* HTML */ `
      <div class="amt">
        <span>${label}</span>
        <b${color}>${Util.peso(amount)}</b>
      </div>
    `;
  },

  payActions(payLabel, processing, payIcon = "") {
    const disabled = processing ? "disabled" : "";
    const icon = payIcon ? ic(payIcon) + " " : "";
    return /* HTML */ `
      <div class="btns" style="grid-template-columns:1fr 1.4fr">
        <button class="out" ${disabled} data-a="back">${ic("left")} Back</button>
        <button class="pri" ${disabled} data-a="pay">${icon}${payLabel}</button>
      </div>
    `;
  },
};
