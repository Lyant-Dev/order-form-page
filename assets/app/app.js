// ========================
// GLOBAL SELECTOR
// ========================

const cards = document.querySelectorAll(".products__card");
const summaryList = document.getElementById("summary-list");
const summaryTotal = document.getElementById("summary-total");
const submitBtn = document.querySelector(".submit__button");
const form = document.getElementById("order-form");

// ========================
// GET CART ITEMS (CORE LOGIC)
// ========================

function getCartItems() {
  const items = [];

  cards.forEach((card) => {
    const name = card.dataset.name;
    const price = Number(card.dataset.price);
    const qty = Number(card.querySelector(".qty__num").textContent);

    if (qty > 0) {
      items.push({ name, price, qty });
    }
  });

  return items;
}

// ========================
// HITUNG TOTAL
// ========================

function calculateTotal(items) {
  let total = 0;

  items.forEach((item) => {
    total += item.price * item.qty;
  });

  return total;
}

// ========================
// RENDER SUMMARY UI
// ========================

function updateSummary() {
  const items = getCartItems();
  const total = calculateTotal(items);

  // reset list
  summaryList.innerHTML = "";

  // kalau kosong
  if (items.length === 0) {
    summaryList.innerHTML = "<li>Belum ada pesanan</li>";
  } else {
    items.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = `${item.name} x${item.qty}`;
      summaryList.appendChild(li);
    });
  }

  // format total
  const formattedTotal = total.toLocaleString("id-ID");
  summaryTotal.textContent = `Total: Rp${formattedTotal}`;

  // enable / disable button
  submitBtn.disabled = total === 0;
}

// ========================
// HANDLE QTY BUTTON
// ========================

cards.forEach((card) => {
  const plusBtn = card.querySelector(".qty__plus");
  const minusBtn = card.querySelector(".qty__minus");
  const qtyEl = card.querySelector(".qty__num");

  plusBtn.addEventListener("click", () => {
    let qty = Number(qtyEl.textContent);
    qtyEl.textContent = qty + 1;
    updateSummary();
  });

  minusBtn.addEventListener("click", () => {
    let qty = Number(qtyEl.textContent);
    if (qty > 0) {
      qtyEl.textContent = qty - 1;
      updateSummary();
    }
  });
});

// ========================
// FORMAT NOMOR WA
// ========================

function formatPhone(number) {
  let clean = number.replace(/\D/g, "");

  if (clean.startsWith("0")) {
    return "62" + clean.slice(1);
  }

  if (!clean.startsWith("62")) {
    return "62" + clean;
  }

  return clean;
}

// ========================
// BUILD MESSAGE
// ========================

function buildMessage(items, customer, total) {
  let message = "Halo, Saya ingin order:\n\n";

  items.forEach((item) => {
    message += `- ${item.name} x${item.qty}\n`;
  });

  const formattedTotal = total.toLocaleString("id-ID");

  message += `\nTotal: Rp${formattedTotal}\n\n`;
  message += `Nama: ${customer.name}\n`;
  message += `No WA: ${customer.phone}\n`;
  message += `Tanggal: ${customer.date}\n`;
  message += `Alamat: ${customer.address}\n`;

  if (customer.note) {
    message += `Catatan: ${customer.note}\n`;
  }

  return message;
}

// ========================
// HANDLE SUBMIT
// ========================

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const items = getCartItems();
  const total = calculateTotal(items);

  if (total === 0) {
    alert("Pilih minimal 1 menu");
    return;
  }

  // ambil data user
  const customer = {
    name: document.getElementById("name").value,
    phone: formatPhone(document.getElementById("number").value),
    date: document.getElementById("date").value,
    address: document.getElementById("address").value,
    note: document.getElementById("note").value,
  };

  // validasi
  if (!customer.name || !customer.phone || !customer.date || !customer.address) {
    alert("Lengkapi data dulu");
    return;
  }

  // build message
  const message = buildMessage(items, customer, total);

  // kirim WA
  const phone = "628138093473";
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");
});

// ========================
// INIT
// ========================

updateSummary();