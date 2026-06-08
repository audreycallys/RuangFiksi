const sessionUser = sessionStorage.getItem("name");
const params = new URLSearchParams(window.location.search);
const page = params.get("page") || "akun";

async function ambilUser() {
  try {
    let response = await fetch("/public/data/users.json");
    let users = await response.json();
    let user = users.find((item) => item.nama === sessionUser);

    if (!user) {
      alert("Silakan login terlebih dahulu");
      window.location.href = "/dist/auth/login.html";
      return;
    }

    document.getElementById("sidebarNama").innerText = user.nama;
    document.getElementById("sidebarEmail").innerText = user.email;
    document.getElementById("sidebarImage").src = user.image;

    if (page === "wishlist") {
      tampilkanWishlist(user);
    } else {
      tampilkanAkun(user);
    }
  } catch (error) {
    console.error(error);
  }
}

function tampilkanAkun(user) {
  const container = document.getElementById("profileContent");

  container.innerHTML = `
    <h1 class="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-[#3D342B]">
      Akun
    </h1>

    <div class="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-14 lg:gap-24 mb-5">
      <img
        src="${user.image}"
        class="w-36 h-36 sm:w-44 sm:h-44 lg:w-60 lg:h-60 rounded-full object-cover bg-[#E8E0D7] shrink-0"
      />

      <div class="w-full text-center md:text-left">
        <h2 class="text-2xl md:text-3xl font-bold mb-8 md:mb-10 text-[#3D342B]">
          Pengaturan Profil
        </h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 md:gap-7">
          <div>
            <p class="text-sm text-[#8C7A69]">
              Nama
            </p>

            <p class="font-semibold text-[#3D342B] break-words">
              ${user.nama}
            </p>
          </div>

          <div>
            <p class="text-sm text-[#8C7A69]">
              Email
            </p>

            <p class="font-semibold text-[#3D342B] break-words">
              ${user.email}
            </p>
          </div>

          <div>
            <p class="text-sm text-[#8C7A69]">
              Kata Sandi
            </p>

            <p class="font-semibold text-[#3D342B]">
              ************
            </p>
          </div>

          <div>
            <p class="text-sm text-[#8C7A69]">
              Jenis Kelamin
            </p>

            <p class="font-semibold text-[#3D342B]">
              ${user.jenisKelamin}
            </p>
          </div>

          <div>
            <p class="text-sm text-[#8C7A69]">
              Tanggal Lahir
            </p>

            <p class="font-semibold text-[#3D342B]">
              ${user.tanggalLahir}
            </p>
          </div>

          <div>
            <p class="text-sm text-[#8C7A69]">
              No. Telepon
            </p>

            <p class="font-semibold text-[#3D342B]">
              +62 ${user.noTelepon}
            </p>
          </div>
        </div>
      </div>
    </div>
  `;
}

function tampilkanWishlist(user) {
  const container = document.getElementById("profileContent");

  let wishlist =
    JSON.parse(localStorage.getItem(`wishlist_${sessionUser}`)) || [];

  let html = "";

  wishlist.forEach((book) => {
    html += `
      <div class="bg-white w-full h-[250px] sm:h-70 rounded-2xl overflow-hidden border border-gray-300 hover:shadow-[0px_0px_30px_0px_rgba(0,0,0,0.1)] transition-shadow duration-200">
        <div class="relative h-full">

          <button
            onclick="hapusWishlist(${book.id})"
            class="bg-gray-100 w-fit p-1.5 rounded-full flex items-center absolute right-2 sm:right-3 top-2 sm:top-3 z-10"
          >
            <iconify-icon
              icon="mdi:heart"
              width="22"
              height="22"
              class="cursor-pointer text-pink-700"
            ></iconify-icon>
          </button>

          <a href="detail.html?id=${book.id}" class="h-full flex flex-col">
            <div class="h-34 sm:h-40 p-3 sm:p-4 flex items-center justify-center">
              <img
                src="${book.image}"
                alt="${book.judul}"
                class="w-32 h-32 sm:w-48 sm:h-40 object-contain"
              />
            </div>

            <div class="px-3 py-2 flex-1 flex flex-col justify-between">
              <div>
                <p class="font-medium text-sm sm:text-base leading-5 line-clamp-2">
                  ${book.judul}
                </p>

                <p class="text-xs sm:text-sm text-sky-700 mt-1 line-clamp-1">
                  ${book.penulis}
                </p>
              </div>

              <p class="font-semibold text-base sm:text-lg">
                Rp${book.harga.toLocaleString("id-ID")}
              </p>
            </div>
          </a>

        </div>
      </div>
    `;
  });

  container.innerHTML = `
    <h1 class="text-3xl md:text-4xl font-bold text-[#3D342B]">
      Wishlist
    </h1>

    <p class="mt-6 md:mt-8 text-[#6B5B4D]">
      ${wishlist.length} Barang
    </p>

    <div
      id="wishlistContainer"
      class="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 md:gap-8 mt-8 md:mt-10"
    >
      ${
        wishlist.length === 0
          ? `<p class="text-[#8C7A69] col-span-2 sm:col-span-3 xl:col-span-4 2xl:col-span-5">Belum ada buku di wishlist.</p>`
          : html
      }
    </div>
  `;
}

function hapusWishlist(id) {
  let wishlist =
    JSON.parse(localStorage.getItem(`wishlist_${sessionUser}`)) || [];

  wishlist = wishlist.filter((item) => item.id !== id);

  localStorage.setItem(`wishlist_${sessionUser}`, JSON.stringify(wishlist));

  tampilkanWishlist();
}

ambilUser();
