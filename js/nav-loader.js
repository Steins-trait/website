document.addEventListener("DOMContentLoaded", () => {
  const navContainer = document.getElementById("nav-container");

  if (navContainer) {
    fetch("/components/nav.html")
      .then(response => response.text())
      .then(html => {
        navContainer.innerHTML = html;
      })
      .catch(err => console.error("Nav load error:", err));
  }
});
