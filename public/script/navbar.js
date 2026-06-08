const authSection = document.getElementById("auth-section");
const user = sessionStorage.getItem("name");

if (user) {
  authSection.innerHTML = `
    <div class="relative">
      <button id="profile-btn" class="flex items-center gap-2 cursor-pointer">
        <iconify-icon icon="iconamoon:profile-fill" class="text-[#6B5B4D] text-2xl"></iconify-icon>
        <span class="font-medium text-[#3D342B]">${user}</span>
        <iconify-icon icon="mdi:chevron-down" class="text-[#6B5B4D] text-xl"></iconify-icon>
      </button>
      <div id="profile-dropdown" class="hidden absolute right-0 mt-3 w-44 bg-white shadow-lg rounded-xl border border-[#D9D1C7] overflow-hidden">
        <a href="/dist/profile.html?page=akun" class="block px-4 py-3 text-sm text-[#3D342B] hover:bg-[#F7F2EA] transition">Profile</a>
        <a href="/dist/profile.html?page=wishlist" class="block px-4 py-3 text-sm text-[#3D342B] hover:bg-[#F7F2EA] transition">Wishlist</a>
        <button id="logout-btn" class="w-full text-left px-4 py-3 text-sm text-[#3D342B] hover:bg-[#F7F2EA] transition">Logout</button>
      </div>
    </div>`;

  const profileBtn = document.getElementById("profile-btn");
  const dropdown = document.getElementById("profile-dropdown");

  profileBtn.addEventListener("click", () => dropdown.classList.toggle("hidden"));

  document.addEventListener("click", (e) => {
    if (!profileBtn.contains(e.target) && !dropdown.contains(e.target)) dropdown.classList.add("hidden");
  });

  document.getElementById("logout-btn").addEventListener("click", () => {
    sessionStorage.clear();
    window.location.href = "/dist/index.html";
  });
} else {
  authSection.innerHTML = `
    <a href="/dist/auth/login.html" class="bg-[#6B5B4D] hover:bg-[#5A4B3E] px-5 py-2 rounded-lg text-white transition">Sign In</a>`;
}

function pindahKeCart() {
  if (user) {
    window.location.href = "/dist/cart.html";
  } else {
    alert("Silakan login terlebih dahulu untuk melihat keranjang Anda.");
    window.location.href = "/dist/auth/login.html";
  }
}

const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");

if (searchBtn) {
  searchBtn.addEventListener("click", () => {
    const keyword = searchInput.value.trim();
    if (keyword) window.location.href = `/dist/catalog.html?search=${encodeURIComponent(keyword)}`;
  });
}

if (searchInput) {
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") searchBtn.click();
  });
}