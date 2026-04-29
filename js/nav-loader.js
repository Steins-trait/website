document.addEventListener("DOMContentLoaded", () => {
  const navContainer = document.getElementById("nav-container");
  if (!navContainer) return;

  fetch("/components/nav.html")
    .then(response => response.text())
    .then(html => {
      navContainer.innerHTML = html;
      initNavToggle();
      markActiveLink();
      ensureSkipTarget();
      syncNavHeights();
      window.addEventListener("resize", syncNavHeights);
    })
    .catch(err => console.error("Nav load error:", err));
});

function initNavToggle() {
  const nav = document.querySelector(".main-nav");
  const toggle = document.querySelector(".main-nav__toggle");
  if (!nav || !toggle) return;

  const close = () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
  };

  const open = () => {
    nav.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close menu");
  };

  toggle.addEventListener("click", () => {
    nav.classList.contains("is-open") ? close() : open();
  });

  nav.querySelectorAll(".main-nav__link").forEach(link => {
    link.addEventListener("click", close);
  });

  document.addEventListener("click", (e) => {
    if (nav.classList.contains("is-open") && !nav.contains(e.target)) close();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("is-open")) close();
  });
}

function markActiveLink() {
  const links = document.querySelectorAll(".main-nav__link");
  if (!links.length) return;
  const currentPath = window.location.pathname;
  let best = null;
  let bestLen = -1;
  links.forEach(link => {
    const linkPath = new URL(link.href, location.origin).pathname;
    let matches;
    if (linkPath === "/") {
      matches = currentPath === "/" || currentPath === "/index.html";
    } else {
      const prefix = linkPath.endsWith("/") ? linkPath : linkPath + "/";
      matches = currentPath === linkPath || currentPath.startsWith(prefix);
    }
    if (matches && linkPath.length > bestLen) {
      best = link;
      bestLen = linkPath.length;
    }
  });
  if (best) best.classList.add("is-active");
}

function ensureSkipTarget() {
  if (document.getElementById("content")) return;
  const target = document.querySelector("main") || document.querySelector("article");
  if (target) target.id = "content";
}

function syncNavHeights() {
  const mainNav = document.querySelector(".main-nav");
  const sectionNav = document.querySelector(".section-nav");
  const root = document.documentElement;
  if (mainNav) {
    root.style.setProperty("--main-nav-height", mainNav.offsetHeight + "px");
  }
  if (sectionNav) {
    root.style.setProperty("--section-nav-height", sectionNav.offsetHeight + "px");
  }
}
