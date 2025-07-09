// script.js

// Firebase config (already initialized in HTML) const firebaseConfig = { apiKey: "AIzaSyD6yXrVhkfsC4bwdGj_uqwDbTyb7__JCtg", authDomain: "supermall-d5f99.firebaseapp.com", projectId: "supermall-d5f99", storageBucket: "supermall-d5f99.appspot.com", messagingSenderId: "813248774705", appId: "1:813248774705:web:6978e2c6a4aee3fa180b10", measurementId: "G-D5PRDT1E9L" };

// Initialize Firebase firebase.initializeApp(firebaseConfig); const auth = firebase.auth(); const db = firebase.firestore();

// UI Logic window.addEventListener("load", () => { document.getElementById("preloader").style.display = "none"; document.getElementById("app").classList.remove("hidden"); });

// Dark Mode Toggle const darkToggle = document.getElementById("darkToggle"); darkToggle.addEventListener("click", () => { document.body.classList.toggle("dark-mode"); });

// Logout Button const logoutBtn = document.getElementById("logoutBtn"); logoutBtn.addEventListener("click", () => { auth.signOut().then(() => { window.location.href = "login.html"; }); });

// Product Rendering const productsSection = document.getElementById("products");

const renderProducts = async () => { try { const snapshot = await db.collection("products").get(); productsSection.innerHTML = ""; snapshot.forEach((doc) => { const product = doc.data(); productsSection.innerHTML += <div class="product"> <img src="${product.image}" alt="${product.name}" /> <h3>${product.name}</h3> <p>${product.description}</p> <p><strong>$${product.price}</strong></p> <button onclick="addToCart('${doc.id}')">Add to Cart</button> </div>; }); } catch (error) { productsSection.innerHTML = "<p>Failed to load products.</p>"; } };

renderProducts();

// Add to Cart Function const addToCart = async (productId) => { const user = auth.currentUser; if (!user) { alert("Please log in to add items to cart."); return; }

try { const productRef = db.collection("products").doc(productId); const productSnap = await productRef.get(); const cartRef = db.collection("carts").doc(user.uid);

await cartRef.set({
  items: firebase.firestore.FieldValue.arrayUnion({
    id: productId,
    ...productSnap.data(),
  })
}, { merge: true });

alert("Product added to cart.");

} catch (err) { console.error("Cart error:", err); alert("Failed to add to cart."); } };

