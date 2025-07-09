
let cart = JSON.parse(localStorage.getItem("cart")) || [];
function addToCart(product, price) {
  cart.push({ product, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(product + " added to cart!");
}

function showCart() {
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");
  let total = 0;
  cartItems.innerHTML = "";
  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item.product + " - $" + item.price.toFixed(2);
    cartItems.appendChild(li);
    total += item.price;
  });
  cartTotal.textContent = total.toFixed(2);
}

if (window.location.pathname.includes("cart.html")) {
  showCart();
}

document.getElementById("themeToggle")?.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
});

function showPage() {
  document.getElementById("preloader").style.display = "none";
  document.getElementById("mainContent").style.display = "block";
}
