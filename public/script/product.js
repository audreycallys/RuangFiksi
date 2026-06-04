let books = [];

async function ambilBuku() {
  try {
    let response = await fetch("/public/data/books.json");
    books = await response.json();

    tampilkanBuku(books.slice(0, 12));

    tampilkanMostSold();
    tampilkanTopRated();

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

function cardBook(book) {
  return `
    <div class="bg-white border border-gray-300 w-full h-80 rounded-2xl overflow-hidden">

      <div class="h-40 p-4 flex items-center justify-center">
        <img
          src="${book.image}"
          alt="${book.judul}"
          class="w-48 h-40 object-contain"
        />
      </div>

      <div class="px-3 py-2">
        <p class="font-medium text-base line-clamp-2">
          ${book.judul}
        </p>

        <p class="text-sm text-sky-700 mt-1">
          ${book.penulis}
        </p>

        <p class="font-semibold text-lg mt-4">
          Rp${book.harga.toLocaleString("id-ID")}
        </p>
      </div>

    </div>
  `;
}

function filterKategori(kategori) {
  if (kategori === "All") {
    tampilkanBuku(books.slice(0, 12));
  } else {
    let hasil = books.filter((book) => book.kategori === kategori);

    tampilkanBuku(hasil.slice(0, 12));
  }
}

function tambahKeranjang(id) {
  if (!user) {
    alert("Silakan login terlebih dahulu.");
    window.location.href = "/dist/auth/login.html";
    return;
  }

  let book = books.find((item) => item.id === id);
  let cart = JSON.parse(localStorage.getItem(`keranjang_${user}`)) || [];
  let cek = cart.find((item) => item.id === id);

  if (cek) {
    cek.quantity += 1;
  } else {
    cart.push({
      id: book.id,
      judul: book.judul,
      penulis: book.penulis,
      harga: book.harga,
      image: book.image,
      quantity: 1,
      checked: false,
    });
  }

  localStorage.setItem(`keranjang_${user}`, JSON.stringify(cart));

  alert("Buku berhasil masuk ke keranjang!");
}

function tampilkanMostSold() {
  let container = document.getElementById("mostSoldList");

  let mostSold = [...books]
    .sort((a, b) => b.rating.count - a.rating.count)
    .slice(0, 5);

  let html = "";

  mostSold.forEach((book) => {
    html += cardBook(book);
  });

  container.innerHTML = html;
}

function tampilkanTopRated() {
  let container = document.getElementById("topRatedList");

  let topRated = [...books]
    .sort((a, b) => b.rating.rate - a.rating.rate)
    .slice(0, 5);

  let html = "";

  topRated.forEach((book) => {
    html += cardBook(book);
  });

  container.innerHTML = html;
}

ambilBuku();
