let books = [];

async function ambilBuku() {
  try {
    let response = await fetch("/public/data/books.json");
    books = await response.json();

    tampilkanBuku(books);
  } catch (error) {
    console.error("Gagal memuat buku", error);
  }
}

function tampilkanBuku(data) {
  let container = document.getElementById("productList");
  let html = "";

  data.forEach((book) => {
    html += `
      <div class="bg-white border border-gray-300 w-full max-w-65 h-80 rounded-2xl">
        <div class="relative">

          <div
            class="bg-gray-100 w-fit p-2 rounded-full flex gap-2 items-center absolute right-3 top-3 z-10"
          >
            <button class="flex items-center">
              <iconify-icon
                icon="mdi:heart"
                width="24"
                height="24"
                class="text-gray-500"
              ></iconify-icon>
            </button>

            <button
              onclick="tambahKeranjang(${book.id})"
              class="flex items-center"
            >
              <iconify-icon
                icon="mdi:cart"
                width="24"
                height="24"
                class="text-gray-500"
              ></iconify-icon>
            </button>
          </div>

          <a href="detail.html?id=${book.id}">
            <div class="h-40 p-5 flex items-center justify-center">
              <img
                src="${book.image}"
                alt="${book.judul}"
                class="w-70 h-50 object-contain rounded-t-2xl"
              />
            </div>

            <div class="px-3 py-2 h-28 flex flex-col justify-between">
              <div>
                <p class="font-medium text-l">
                  ${book.judul}
                </p>

                <p class="text-sm text-sky-700">
                  ${book.penulis}
                </p>
              </div>

              <p class="font-semibold text-lg">
                Rp${book.harga.toLocaleString("id-ID")}
              </p>
            </div>
          </a>

        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function filterKategori(kategori) {
  let hasil = books.filter((book) => book.kategori === kategori);

  tampilkanBuku(hasil);
}

function filterTopRated() {
  let hasil = [...books].sort((a, b) => b.rating.rate - a.rating.rate);

  tampilkanBuku(hasil);
}

function filterMostSold() {
  let hasil = [...books].sort((a, b) => b.rating.count - a.rating.count);

  tampilkanBuku(hasil);
}

function filterHarga(min, max) {
  let hasil = books.filter((book) => {
    return book.harga >= min && book.harga <= max;
  });

  tampilkanBuku(hasil);
}

ambilBuku();