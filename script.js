// Firebase CDN Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.24.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/9.24.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc
} from "https://www.gstatic.com/firebasejs/9.24.0/firebase-firestore.js";

// ✅ Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyB_L3nmDeO6eyLzSYhMpRPzKqzXvqUBhNA",
  authDomain: "supermall-94068.firebaseapp.com",
  projectId: "supermall-94068",
  storageBucket: "supermall-94068.appspot.com",
  messagingSenderId: "164670474540",
  appId: "1:164670474540:web:73ef4263c3b3eb18459fbe",
  measurementId: "G-KF0WFLD2D3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// DOM Elements
const logoutBtn = document.getElementById("logoutBtn");
const darkToggle = document.getElementById("darkToggle");
const loginLink = document.getElementById("loginLink");
const productsSection = document.getElementById("products");
const appDiv = document.getElementById("app");
const preloader = document.getElementById("preloader");

// 🌙 Dark Mode Toggle
darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// 🔒 Auth Status
onAuthStateChanged(auth, user => {
  if (user) {
    loginLink.textContent = `Hello, ${user.email}`;
    logoutBtn.style.display = "inline-block";

    if (user.email === "leoabhuimen1@gmail.com") {
      const adminLink = document.createElement("a");
      adminLink.href = "admin.html";
      adminLink.textContent = "⚙️ Admin";
      document.querySelector("nav").appendChild(adminLink);
    }

    renderProducts();
  } else {
    logoutBtn.style.display = "none";
    renderProducts();
  }

  // Show content after auth check
  preloader.style.display = "none";
  appDiv.classList.remove("hidden");
});

// 🔓 Logout
logoutBtn.addEventListener("click", () => {
  signOut(auth).then(() => location.reload());
});

// 🛒 Render Products
async function renderProducts() {
  productsSection.innerHTML = "";
  const querySnapshot = await getDocs(collection(db, "products"));
  querySnapshot.forEach(doc => {
    const product = doc.data();
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>₦${product.price}</p>
      <button onclick="addToCart('${doc.id}', '${product.name}', ${product.price})">Add to Cart</button>
    `;
    productsSection.appendChild(card);
  });
}

// 🛒 Add to Cart (stored in localStorage)
window.addToCart = function (id, name, price) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ id, name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${name} added to cart 🛒`);
};
