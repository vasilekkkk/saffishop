// Массив с данными товаров
const products = [
  {
    imgSrc: "./imgs/shop/1.png",
    price: "2800 р.",
    title: "Кольцо-роза",
    desc: "Хрусталь, нежные лепестки и невероятное сияние.",
  },
  {
    imgSrc: "./imgs/shop/2.png",
    price: "3000 р.",
    title: "Коольцо-лотос",
    desc: "Удобный и вместительный.<br>Будет радовать вас каждый день.",
  },
  {
    imgSrc: "./imgs/shop/3.png",
    price: "2000 р.",
    title: "Платье",
    desc: "Мягкая, приятная к телу ткань.<br>В этом платье вы будете чувствовать себя ещё увереннее, чем обычно.",
  },
  {
    imgSrc: "./imgs/shop/4.png",
    price: "1500 р.",
    title: "Шоппер",
    desc: "Удобный и вместительный.<br>Будет радовать вас каждый день.",
  },
  {
    imgSrc: "./imgs/shop/5.png",
    price: "500 р.",
    title: "Носки",
    desc: "Милые и мягкие.<br>Подойдут детям и взрослым.",
  },
  {
    imgSrc: "./imgs/shop/6.png",
    price: "2500 р.",
    title: "Худи",
    desc: "Мягкая, приятная к телу ткань.<br>Подойдёт каждому, порадует своим<br>великолепным качеством.",
  },
  {
    imgSrc: "./imgs/shop/7.png",
    price: "3000 р.",
    title: "Гель для душа и шапмунь",
    desc: "Невероятный запах, который останется<br>на весь день после использования.",
  },
  {
    imgSrc: "./imgs/shop/8.png",
    price: "1500 р.",
    title: "Скейт (доска)",
    desc: "Классный дизайн, который хорошо<br>дополнит ваш скейт.",
  },
  {
    imgSrc: "./imgs/shop/9.png",
    price: "200 р.",
    title: "Стикер",
    desc: "Данный стикер разнообразит вашу<br>карту и добавит нежных оттенков<br>в вашу жизнь.",
  },
  {
    imgSrc: "./imgs/shop/10.png",
    price: "600 р.",
    title: "SD",
    desc: "Подойдёт для вашей камеры<br>и сохранит в себе приятные<br>моменты из вашей жизни.",
  },
  {
    imgSrc: "./imgs/shop/11.png",
    price: "100 р.",
    title: "Скотч",
    desc: "Украсит ваш скетч бук.",
  },
  {
    imgSrc: "./imgs/shop/12.png",
    price: "", // Цена отсутствует в исходнике
    title: "Значки",
    desc: "Можно прицепить на вашу<br>сумочку, шоппер или рюкзак.",
  },
];

// Вспомогательные функции для работы с cookie (JSON)
function getCart() {
  const cartCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("cart="));
  if (!cartCookie) return {};
  try {
    return JSON.parse(decodeURIComponent(cartCookie.split("=")[1]));
  } catch {
    return {};
  }
}

function setCart(cart) {
  // Устанавливаем cookie на 7 дней
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `cart=${encodeURIComponent(
    JSON.stringify(cart)
  )}; path=/; expires=${expires}`;
}

function updateCartAndButton(productTitle, btns, product) {
  let cart = getCart();

  // Если товара нет — добавляем с количеством 1
  if (!cart[productTitle]) {
    cart[productTitle] = {
      ...product,
      quantity: 1,
      price: parseInt(product.price) || 0,
    };
  } else {
    // Уже есть — увеличиваем количество
    cart[productTitle].quantity++;
  }

  setCart(cart);

  renderQuantityControls(btns, productTitle, cart);
}
function renderQuantityControls(btnCart, productTitle, cart) {
  btnCart.innerHTML = ""; // очищаем содержимое кнопки

  const btnMinus = document.createElement("span");
  btnMinus.className = "btn minus";
  btnMinus.textContent = "-";
  btnMinus.style.cursor = "pointer";
  btnMinus.style.marginRight = "5px";

  const qty = document.createElement("span");
  qty.className = "quantity";
  qty.textContent = cart[productTitle].quantity;
  qty.style.margin = "0 5px";

  const btnPlus = document.createElement("span");
  btnPlus.className = "btn plus";
  btnPlus.textContent = "+";
  btnPlus.style.cursor = "pointer";
  btnPlus.style.marginLeft = "5px";

  btnCart.appendChild(btnMinus);
  btnCart.appendChild(qty);
  btnCart.appendChild(btnPlus);
  btnMinus.addEventListener("click", () => {
    if (cart[productTitle].quantity > 1) {
      cart[productTitle].quantity--;
      setCart(cart);
      renderQuantityControls(btnCart, productTitle, cart);
    } else {
      // Удаляем товар из корзины
      delete cart[productTitle];
      setCart(cart);

      // Восстанавливаем кнопку "Корзина"
      btnCart.innerHTML = "Корзина";
      btnCart.style.cursor = "pointer";
      btnCart.className = "btn cart";

      btnCart.onclick = () => {
        updateCartAndButton(btnCart, productTitle);
      };
    }
  });

  btnPlus.addEventListener("click", () => {
    cart[productTitle].quantity++;
    setCart(cart);
    renderQuantityControls(btnCart, productTitle, cart);
  });
}

function updateCartAndButton(btnCart, productTitle) {
  const cart = getCart();
  if (!cart[productTitle]) {
    const product = products.find((p) => p.title === productTitle);
    if (!product) return; // защита от ошибок
    cart[productTitle] = { ...product, quantity: 1 };
    setCart(cart);
  }
  renderQuantityControls(btnCart, productTitle, cart);
}

function createItem(product) {
  const item = document.createElement("div");
  item.className = "item";

  // picture
  const picture = document.createElement("div");
  picture.className = "picture";

  const img = document.createElement("img");
  img.src = product.imgSrc;
  img.alt = product.title;

  picture.appendChild(img);

  if (product.price) {
    const price = document.createElement("div");
    price.className = "price";
    price.textContent = product.price;
    picture.appendChild(price);
  }

  item.appendChild(picture);

  // info
  const info = document.createElement("div");
  info.className = "info";

  const top = document.createElement("div");
  top.className = "top";

  const title = document.createElement("div");
  title.className = "title";
  title.textContent = product.title;

  const desc = document.createElement("div");
  desc.className = "desc";
  desc.innerHTML = product.desc;

  top.appendChild(title);
  top.appendChild(desc);

  info.appendChild(top);

  // btns
  const btns = document.createElement("div");
  btns.className = "btns";

  const btnBuy = document.createElement("div");
  btnBuy.className = "btn buy";
  btnBuy.textContent = "Купить сейчас";
  btnBuy.style.cursor = "pointer";

  btnBuy.addEventListener("click", () => {
    const cart = getCart();

    if (!cart[product.title]) {
      cart[product.title] = { ...product, quantity: 1 };
    } else {
      cart[product.title].quantity++;
    }

    setCart(cart);

    window.location.href = "/cart.html";
  });

  btns.appendChild(btnBuy);

  // Кнопка "Корзина"
  const btnCart = document.createElement("div");
  btnCart.className = "btn cart";
  btnCart.style.cursor = "pointer";

  const cart = getCart();
  if (cart[product.title]) {
    renderQuantityControls(btnCart, product.title, cart);
  } else {
    btnCart.textContent = "Корзина";
    btnCart.onclick = () => {
      updateCartAndButton(btnCart, product.title);
    };
  }

  btns.appendChild(btnCart);

  info.appendChild(btns);

  item.appendChild(info);

  return item;
}

document.addEventListener("DOMContentLoaded", () => {
  // Сброс cookie корзины при загрузке страницы
  document.cookie = "cart=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

  const itemsContainer = document.querySelector(".items");
  itemsContainer.innerHTML = "";

  products.forEach((product) => {
    const itemElement = createItem(product);
    itemsContainer.appendChild(itemElement);
  });
});
