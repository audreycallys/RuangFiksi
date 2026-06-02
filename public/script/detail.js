let books = {};
let semuaBuku = [];

const params = new URLSearchParams(window.location.search);
const booksId = params.get("id");

async function ambilBuku() {
  let response = await fetch("/public/data/books.json");
  let data = await response.json();
  semuaBuku = data;

  books = data.find((book) => book.id == booksId);

  books = data.find((book) => book.id == booksId);
  tampilkanBuku();
  tampilkanBukuTerkait(data);

  console.log(books);
}

function tampilkanBuku() {
  let container = document.getElementById("detailBuku");

  container.innerHTML = `
    <div class="w-full">
    <div class="flex gap-15 items-start w-full">
      <div class="flex items-center justify-center">
        <div class="w-[600px] h-[480px] flex items-center justify-center overflow-hidden rounded-xl bg-gray-200 p-16">
          <img
            src="${books.image}"
            alt="${books.judul}"
            class="max-w-full max-h-full object-contain"
          />
        </div>
      </div>

     <div class="flex flex-col justify-between h-[480px] flex-1">
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

    <p class="text-3xl font-semibold mt-7">
      Rp${books.harga.toLocaleString("id-ID")}
    </p>

    <p class="text-gray-500 mt-3 max-w-[600px] leading-7">
      ${books.deskripsi}
    </p>

    <div class="flex items-center gap-8 mt-10">
      <div class="flex items-center gap-1 text-gray-500">
        <iconify-icon
          icon="material-symbols:star-rounded"
          class="text-3xl"
        ></iconify-icon>
        <p>(${books.rating.rate})</p>
      </div>

      <p class="text-gray-500">
        ${books.rating.count} Sold
      </p>
    </div>
  </div>

  <div class="flex gap-5">
    <button onclick="tambahKeranjang(${books.id})" class="bg-gray-300 rounded-xl flex-1 py-2.5 text-xl">
      Add To Cart
    </button>

    <button onclick="tambahWishlist(${books.id})" class="bg-gray-300 rounded-xl flex-1 py-2.5 text-xl">
      Add To Wishlist
    </button>
  </div>
</div>
    </div>

     <div class="grid grid-cols-6 gap-8 mt-25 mb-25">
      <div class="bg-gray-100 rounded-lg p-5 text-center">
        <iconify-icon icon="mdi:book-open-page-variant" class="text-3xl"></iconify-icon>
        <p class="text-sm text-gray-500 mt-2">Halaman</p>
        <p class="font-semibold">${books.detailBuku.halaman}</p>
      </div>

      <div class="bg-gray-100 rounded-lg p-5 text-center">
        <iconify-icon icon="mdi:translate" class="text-3xl"></iconify-icon>
        <p class="text-sm text-gray-500 mt-2">Bahasa</p>
        <p class="font-semibold">${books.detailBuku.bahasa}</p>
      </div>

      <div class="bg-gray-100 rounded-lg p-5 text-center">
        <iconify-icon icon="mdi:weight" class="text-3xl"></iconify-icon>
        <p class="text-sm text-gray-500 mt-2">Berat</p>
        <p class="font-semibold">${books.detailBuku.berat}</p>
      </div>

      <div class="bg-gray-100 rounded-lg p-5 text-center">
        <iconify-icon icon="mdi:barcode" class="text-3xl"></iconify-icon>
        <p class="text-sm text-gray-500 mt-2">ISBN</p>
        <p class="font-semibold text-xs break-all">${books.detailBuku.isbn}</p>
      </div>

      <div class="bg-gray-100 rounded-lg p-5 text-center">
        <iconify-icon icon="mdi:calendar-month" class="text-3xl"></iconify-icon>
        <p class="text-sm text-gray-500 mt-2">Terbit</p>
        <p class="font-semibold text-xs">${books.detailBuku.tanggalTerbit}</p>
      </div>

      <div class="bg-gray-100 rounded-lg p-5 text-center">
        <iconify-icon icon="mdi:office-building" class="text-3xl"></iconify-icon>
        <p class="text-sm text-gray-500 mt-2">Penerbit</p>
        <p class="font-semibold text-xs">${books.detailBuku.penerbit}</p>
      </div>
    </div>
    </div>
  `;
}

function tampilkanBukuTerkait(data) {
  let container = document.getElementById("bukuTerkait");

  let bukuTerkait = data
    .filter((book) => book.kategori === books.kategori && book.id != books.id)
    .slice(0, 5);

  let html = "";

  bukuTerkait.forEach((book) => {
    html += `
      <div class="bg-white border border-gray-300 w-55 h-70 rounded-2xl flex items-center justify-center">

  <div class="relative">
    
    <div
      class="bg-gray-100 w-fit p-1.5 rounded-full flex gap-2 items-center absolute right-3 top-3 z-10"
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
          class="w-50 h-40 object-contain rounded-t-2xl"
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

function tambahKeranjang(id) {
  let book = semuaBuku.find((item) => item.id === id);

  let cart = JSON.parse(localStorage.getItem("keranjang")) || [];

  let cek = cart.find((item) => item.id === id);

  if (cek) {
    cek.quantity += 1;
  } else {
    book.quantity = 1;
    cart.push(book);
  }

  localStorage.setItem("keranjang", JSON.stringify(cart));

  alert("Buku berhasil masuk ke keranjang!");
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
