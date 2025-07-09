const firebaseConfig = {
  apiKey: "AIzaSyD6yXrVhkfsC4bwdGj_uqwDbTyb7__JCtg",
  authDomain: "supermall-d5f99.firebaseapp.com",
  projectId: "supermall-d5f99",
  storageBucket: "supermall-d5f99.appspot.com",
  messagingSenderId: "813248774705",
  appId: "1:813248774705:web:6978e2c6a4aee3fa180b10"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

const ADMIN_EMAIL = "leoabhuimen1@gmail.com";

window.onload = () => {
  document.getElementById("preloader").style.display = "none";
  document.getElementById("themeToggle").onclick = () => {
    document.body.classList.toggle("dark");
  };
  auth.onAuthStateChanged(user => {
    if (user) {
      loadProducts();
      if (user.email === ADMIN_EMAIL) {
        alert("Welcome Admin!");
      }
    } else {
      loginPrompt();
    }
  });
};

function loginPrompt() {
  const email = prompt("Enter your email:");
  const password = prompt("Enter your password:");
  auth.signInWithEmailAndPassword(email, password).catch(err => alert(err.message));
}

function logout() {
  auth.signOut().then(() => location.reload());
}

function loadProducts() {
  const products = [
    { id: 1, name: "Facebook Account", price: 1000 },
    { id: 2, name: "Instagram Account", price: 1500 }
  ];
  const container = document.getElementById("products");
  container.innerHTML = products.map(p => `
    <div class="product">
      <h3>${p.name}</h3>
      <p>₦${p.price}</p>
      <button onclick='buy(${JSON.stringify(p)})'>Buy Now</button>
    </div>
  `).join("");
}

function buy(product) {
  FlutterwaveCheckout({
    public_key: "FLWPUBK_TEST-xxxxxxxxxxxxxxxxxxxxx-X",
    tx_ref: Date.now(),
    amount: product.price,
    currency: "NGN",
    payment_options: "card,ussd",
    customer: {
      email: firebase.auth().currentUser.email
    },
    callback: function (data) {
      alert("Payment complete!");
    },
    onclose: function () {
      alert("Payment closed");
    }
  });
}

function viewCart() {
  alert("Cart coming soon!");
}
