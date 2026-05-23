// fetch menggunakan async function

let user = [];
async function login() {
  try {
    let respose = await fetch("/public/data/users.json");
    user = await respose.json();
  } catch (error) {
    console.log("error", error);
  }
}

login();

async function temukan() {
  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();

  let ditemukan = user.find((u) => u.email === email && u.password === password);

  if (ditemukan) {
    sessionStorage.setItem("name", ditemukan.nama);
    window.location.href = "/dist/index.html";
  } else {
//    document.getElementById("pesan").innerText = "Email atau password salah!";
alert("Email atau password salah!");
  }
}
