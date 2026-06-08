const sessionUser = sessionStorage.getItem("name");

function tampilkanCart() {
  let cart = JSON.parse(localStorage.getItem(`keranjang_${sessionUser}`)) || [];
  let container = document.getElementById("cartContainer");

  let html = "";

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="bg-white border border-[#E8E0D7] shadow-[0px_0px_30px_0px_rgba(0,0,0,0.08)] rounded-2xl p-8 md:p-12 text-center">
        <p class="text-xl md:text-2xl font-bold text-[#3D342B]">
          Keranjang masih kosong
        </p>
        <p class="mt-2 text-sm md:text-base text-[#8C7A69]">
          Silakan pilih buku terlebih dahulu.
        </p>
      </div>
    `;

    tampilkanTotal();
    return;
  }

  cart.forEach((item) => {
   html += `
  <div class="bg-white border border-[#E8E0D7] rounded-2xl px-3 sm:px-4 py-3 flex items-center justify-between gap-3 shadow-sm">

    <div class="flex items-center gap-3 min-w-0 flex-1">
      <input
        type="checkbox"
        onchange="ceklis(${item.id})"
        ${item.checked ? "checked" : ""}
        class="w-4 h-4 shrink-0"
      />

      <img
        src="${item.image}"
        class="w-12 h-16 sm:w-14 sm:h-18 md:w-16 md:h-20 object-contain shrink-0"
      />

      <div class="min-w-0 flex-1">
        <p class="text-xs text-[#8C7A69] line-clamp-1">
          ${item.penulis}
        </p>

        <p class="font-semibold text-sm sm:text-base md:text-lg leading-5 mt-1 text-[#3D342B] line-clamp-2">
          ${item.judul}
        </p>

        <p class="font-semibold text-[#6B5B4D] mt-1 sm:mt-2 text-sm md:text-base">
          Rp${item.harga.toLocaleString("id-ID")}
        </p>
      </div>
    </div>

    <div class="flex flex-col sm:flex-row items-end sm:items-center gap-3 shrink-0">
      <button onclick="hapus(${item.id})">
        <iconify-icon
          icon="mdi:trash"
          class="text-lg sm:text-xl flex items-center text-[#8C7A69] hover:text-red-500 transition"
        ></iconify-icon>
      </button>

        <div class="flex items-center gap-1.5">
          <button
            onclick="kurangQty(${item.id})"
            class="bg-[#E8E0D7] text-[#3D342B] w-5 h-5 rounded-md flex items-center justify-center hover:bg-[#D9D1C7] transition cursor-pointer text-xs"
          >
            -
          </button>

          <p class="text-sm text-center w-4 text-[#3D342B]">
            ${item.quantity}
          </p>

          <button
            onclick="tambahQty(${item.id})"
            class="bg-[#E8E0D7] text-[#3D342B] w-5 h-5 rounded-md flex items-center justify-center hover:bg-[#D9D1C7] transition cursor-pointer text-xs"
          >
            +
          </button>
        </div>
    </div>
  </div>
`;
  });

  container.innerHTML = html;
  tampilkanTotal();
}

function tampilkanTotal() {
  let cart = JSON.parse(localStorage.getItem(`keranjang_${sessionUser}`)) || [];

  let total = cart
    .filter((item) => item.checked === true)
    .reduce((sum, item) => {
      return sum + item.harga * item.quantity;
    }, 0);

  document.getElementById("subtotal").innerText =
    `Rp${total.toLocaleString("id-ID")}`;

  document.getElementById("total").innerText =
    `Rp${total.toLocaleString("id-ID")}`;
}

function hapus(id) {
  let cart = JSON.parse(localStorage.getItem(`keranjang_${sessionUser}`)) || [];

  cart = cart.filter((item) => item.id !== id);

  localStorage.setItem(`keranjang_${sessionUser}`, JSON.stringify(cart));

  tampilkanCart();
}

function hapusSemua() {
  if (confirm("Apakah Anda yakin ingin menghapus semua item di keranjang?")) {
    localStorage.removeItem(`keranjang_${sessionUser}`);
    tampilkanCart();
  }
}

function ceklis(id) {
  let cart = JSON.parse(localStorage.getItem(`keranjang_${sessionUser}`)) || [];

  let product = cart.find((item) => item.id === id);

  if (!product) return;

  product.checked = !product.checked;

  localStorage.setItem(`keranjang_${sessionUser}`, JSON.stringify(cart));

  tampilkanCart();
}

function tambahQty(id) {
  let cart = JSON.parse(localStorage.getItem(`keranjang_${sessionUser}`)) || [];

  let product = cart.find((item) => item.id === id);

  product.quantity += 1;

  localStorage.setItem(`keranjang_${sessionUser}`, JSON.stringify(cart));

  tampilkanCart();
}

function kurangQty(id) {
  let cart = JSON.parse(localStorage.getItem(`keranjang_${sessionUser}`)) || [];

  let product = cart.find((item) => item.id === id);

  product.quantity -= 1;

  if (product.quantity <= 0) {
    cart = cart.filter((item) => item.id !== id);
  }

  localStorage.setItem(`keranjang_${sessionUser}`, JSON.stringify(cart));

  tampilkanCart();
}

function checkout() {
  let cart = JSON.parse(localStorage.getItem(`keranjang_${sessionUser}`)) || [];

  let dipilih = cart.filter((item) => item.checked === true);

  if (dipilih.length === 0) {
    alert("Pilih buku terlebih dahulu sebelum checkout.");
    return;
  }

  alert("Checkout berhasil!");

  cart = cart.filter((item) => item.checked !== true);

  localStorage.setItem(`keranjang_${sessionUser}`, JSON.stringify(cart));

  tampilkanCart();
}

tampilkanCart();
