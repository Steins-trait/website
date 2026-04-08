document.addEventListener("DOMContentLoaded", () => {
  const el = document.getElementById("analytics-container");
  if (el) {
    fetch("/components/analytics.html")
      .then(r => r.text())
      .then(html => { el.innerHTML = html; })
      .catch(err => console.error("Analytics load error:", err));
  }
});