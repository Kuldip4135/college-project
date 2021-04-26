let header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  let windowPosition = window.scrollY > 40;
  header.classList.toggle("scroll--active", windowPosition);
});
