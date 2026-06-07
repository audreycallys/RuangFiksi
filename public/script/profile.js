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
  
    <h1 class="text-4xl font-bold mb-12">
      Akun
    </h1>

    <div class="flex gap-24">

      <img
        src="${user.image}"
        class="w-44 h-44 rounded-full object-cover bg-gray-300"
      />

      <div>

        <h2 class="text-3xl font-bold mb-10">
          Pengaturan Profil
        </h2>

        <div class="space-y-7">

          <div>
            <p class="text-sm text-gray-500">
              Nama Lengkap
            </p>

            <p class="font-bold">
              ${user.nama}
            </p>
          </div>

          <div>
            <p class="text-sm text-gray-500">
              Email
            </p>

            <p class="font-bold">
              ${user.email}
            </p>
          </div>

          <div>
            <p class="text-sm text-gray-500">
              Kata Sandi
            </p>

            <p class="font-bold">
              ************
            </p>
          </div>

          <div>
            <p class="text-sm text-gray-500">
              Jenis Kelamin
            </p>

            <p class="font-bold">
              ${user.jenisKelamin}
            </p>
          </div>

          <div>
            <p class="text-sm text-gray-500">
              Tanggal Lahir
            </p>

            <p class="font-bold">
              ${user.tanggalLahir}
            </p>
          </div>

          <div>
            <p class="text-sm text-gray-500">
              No. Telepon
            </p>

            <p class="font-bold">
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
      <div class="bg-white w-full h-70 rounded-2xl overflow-hidden border border-gray-300 hover:shadow-[0px_0px_30px_0px_rgba(0,0,0,0.1)] transition-shadow duration-200">
        <div class="relative h-full">

          <button
            onclick="hapusWishlist(${book.id})"
            class="bg-gray-100 w-fit p-1.5 rounded-full flex items-center absolute right-3 top-3 z-10"
          >
            <iconify-icon
              icon="mdi:heart"
              width="24"
              height="24"
              class="cursor-pointer text-pink-700"
            ></iconify-icon>
          </button>

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

  container.innerHTML = `
    <h1 class="text-4xl font-bold">
      Wishlist
    </h1>

    <p class="mt-8">
      ${wishlist.length} Barang
    </p>

    <div
      id="wishlistContainer"
      class="grid grid-cols-5 gap-8 mt-10"
    >
      ${
        wishlist.length === 0
          ? `<p class="text-gray-500 col-span-3">Belum ada buku di wishlist.</p>`
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
