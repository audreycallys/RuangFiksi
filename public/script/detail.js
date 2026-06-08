const pengguna = sessionStorage.getItem("name");

let books = {};
let semuaBuku = [];

const params = new URLSearchParams(window.location.search);
const booksId = params.get("id");

async function ambilBuku() {
  let response = await fetch("/public/data/books.json");
  let data = await response.json();

  semuaBuku = data;
  books = data.find((book) => book.id == booksId);

  tampilkanBuku();
  tampilkanBukuTerkait(data);
}

function tampilkanBuku() {
  let container = document.getElementById("detailBuku");

  container.innerHTML = `
    <div class="w-full">
      <div class="flex flex-col lg:flex-row gap-8 lg:gap-15 items-start w-full">
        <div class="flex items-center justify-center w-full lg:w-auto">
          <div class="w-full lg:w-[600px] h-[360px] sm:h-[420px] lg:h-[480px] flex items-center justify-center overflow-hidden rounded-xl bg-white shadow-[0px_0px_30px_0px_rgba(0,0,0,0.08)] p-8 sm:p-12 lg:p-16">
            <img
              src="${books.image}"
              alt="${books.judul}"
              class="max-w-full max-h-full object-contain"
            />
          </div>
        </div>

        <div class="flex flex-col justify-between min-h-auto lg:h-[480px] flex-1 w-full">
          <div>
            <p class="border border-[#D9D1C7] text-[#6B5B4D] bg-white rounded-full w-fit px-3 text-sm">
              ${books.kategori}
            </p>

            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold mt-5 text-[#3D342B]">
              ${books.judul}
            </h1>

            <p class="text-xl sm:text-2xl mt-3 text-[#6B5B4D]">
              ${books.penulis}
            </p>

            <p class="text-2xl sm:text-3xl font-semibold mt-6 lg:mt-7 text-[#6B5B4D]">
              Rp${books.harga.toLocaleString("id-ID")}
            </p>

            <p class="text-[#8C7A69] mt-3 max-w-[600px] leading-7 text-sm sm:text-base">
              ${books.deskripsi}
            </p>

            <div class="flex items-center gap-6 sm:gap-8 mt-8 lg:mt-10">
              <div class="flex items-center gap-1 text-[#8C7A69]">
                <iconify-icon
                  icon="material-symbols:star"
                  class="text-2xl sm:text-3xl text-amber-300"
                ></iconify-icon>

                <p>(${books.rating.rate})</p>
              </div>

              <p class="text-[#8C7A69]">
                ${books.rating.count} Sold
              </p>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-4 sm:gap-5 mt-8 lg:mt-0">
            <button
              onclick="tambahKeranjang(${books.id})"
              class="bg-[#E8E0D7] hover:bg-[#D9D1C7] text-[#3D342B] rounded-xl flex-1 py-2.5 text-base sm:text-xl transition"
            >
              Add To Cart
            </button>

            <button
              onclick="buyNow(${books.id})"
              class="bg-[#6B5B4D] hover:bg-[#5A4B3E] text-white rounded-xl flex-1 py-2.5 text-base sm:text-xl transition"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 lg:gap-8 mt-16 lg:mt-25 mb-16 lg:mb-25">
        <div class="bg-white shadow-[0px_0px_30px_0px_rgba(0,0,0,0.08)] rounded-lg p-4 sm:p-5 text-center border border-[#E8E0D7]">
          <iconify-icon icon="mdi:book-open-page-variant" class="text-3xl text-[#6B5B4D]"></iconify-icon>
          <p class="text-sm text-[#8C7A69] mt-2">Halaman</p>
          <p class="font-semibold text-[#3D342B]">${books.detailBuku.halaman}</p>
        </div>

        <div class="bg-white shadow-[0px_0px_30px_0px_rgba(0,0,0,0.08)] rounded-lg p-4 sm:p-5 text-center border border-[#E8E0D7]">
          <iconify-icon icon="mdi:translate" class="text-3xl text-[#6B5B4D]"></iconify-icon>
          <p class="text-sm text-[#8C7A69] mt-2">Bahasa</p>
          <p class="font-semibold text-[#3D342B]">${books.detailBuku.bahasa}</p>
        </div>

        <div class="bg-white shadow-[0px_0px_30px_0px_rgba(0,0,0,0.08)] rounded-lg p-4 sm:p-5 text-center border border-[#E8E0D7]">
          <iconify-icon icon="mdi:weight" class="text-3xl text-[#6B5B4D]"></iconify-icon>
          <p class="text-sm text-[#8C7A69] mt-2">Berat</p>
          <p class="font-semibold text-[#3D342B]">${books.detailBuku.berat}</p>
        </div>

        <div class="bg-white shadow-[0px_0px_30px_0px_rgba(0,0,0,0.08)] rounded-lg p-4 sm:p-5 text-center border border-[#E8E0D7]">
          <iconify-icon icon="mdi:barcode" class="text-3xl text-[#6B5B4D]"></iconify-icon>
          <p class="text-sm text-[#8C7A69] mt-2">ISBN</p>
          <p class="font-semibold text-xs break-all text-[#3D342B]">${books.detailBuku.isbn}</p>
        </div>

        <div class="bg-white shadow-[0px_0px_30px_0px_rgba(0,0,0,0.08)] rounded-lg p-4 sm:p-5 text-center border border-[#E8E0D7]">
          <iconify-icon icon="mdi:calendar-month" class="text-3xl text-[#6B5B4D]"></iconify-icon>
          <p class="text-sm text-[#8C7A69] mt-2">Terbit</p>
          <p class="font-semibold text-xs text-[#3D342B]">${books.detailBuku.tanggalTerbit}</p>
        </div>

        <div class="bg-white shadow-[0px_0px_30px_0px_rgba(0,0,0,0.08)] rounded-lg p-4 sm:p-5 text-center border border-[#E8E0D7]">
          <iconify-icon icon="mdi:office-building" class="text-3xl text-[#6B5B4D]"></iconify-icon>
          <p class="text-sm text-[#8C7A69] mt-2">Penerbit</p>
          <p class="font-semibold text-xs text-[#3D342B]">${books.detailBuku.penerbit}</p>
        </div>
      </div>
    </div>
  `;
}

function cardBook(book) {
  let wishlist =
    JSON.parse(localStorage.getItem(`wishlist_${pengguna}`)) || [];

  let sudahWishlist = wishlist.some((item) => item.id === book.id);

  return `
    <div class="bg-white w-full h-[250px] sm:h-70 rounded-2xl overflow-hidden border border-gray-300 hover:shadow-[0px_0px_30px_0px_rgba(0,0,0,0.1)] transition-shadow duration-200">
      <div class="relative h-full">
        <div class="bg-gray-100 w-fit p-1.5 rounded-full flex gap-2 items-center absolute right-2 sm:right-3 top-2 sm:top-3 z-10">
          <button onclick="toggleWishlist(${book.id})" class="flex items-center">
            <iconify-icon icon="mdi:heart" width="22" height="22" class="cursor-pointer ${sudahWishlist ? "text-pink-700" : "text-gray-500"} hover:text-pink-700 transition"></iconify-icon>
          </button>
          <button onclick="tambahKeranjang(${book.id})" class="flex items-center">
            <iconify-icon icon="mdi:cart" width="22" height="22" class="cursor-pointer text-gray-500 hover:text-sky-950 transition"></iconify-icon>
          </button>
        </div>

        <a href="detail.html?id=${book.id}" class="h-full flex flex-col">
          <div class="h-34 sm:h-40 p-3 sm:p-4 flex items-center justify-center">
            <img src="${book.image}" alt="${book.judul}" class="w-32 sm:w-48 h-32 sm:h-40 object-contain" />
          </div>
          <div class="px-3 py-2 flex-1 flex flex-col justify-between">
            <div>
              <p class="font-medium text-sm sm:text-base leading-5 line-clamp-2">${book.judul}</p>
              <p class="text-xs sm:text-sm text-sky-700 mt-1 line-clamp-1">${book.penulis}</p>
            </div>
            <p class="font-semibold text-base sm:text-lg">Rp${book.harga.toLocaleString("id-ID")}</p>
          </div>
        </a>
      </div>
    </div>
  `;
}

function tampilkanBukuTerkait(data) {
  let container = document.getElementById("bukuTerkait");

  let bukuTerkait = data
    .filter((book) => book.kategori === books.kategori && book.id != books.id)
    .slice(0, 6);

  let html = "";

  bukuTerkait.forEach((book) => {
    html += cardBook(book);
  });

  container.innerHTML = html;
}

function tambahKeranjang(id) {
  if (!pengguna) {
    alert("Silakan login terlebih dahulu.");
    window.location.href = "/dist/auth/login.html";
    return;
  }

  let book = semuaBuku.find((item) => item.id === id);

  let cart =
    JSON.parse(localStorage.getItem(`keranjang_${pengguna}`)) || [];

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

  localStorage.setItem(
    `keranjang_${pengguna}`,
    JSON.stringify(cart)
  );

  alert("Buku berhasil masuk ke keranjang!");
}

function buyNow(id) {
  if (!pengguna) {
    alert("Silakan login terlebih dahulu.");
    window.location.href = "/dist/auth/login.html";
    return;
  }

  let book = semuaBuku.find((item) => item.id === id);

  alert(`Buku "${book.judul}" berhasil dibeli!`);
}

function toggleWishlist(id) {
  if (!pengguna) {
    alert("Silakan login terlebih dahulu.");
    window.location.href = "/dist/auth/login.html";
    return;
  }

  let book = semuaBuku.find((item) => item.id === id);

  let wishlist =
    JSON.parse(localStorage.getItem(`wishlist_${pengguna}`)) || [];

  let cek = wishlist.find((item) => item.id === id);

  if (cek) {
    wishlist = wishlist.filter((item) => item.id !== id);
    // alert("Buku dihapus dari wishlist!");
  } else {
    wishlist.push({
      id: book.id,
      judul: book.judul,
      penulis: book.penulis,
      harga: book.harga,
      image: book.image,
    });

    // alert("Buku berhasil masuk ke wishlist!");
  }

  localStorage.setItem(
    `wishlist_${pengguna}`,
    JSON.stringify(wishlist)
  );

  tampilkanBuku();
  tampilkanBukuTerkait(semuaBuku);
}

ambilBuku();