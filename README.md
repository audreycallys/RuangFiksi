# 📚 Ruang Fiksi

Ruang Fiksi adalah website e-commerce toko buku berbasis web yang memungkinkan pengguna mencari, melihat detail, menyimpan wishlist, dan membeli buku secara online.

## ✨ Features

### User
- Login & Register
- Logout
- Profile
- Wishlist
- Shopping Cart
- Checkout

### Books
- Browse Books
- Search Books
- Filter by Category
- Filter by Price
- Top Rated Books
- Most Sold Books
- Book Detail
- Related Books

## 🛠️ Built With

- HTML5
- Tailwind CSS
- JavaScript (Vanilla JS)
- JSON
- LocalStorage
- SessionStorage
- Iconify Icons

## 📂 Project Structure

```text
RuangFiksi/
│
├── dist/
│   ├── auth/
│   ├── style/
│   │   └── output.css
│   ├── index.html
│   ├── catalog.html
│   ├── detail.html
│   ├── cart.html
│   └── profile.html
│
├── public/
│   ├── assets/
│   ├── components/
│   ├── data/
│   │   ├── books.json
│   │   └── users.json
│   ├── script/
│   └── style/
│       └── input.css
│
├── package.json
├── package-lock.json
└── README.md
```

## 🚀 Run Project

```bash
npm install
npm run dev
```

## 💾 Storage

**SessionStorage**

Menyimpan session pengguna yang sedang login.

```js
sessionStorage.setItem("name", user.nama);
```

**LocalStorage**

Menyimpan data cart dan wishlist berdasarkan username.

```text
wishlist_username
keranjang_username
```

## 🎨 Design Concept

Warm bookstore inspired interface:

- Soft cream background
- Brown accent color
- Clean card layout
- Minimalist UI
- Comfortable reading experience
- Responsive design

## 👩‍💻 Developer

**Audrey Callysta Nevaely**  
SMK Taruna Bhakti Depok