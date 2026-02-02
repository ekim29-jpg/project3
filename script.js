const rightImage = document.getElementById("rightImage");
const fourthImage = document.getElementById("fourthImage");
const collageImages = document.querySelectorAll(".collage img");


rightImage.addEventListener("click", () => {
  fourthImage.classList.add("show");
});

// 하루 한 장 reveal
if (collageImages.length > 0) {
  const today = new Date().toISOString().split("T")[0];
  const storedDay = localStorage.getItem("revealDay");
  let index = Number(localStorage.getItem("revealIndex"));

  if (storedDay !== today || isNaN(index)) {
    index = Math.floor(Math.random() * collageImages.length);
    localStorage.setItem("revealDay", today);
    localStorage.setItem("revealIndex", index);
  }

  collageImages[index].classList.add("reveal");
}

function toggleClassOnElements(selector, className) {
  document.querySelectorAll(selector).forEach(el => {
    el.classList.toggle(className);
  });
}

document.querySelectorAll(".draggable").forEach(element => {
  let offsetX = 0;
  let offsetY = 0;
  let isDragging = false;

  element.addEventListener("pointerdown", event => {
    isDragging = true;
    offsetX = event.clientX - element.offsetLeft;
    offsetY = event.clientY - element.offsetTop;
    element.setPointerCapture(event.pointerId);
    element.style.zIndex = 1000;
  });

  element.addEventListener("pointermove", event => {
    if (!isDragging) return;
    element.style.left = event.clientX - offsetX + "px";
    element.style.top = event.clientY - offsetY + "px";
  });

  element.addEventListener("pointerup", () => {
    isDragging = false;
  });
});

document.getElementById("glow-btn").addEventListener("click", () => {
  toggleClassOnElements(".draggable", "glow");
  document.body.classList.toggle("glow");
});