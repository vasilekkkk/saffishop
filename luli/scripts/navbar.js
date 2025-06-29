document.addEventListener("DOMContentLoaded", () => {
  const sIcon = document.querySelector(".navbar .s");
  const leftDiv = document.querySelector(".navbar .left");

  sIcon.addEventListener("click", () => {
    leftDiv.classList.toggle("active");
    sIcon.classList.toggle("rotate");
  });
});
