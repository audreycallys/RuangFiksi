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
     <div class="bg-white border border-gray-300 w-full h-70 rounded-2xl overflow-hidden">
  <div class="relative h-full">

    <div
      class="bg-gray-100 w-fit p-1.5 rounded-full flex gap-2 items-center absolute right-3 top-3 z-10"
    >
      <button class="flex items-center">
        <iconify-icon icon="mdi:heart" width="24" height="24" class="text-gray-500"></iconify-icon>
      </button>

      <button onclick="tambahKeranjang(${book.id})" class="flex items-center">
        <iconify-icon icon="mdi:cart" width="24" height="24" class="text-gray-500"></iconify-icon>
      </button>
    </div>

    <a href="detail.html?id=${book.id}" class="h-full flex flex-col">
      <div class="h-40 p-4 flex items-center justify-center">
        <img
          src="${book.image}"
          alt="${book.judul}"
          class="w-48 h-40 object-contain"
        />
      </div>

      <div class="px-3 py-2 flex-1 flex flex-col justify-between">
        <div>
          <p class="font-medium text-base leading-5 line-clamp-2">
            ${book.judul}
          </p>

          <p class="text-sm text-sky-700 mt-1 line-clamp-1">
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