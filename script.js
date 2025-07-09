// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDVQGzLaKOynQKfqGc_iQaMwwbECQKcZ_8",
  authDomain: "supermall-d9b6d.firebaseapp.com",
  projectId: "supermall-d9b6d",
  storageBucket: "supermall-d9b6d.appspot.com",
  messagingSenderId: "888184909849",
  appId: "1:888184909849:web:7656fe0e22a181ae2c3b14"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

const ADMIN_EMAIL = "leoabhuimen1@gmail.com";

const preloader = document.getElementById('preloader');
const app = document.getElementById('app');
const logoutBtn = document.getElementById('logoutBtn');
const darkToggle = document.getElementById('darkToggle');
const loginLink = document.getElementById('loginLink');
const productsSection = document.getElementById('products');

// Show loader then content
window.addEventListener("load", () => {
  setTimeout(() => {
    preloader.classList.add("hidden");
    app.classList.remove("hidden");
  }, 1200);
});

// Dark mode toggle
darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Logout button
logoutBtn.addEventListener("click", () => {
  auth.signOut().then(() => {
    alert("Logged out!");
    location.reload();
  });
});

// Monitor user auth state
auth.onAuthStateChanged(user => {
  if (user) {
    if (user.email === ADMIN_EMAIL) {
      showAdminPanel();
    }
    loginLink.style.display = "none";
    logoutBtn.style.display = "inline-block";
  } else {
    loginLink.style.display = "inline-block";
    logoutBtn.style.display = "none";
  }
});

// Display products
function displayProducts() {
  db.collection("products").get().then(snapshot => {
    productsSection.innerHTML = "";
    snapshot.forEach(doc => {
      const product = doc.data();
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <strong>₦${product.price}</strong><br>
        <button onclick="addToCart('${doc.id}')">Add to Cart</button>
      `;
      productsSection.appendChild(card);
    });
  });
}

displayProducts();

// Add to cart (basic implementation)
function addToCart(productId) {
  alert(`Added product ${productId} to cart! (Feature coming soon)`);
}

// Admin panel
function showAdminPanel() {
  const adminPanel = document.createElement("div");
  adminPanel.id = "admin-panel";
  adminPanel.innerHTML = `
    <h2>Admin Panel - Add Product</h2>
    <input type="text" id="prodName" placeholder="Product Name">
    <input type="text" id="prodDesc" placeholder="Description"><br>
    <input type="text" id="prodImage" placeholder="Image URL">
    <input type="number" id="prodPrice" placeholder="Price"><br>
    <button onclick="addProduct()">Add Product</button>
  `;
  app.insertBefore(adminPanel, productsSection);
}

function addProduct() {
  const name = document.getElementById("prodName").value;
  const description = document.getElementById("prodDesc").value;
  const image = document.getElementById("prodImage").value;
  const price = parseFloat(document.getElementById("prodPrice").value);

  if (!name || !description || !image || !price) {
    alert("Fill all fields.");
    return;
  }

  db.collection("products").add({
    name, description, image, price
  }).then(() => {
    alert("Product added!");
    displayProducts();
  }).catch(err => {
    console.error(err);
    alert("Error adding product.");
  });
}
