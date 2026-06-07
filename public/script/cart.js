const sessionUser = sessionStorage.getItem("name");

function tampilkanCart() {
  let cart = JSON.parse(localStorage.getItem(`keranjang_${sessionUser}`)) || [];
  let container = document.getElementById("cartContainer");
    // localStorage.removeItem(`keranjang_${sessionUser}`);
  console.log(cart);

  let html = "";

  cart.forEach((item) => {
   html += `
  <div class="bg-white border border-gray-300 rounded-2xl px-4 py-3 flex items-center justify-between mb-3 shadow-sm">

    <div class="flex items-center gap-4">
      <input
        type="checkbox"
        onchange="ceklis(${item.id})"
        ${item.checked ? "checked" : ""}
        class="w-4 h-4"
      />

      <img
        src="${item.image}"
        class="w-16 h-20 object-contain"
      />

      <div>
        <p class="text-xs text-gray-400">
          ${item.penulis}
        </p>

        <p class="font-semibold text-lg leading-5 mt-1">
          ${item.judul}
        </p>

        <p class="font-semibold text-gray-500 mt-4">
          Rp${item.harga.toLocaleString("id-ID")}
        </p>
      </div>
    </div>

    <div class="flex items-center gap-3">
      <button onclick="hapus(${item.id})">
        <iconify-icon
          icon="mdi:trash"
          class="text-xl flex items-center text-gray-500"
        ></iconify-icon>
      </button>

      <div class="flex items-center gap-1">
      <button
        onclick="kurangQty(${item.id})"
        class="bg-gray-300 w-5 h-5 rounded-sm items-center flex text-center text-sm justify-center cursor-pointer"
      >-</button>

      <p class="text-sm text-center w-5">
        ${item.quantity}
      </p>

      <button
        onclick="tambahQty(${item.id})"
        class="bg-gray-300 w-5 h-5 rounded-sm items-center flex text-center text-sm justify-center"
      >+</button>
      </div>
    </div>
  </div>
`;
  });

  container.innerHTML = html;
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

tampilkanCart();