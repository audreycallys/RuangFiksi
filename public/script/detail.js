let books = {};

const params = new URLSearchParams(window.location.search);
const booksId = params.get("id");

async function ambilBuku() {
  let response = await fetch("/public/data/books.json");
  let data = await response.json();

  books = data.find((book) => book.id == booksId);
  tampilkanBuku();

  console.log(books);
}

function tampilkanBuku() {
  let container = document.getElementById("detailBuku");

  container.innerHTML = `
    <div class="flex gap-15">
      <div class="flex items-center justify-center">
        <div class="w-[600px] h-[500px] flex items-center justify-center overflow-hidden rounded-xl bg-gray-300 p-16">
          <img
            src="${books.image}"
            alt="${books.judul}"
            class="max-w-full max-h-full object-contain"
          />
        </div>
      </div>

      <div>
        <p class="border border-gray-600 text-gray-600 rounded-full w-fit px-3 text-sm">
          ${books.kategori}
        </p>

        <h1 class="text-5xl font-bold mt-5">
          ${books.judul}
        </h1>

        <p class="text-2xl mt-3">
          ${books.penulis}
        </p>

        <p class="text-3xl font-semibold mt-8">
          Rp${books.harga.toLocaleString("id-ID")}
        </p>

        <p class="text-gray-500 mt-3 max-w-[600px] leading-7">
          ${books.deskripsi}
        </p>

        <div class="grid grid-cols-6 gap-4 mt-8">
  <div class="bg-gray-100 rounded-xl p-4 text-center">
    <iconify-icon icon="mdi:book-open-page-variant" class="text-2xl"></iconify-icon>
    <p class="text-xs text-gray-500 mt-2">Halaman</p>
    <p class="font-semibold">${books.detailBuku.halaman}</p>
  </div>

  <div class="bg-gray-100 rounded-xl p-4 text-center">
    <iconify-icon icon="mdi:translate" class="text-2xl"></iconify-icon>
    <p class="text-xs text-gray-500 mt-2">Bahasa</p>
    <p class="font-semibold">${books.detailBuku.bahasa}</p>
  </div>

  <div class="bg-gray-100 rounded-xl p-4 text-center">
    <iconify-icon icon="mdi:weight" class="text-2xl"></iconify-icon>
    <p class="text-xs text-gray-500 mt-2">Berat</p>
    <p class="font-semibold">${books.detailBuku.berat}</p>
  </div>

  <div class="bg-gray-100 rounded-xl p-4 text-center">
    <iconify-icon icon="mdi:barcode" class="text-2xl"></iconify-icon>
    <p class="text-xs text-gray-500 mt-2">ISBN</p>
    <p class="font-semibold text-xs">${books.detailBuku.isbn}</p>
  </div>

  <div class="bg-gray-100 rounded-xl p-4 text-center">
    <iconify-icon icon="mdi:calendar-month" class="text-2xl"></iconify-icon>
    <p class="text-xs text-gray-500 mt-2">Terbit</p>
    <p class="font-semibold text-xs">${books.detailBuku.tanggalTerbit}</p>
  </div>

  <div class="bg-gray-100 rounded-xl p-4 text-center">
    <iconify-icon icon="mdi:office-building" class="text-2xl"></iconify-icon>
    <p class="text-xs text-gray-500 mt-2">Penerbit</p>
    <p class="font-semibold text-xs">${books.detailBuku.penerbit}</p>
  </div>
</div
      </div>
    </div>
  `;
}

ambilBuku();

// async function ambilBuku() {
//   try {
//     let response = await fetch("/public/data/books.json");
//     let data = await response.json();

//     books = data.find((book) => book.id == booksId);

//     tampilkanBuku();
//   } catch (error) {
//     console.error("Gagal memuat buku", error);
//   }
// }

// function tampilkanBuku() {
//   let container = document.getElementById("detailBuku");

//   container.innerHTML = `

//   `;
// }

// function buyNow() {
//     alert("Terima kasih sudah membeli buku ini!");
// }

// ambilBuku();
