// Функция для получения корзины из cookie в виде объекта
function getCart() {
  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("cart="));
  if (!cookie) return {};
  try {
    return JSON.parse(decodeURIComponent(cookie.split("=")[1])) || {};
  } catch {
    return {};
  }
}

// Функция для сохранения корзины в cookie
function setCart(cart) {
  document.cookie = `cart=${encodeURIComponent(
    JSON.stringify(cart)
  )}; path=/; max-age=86400`;
}

// Функция форматирования цены (например, 2000 -> "2000 р.")
function formatPrice(price) {
  return price;
}

document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.querySelector(".table tbody");

  function updateCartUI() {
    const updatedCart = getCart();
    tbody.innerHTML = "";
    let totalPrice = 0;

    for (const key in updatedCart) {
      const it = updatedCart[key];
      const numericPrice = Number(it.price.replace(/\D/g, ""));
      const c = numericPrice * Number(it.quantity);

      totalPrice += c;
      console.log(it);

      const row = document.createElement("tr");
      row.innerHTML = `
        <td>
          <div class="naming">
            <img src="${it.imgSrc}" class="picture" />
            <div class="info">
              <div class="title">${it.title}</div>
              <div class="desc">${it.desc || ""}</div>
            </div>
          </div>
        </td>
        <td><div class="price">${formatPrice(it.price)}</div></td>
        <td>
          <div class="count">
            <button class="btn minus">-</button>
            <div class="btn number">${it.quantity}</div>
            <button class="btn plus">+</button>
          </div>
        </td>
        <td>
          <div class="wrapper_cost">
            <div class="cost">${formatPrice(c)}р.</div>
            <img src="./svgs/cart/trash.svg" class="trash" />
          </div>
        </td>
      `;

      const minus = row.querySelector(".minus");
      const plus = row.querySelector(".plus");
      const trash = row.querySelector(".trash");

      minus.addEventListener("click", () => {
        if (updatedCart[key].quantity > 1) {
          updatedCart[key].quantity--;
        } else {
          delete updatedCart[key];
        }
        setCart(updatedCart);
        updateCartUI();
      });

      plus.addEventListener("click", () => {
        updatedCart[key].quantity++;
        setCart(updatedCart);
        updateCartUI();
      });

      trash.addEventListener("click", () => {
        delete updatedCart[key];
        setCart(updatedCart);
        updateCartUI();
      });

      tbody.appendChild(row);
    }

    const totalPriceDiv = document.querySelector(".order .result .price");
    totalPriceDiv.textContent = formatPrice(totalPrice);

    if (Object.keys(updatedCart).length === 0) {
      tbody.innerHTML = `<tr><td colspan="4" class="empty" style="text-align:center;">Корзина пуста</td></tr>`;
      totalPriceDiv.textContent = formatPrice(0);
    }
  }

  updateCartUI();
});
