const scrollContainer = document.querySelector(
  ".scroll-container.left-to-right"
);
const scrollContent = scrollContainer.querySelector(".scroll-content");

let animationStartTime = null;
let animationDuration = 40000; // 40s в мс
let rafId = null;

scrollContainer.addEventListener("mouseenter", () => {
  // Запускаем CSS-анимацию
  scrollContent.style.animationPlayState = "running";
  animationStartTime = performance.now();
});

scrollContainer.addEventListener("mouseleave", () => {
  // Останавливаем CSS-анимацию
  scrollContent.style.animationPlayState = "paused";

  // Вычисляем прошедшее время анимации
  let elapsed = performance.now() - animationStartTime;
  if (elapsed > animationDuration) elapsed = elapsed % animationDuration;

  // Рассчитаем прогресс анимации (0..1)
  let progress = elapsed / animationDuration;

  // По keyframes scroll-right: translateX от -50% (в начале) до 0% (в конце)
  // Значит, текущее смещение = -50% + 50% * progress = (-50 + 50*progress)%
  let translatePercent = -50 + 50 * progress;

  // Применяем текущее смещение как inline-стиль transform
  scrollContent.style.animationName = "none";
  scrollContent.style.transform = `translateX(${translatePercent}%)`;
});
