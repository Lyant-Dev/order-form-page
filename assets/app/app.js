// FLOW SISTEM
// User klik + / - → update qty
// Klik submit → ambil semua data
// Filter item yang qty > 0
// Susun jadi text
// Encode → kirim ke WhatsApp

// Ambil semua products card
const cards = document.querySelectorAll(".products__card");

// ==========================
// SUMMARY LOGIC
// ==========================

function updateSummary() {
  const summaryList = document.getElementById("summary-list");
  const summaryTotal = document.getElementById("summary-total");

  // RESET ISI
  summaryList.innerHTML = "";

  let total = 0;

  cards.forEach((card) => {
    const name = card.dataset.name;
    const price = Number(card.dataset.price);
    const qty = Number(card.querySelector(".qty__num").textContent);

    if (qty > 0) {
      // BUAT ITEM LIST
      const li = document.createElement("li");
      li.textContent = `${name} x${qty}`;
      summaryList.appendChild(li);

      total += price * qty;
    }
  });

  const formattedTotal = total.toLocaleString("id-ID");

  summaryTotal.textContent = `Total: Rp${formattedTotal}`;

  const submitBtn = document.querySelector(".submit__button");

  if (total > 0) {
    submitBtn.disabled = false;
  } else {
    submitBtn.disabled = true;
  }
}

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
    qtyEl.textContent = qty;
    updateSummary();
  });

  minusBtn.addEventListener("click", () => {
    if (qty > 0) {
      qty--;
      qtyEl.textContent = qty;
      updateSummary();
    }
  });
});

// =======================
// 2. HANDLE SUBMIT FORM
// =======================

//Ambil form
const form = document.getElementById("order-form");

form.addEventListener("submit", function (e) {
  // Cegah reload halaman
  e.preventDefault();

  // ======================
  // 2.1 INIT MESSAGE & TOTAL
  // ======================

  // Text awal pesan

  let message = "Halo, Saya ingin order:\n\n";

  // Total harga
  let total = 0;

  // ======================
  // 2.2 Loop Semua Products
  // ======================

  cards.forEach((card) => {
    // Ambil data dari HTML (data-name & data-price)

    const name = card.dataset.name;
    const price = Number(card.dataset.price);

    //Ambil qty dari tampilan
    const qty = Number(card.querySelector(".qty__num").textContent);

    // Kalau qty > 0 -> masuk ke order
    if (qty > 0) {
      message += `- ${name} x${qty}\n`;

      //Hitung total
      total += price * qty;
    }
  });

  // =======================
  // 2.3 VALIDASI MINIMAL ORDER
  // =======================

  if (total === 0) {
    alert("Pilih minimal 1 menu");
    return; // stop eksekusi
  }

  // ======================
  // AMBIL DATA CUSTOMER
  // ======================

  const customerName = document.getElementById("name").value;
  const number = document.getElementById("number").value;
  const date = document.getElementById("date").value;
  const address = document.getElementById("address").value;
  const note = document.getElementById("note").value;

  // Tambahin total ke pesan
  message += `\nTotal: Rp${formattedTotal}\n\n`;

  // Tambahin ke message
  message += `Nama: ${customerName}\n`;
  message += `No WA: ${number}\n`;
  message += `Tanggal: ${date}\n`;
  message += `Alamat: ${address}\n`;

  // FORMAT NOMOR WA USER
  let cleanNumber = number.replace(/\D/g, ""); //hapus selain angka

  if (cleanNumber.startsWith("0")) {
    cleanNumber = "62" + cleanNumber.slice(1);
  }

  // Catatan Opsional
  if (note) {
    message += `Catatan: ${note}\n`;
  }

  // VALIDASI INPUT

  if (!customerName || !number || !date || !address) {
    alert("Lengkapi data dulu");
    return;
  }

  // =======================
  // 2.5 KIRIM KE WHATSAPP
  // =======================

  const phone = "628138093473"; // GANTI NOMOR TUJUAN

  // Encode biar aman di URL
  const encodedMessage = encodeURIComponent(message);

  //Buat link Whatsapp
  const url = `https://wa.me/${phone}?text=${encodedMessage}`;

  // Buka WhatsApp di tab baru
  window.open(url, "_blank");
});
