// FLOW SISTEM
// User klik + / - → update qty
// Klik submit → ambil semua data
// Filter item yang qty > 0
// Susun jadi text
// Encode → kirim ke WhatsApp

// Ambil semua products card
const cards = document.querySelectorAll(".products__card");

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
  });

  minusBtn.addEventListener("click", () => {
    if (qty > 0) {
      qty--;
      qtyEl.textContent = qty;
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

  const message = "Halo, Saya ingin order:\n\n";

  // Total harga
  let total = 0;

  // ======================
  // 2.2 Loop Semua Products
  // ======================

  cards.forEach((card) => {
    //Ambil data dari HTML (products__title & products__price )
    const name = card.dataset.name;
    const price = Number(card.dataset.price);

    //Ambil qty dari tampilan
    const qty = Number(card.querySelector(".qty__num").textContent);

    // Kalau qty > 0 -> masuk ke order
    if (qty > 0) {
      message += `- ${name} x${qty}\n`;

      //Hitug total
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

  // Tambahin total ke pesan
  message += `\nTotal: Rp${total}\n\n`;

  // Tambahin ke message
  message += `Nama: ${customerName}\n`;
  message += `No WA: ${number}\n`;
  message += `Tanggal: ${date}\n`;
  message += `Alamat: ${address}\n`;

  // Catatan Opsional
  if (note) {
    message += `Catatan: ${note}\n`;
  }

  // =======================
  // 2.5 KIRIM KE WHATSAPP
  // =======================

  const phone = "08138093473"; // GANTI NOMOR TUJUAN

  // Encode biar aman di URL
  const encodedMessage = encodeURIComponent(message);

  //Buat link Whatsapp
  const url = `https://wa.me/${phone}?text=${encodeMessage}`;

  // Buka WhatsApp di tab baru
  window.open(url, "_blank");
});
