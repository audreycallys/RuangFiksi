# 📚 Ruang Fiksi

Ruang Fiksi adalah website e-commerce toko buku berbasis web yang memungkinkan pengguna mencari, melihat detail, menyimpan wishlist, dan membeli buku secara online.

## ✨ Features

### User
- Login
- Logout
- View Profile
- Wishlist Management
- Shopping Cart
- Checkout

### Books
- Browse Books
- Search Books
- Filter by Category
- Filter by Price
- Top Rated Books
- Most Sold Books
- Book Detail Page
- Related Books

### Home Page
- Hero Section
- Categories
- Top Rated
- Most Sold
- Testimonials

---

## 🛠️ Built With

- HTML5
- Tailwind CSS
- JavaScript (Vanilla JS)
- JSON
- LocalStorage
- SessionStorage
- Iconify Icons

---

## 📂 Project Structure

```bash
dist/
│
├── index.html
├── catalog.html
├── detail.html
├── cart.html
├── profile.html
│
└── auth/
    ├── login.html
    └── register.html

public/
│
├── assets/
├── components/
├── data/
│   ├── books.json
│   └── users.json
│
├── script/
│   ├── product.js
│   ├── catalog.js
│   ├── detail.js
│   ├── cart.js
│   ├── profile.js
│   ├── navbar.js
│   └── auth.js
│
└── style/
    └── output.css
```

---

## 🚀 Main Functionalities

### Authentication
- User login validation
- Session management using SessionStorage

### Book Management
- Display books from JSON
- Search books by title and author
- Filter books by category
- Sort by rating and sales

### Shopping Cart
- Add book to cart
- Update quantity
- Remove item
- Calculate subtotal and total
- Checkout selected items

### Wishlist
- Add book to wishlist
- Remove book from wishlist
- Store wishlist per user

---

## 💾 Storage

### SessionStorage
Used for:

```js
sessionStorage.setItem("name", user.nama);
```

Stores active login session.

### LocalStorage

Used for:

```js
wishlist_username
keranjang_username
```

Stores cart and wishlist data.

---

## 🎨 Design Concept

Warm bookstore inspired interface:

- Soft cream background
- Brown accent color
- Clean card layout
- Minimalist UI
- Comfortable reading experience

---

## 👩‍💻 Developer

Audrey Callysta Nevaely

SMK Software Engineering Project
