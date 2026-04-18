// FLOW SISTEM
// User klik + / - → update qty
// Klik submit → ambil semua data
// Filter item yang qty > 0
// Susun jadi text
// Encode → kirim ke WhatsApp

// Ambil semua products card
const card = document.querySelectorAll(".products__card");

//=======================
// 1. HANDLE QTY ( +/- )
// =======================

cards.forEach((card) => {
  const plusBtn = card.querySelector(".qty__plus");
  const minusBtn = card.querySelector(".qty__minus");
  const qtyEl = card.querySelector(".qty__num");

  let qty = 0;

  plusBtn.addEventListener("click", () => {
    qty++;
    qtyEl.textcontent = qty;
  });

  minusBtn.addEventListener("click", () => {
    if (qty > 0) {
      qty--;
      qtyEl.textContent = qty;
    }
  });
});
