document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("posterOverlay");
  const overlayImg = overlay.querySelector("img");
  const caption = overlay.querySelector(".poster-caption");
  const posters = document.querySelectorAll(".poster");
  const postersContainers = document.querySelectorAll(".posters"); // все контейнеры с прокруткой

  const captionsMap = {
    "1.svg": "1 серия: «Energy flowers»",
    "2.svg": "2 серия: «Saffi’s elements»",
    "3.svg": "3 серия: «Это ты»",
    "4.svg": "4 серия: «Я, ТЫ, МЫ»",
    "5.svg": "5 серия: «Всё можно с конфетками Saffi»",
  };

  posters.forEach((poster) => {
    poster.addEventListener("click", () => {
      overlayImg.src = poster.src;
      const fileName = poster.src.split("/").pop();
      caption.textContent = captionsMap[fileName] || "";
      overlay.classList.add("active");
      document.body.style.overflow = "hidden";

      // Скрываем все прокрутки с постерами
      postersContainers.forEach((container) => {
        container.style.display = "none";
      });
    });
  });

  function closeOverlay() {
    overlay.classList.remove("active");
    overlayImg.src = "";
    caption.textContent = "";
    document.body.style.overflow = "";

    // Показываем обратно все постеры
    postersContainers.forEach((container) => {
      container.style.display = "";
    });
  }

  overlay.addEventListener("click", closeOverlay);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("active")) {
      closeOverlay();
    }
  });
});
