document.addEventListener("DOMContentLoaded", () => {
    const footerContainer = document.getElementById("footer-container");
  
    if (footerContainer) {
      fetch("/components/footer.html")
        .then(response => response.text())
        .then(html => {
          footerContainer.innerHTML = html;
        })
        .catch(err => console.error("Footer load error:", err));
    }
  });
  