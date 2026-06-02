function tampilkanCart() {
  let cart = JSON.parse(localStorage.getItem("keranjang")) || [];
  let container = document.getElementById("cartContainer");

  let html = "";

  cart.forEach((item) => {
    html += `
      <div class="bg-white border border-gray-300 rounded-2xl p-5 flex items-center justify-between mb-4">

        <div class="flex items-center gap-5">
          <input
            type="checkbox"
            onchange="ceklis(${item.id})"
            ${item.checked ? "checked" : ""}
            class="w-5 h-5"
          />

          <img
            src="${item.image}"
            class="w-24 h-32 object-contain"
          />

          <div>
            <p class="font-semibold text-xl">
              ${item.judul}
            </p>

            <p class="text-sky-700">
              ${item.penulis}
            </p>

            <p class="font-bold text-xl mt-3">
              Rp${item.harga.toLocaleString("id-ID")}
            </p>

            <p class="text-gray-500 mt-1">
              Qty: ${item.quantity}
            </p>
          </div>
        </div>

        <button
          onclick="hapus(${item.id})"
          class="text-red-500"
        >
          Hapus
        </button>

      </div>
    `;
  });

  container.innerHTML = html;
}

tampilkanCart();