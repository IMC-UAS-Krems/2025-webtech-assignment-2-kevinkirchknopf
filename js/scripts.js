
const phoneInput = document.querySelector("#phone");
const form = document.querySelector("#form");


form.addEventListener("submit", (e) => {
  e.preventDefault();

  const phone = phoneInput.value.trim();
  const phoneRegex = /^[0-9]{7,15}$/;

  phoneInput.classList.remove("is-invalid");

  if (!phoneRegex.test(phone)) {
    phoneInput.classList.add("is-invalid");
    return;
  }

  document.getElementById("successAlert").classList.remove("d-none");

   setTimeout(() => {
    successAlert.classList.add("d-none");
    form.reset();
    Object.keys(cart).forEach((x) => delete cart[x]);
    renderCart();
  }, 3000);

 
});
const cartItemsEl = document.getElementById("cartItems");
const cartTotalEl = document.getElementById("cartTotal");
const taxEl = document.getElementById("tax");
const discountEl = document.getElementById("discount");
const checkoutEl = document.getElementById("checkout");

const cart = {};
const taxRate = 0.2;
const discountRate = 0.3;
checkoutEl.style.display = "none";


document.querySelectorAll(".donate-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const name = btn.dataset.name;
    const price = Number(btn.dataset.price);
    if (!cart[name]) cart[name] = { qty: 1, price };
    else cart[name].qty++;
    renderCart();
  });
});

cartItemsEl.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-btn")) {
    delete cart[e.target.dataset.name];
    renderCart();
  }
});
function renderCart() {
  cartItemsEl.innerHTML = "";

  let subtotal = 0;
  let itemCount = 0;

  for (const name in cart) {
    const item = cart[name];
    subtotal += item.qty * item.price;
    itemCount += item.qty;

    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `
      <span>
        <button class="btn btn-sm btn-outline-danger remove-btn" data-name="${name}">×</button>
        ${name}
      </span>
      <span>${item.qty}</span>
    `;
    cartItemsEl.appendChild(li);
  }
  if (Object.keys(cart).length === 0) {
    checkoutEl.style.display = "none";
    cartItemsEl.innerHTML = `<li class="list-group-item text-muted">Cart is empty</li>`;
    cartTotalEl.textContent = "$0.00";
    taxEl.textContent = "$0.00";
    discountEl.textContent = "$0.00";
    return;
  }
  checkoutEl.style.display = "block";
  const discount = itemCount >= 3 ? subtotal * discountRate : 0;
  const tax = (subtotal - discount) * taxRate;
  const total = subtotal - discount + tax;
  discountEl.textContent = `-$${discount.toFixed(2)}`;
  taxEl.textContent = `$${tax.toFixed(2)}`;
  cartTotalEl.textContent = `$${total.toFixed(2)}`;
}
