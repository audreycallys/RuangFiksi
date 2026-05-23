const authSection = document.getElementById("auth-section");
const user = sessionStorage.getItem("name");

if (user) {
  authSection.innerHTML = `
    <div class="relative">
      <button
        id="profile-btn"
        class="flex items-center gap-2 cursor-pointer"
      >
        <iconify-icon 
          icon="mdi:account-circle-outline" 
          class="text-gray-500 text-3xl">
        </iconify-icon>

        <span class="font-medium text-gray-700">
          ${user}
        </span>

        <iconify-icon 
          icon="mdi:chevron-down" 
          class="text-gray-500 text-xl">
        </iconify-icon>
      </button>

      <div
        id="profile-dropdown"
        class="hidden absolute right-0 mt-3 w-40 bg-white shadow-lg rounded-md border border-gray-200 overflow-hidden"
      >
        <a
          href="/dist/profile.html"
          class="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
        >
          Profile
        </a>

        <button
          id="logout-btn"
          class="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
        >
          Logout
        </button>
      </div>
    </div>
  `;

  const profileBtn = document.getElementById("profile-btn");
  const dropdown = document.getElementById("profile-dropdown");
  const logoutBtn = document.getElementById("logout-btn");

  profileBtn.addEventListener("click", () => {
    dropdown.classList.toggle("hidden");
  });

  logoutBtn.addEventListener("click", () => {
    sessionStorage.clear();
    window.location.href = "/dist/index.html";
  });
} else {
  authSection.innerHTML = `
    <a 
      href="/dist/auth/login.html" 
      class="bg-[#81A6C6] px-5 py-1.5 rounded-sm text-white"
    >
      Sign In
    </a>
  `;
}