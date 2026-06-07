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

  container.innerHTML = `
  
    <h1 class="text-4xl font-bold">
      Wishlist
    </h1>

    <p class="mt-8">
      0 Barang
    </p>

    <div
      id="wishlistContainer"
      class="grid grid-cols-3 gap-8 mt-10"
    >
    </div>
  `;
}

ambilUser();
