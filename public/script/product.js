const currentUser = sessionStorage.getItem("name");
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

function cardBook(book) {
  let wishlist =
    JSON.parse(localStorage.getItem(`wishlist_${currentUser}`)) || [];
  let sudahWishlist = wishlist.some((item) => item.id === book.id);

  return `
   <div class="bg-white w-full h-70 rounded-2xl overflow-hidden border border-gray-300 hover:shadow-[0px_0px_30px_0px_rgba(0,0,0,0.1)] transition-shadow duration-200">
  <div class="relative h-full">

    <div
      class="bg-gray-100 w-fit p-1.5 rounded-full flex gap-2 items-center absolute right-3 top-3 z-10"
    >
      <button onclick="toggleWishlist(${book.id})" class="flex items-center">
        <iconify-icon icon="mdi:heart" width="24" height="24" class="cursor-pointer ${sudahWishlist ? "text-pink-700" : "text-gray-500"} hover:text-pink-700 transition""></iconify-icon>
      </button>

      <button onclick="tambahKeranjang(${book.id})" class="flex items-center">
        <iconify-icon icon="mdi:cart" width="24" height="24" class="cursor-pointer text-gray-500 hover:text-sky-950 transition"></iconify-icon>
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
}

function tampilkanBuku(data) {
  let container = document.getElementById("productList");
  let html = "";

  data.forEach((book) => {
    html += cardBook(book);
  });

  container.innerHTML = html;
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
  if (!currentUser) {
    alert("Silakan login terlebih dahulu.");
    window.location.href = "/dist/auth/login.html";
    return;
  }

  let book = books.find((item) => item.id === id);
  let cart = JSON.parse(localStorage.getItem(`keranjang_${currentUser}`)) || [];
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

  localStorage.setItem(`keranjang_${currentUser}`, JSON.stringify(cart));

  alert("Buku berhasil masuk ke keranjang!");
}

function toggleWishlist(id) {
  if (!currentUser) {
    alert("Silakan login terlebih dahulu.");
    window.location.href = "/dist/auth/login.html";
    return;
  }

  let book = books.find((item) => item.id === id);

  let wishlist =
    JSON.parse(localStorage.getItem(`wishlist_${currentUser}`)) || [];

  let cek = wishlist.find((item) => item.id === id);

  if (cek) {
    wishlist = wishlist.filter((item) => item.id !== id);
    alert("Buku dihapus dari wishlist!");
  } else {
    wishlist.push({
      id: book.id,
      judul: book.judul,
      penulis: book.penulis,
      harga: book.harga,
      image: book.image,
    });

    alert("Buku berhasil masuk ke wishlist!");
  }

  localStorage.setItem(
    `wishlist_${currentUser}`,
    JSON.stringify(wishlist)
  );

  tampilkanBuku(books.slice(0, 12));
  tampilkanMostSold();
  tampilkanTopRated();
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
