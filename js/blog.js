/**
 * BLOG PAGE SCRIPTS
 * Back-to-top, reading progress, TOC + scrollspy, heading anchors.
 */

const backToTopButton = document.querySelector(".back-to-top");

if (backToTopButton) {
  let isVisible = false;

  const setVisibility = (visible) => {
    backToTopButton.style.visibility = visible ? "visible" : "hidden";
    backToTopButton.style.opacity = visible ? 1 : 0;
    backToTopButton.style.transform = visible ? "scale(1)" : "scale(0)";
  };

  window.addEventListener("scroll", () => {
    const shouldShow = window.scrollY > 700;
    if (shouldShow !== isVisible) {
      isVisible = shouldShow;
      setVisibility(isVisible);
    }
  });
}

/* ---- Tag filter (blog index only) ---- */
(function () {
  const filterContainer = document.getElementById("blog-filter");
  if (!filterContainer) return;

  const cards = Array.from(document.querySelectorAll(".post-card"));
  if (!cards.length) return;

  const tags = new Set();
  cards.forEach(card => {
    const tagEl = card.querySelector(".post-card__tag");
    if (tagEl) tags.add(tagEl.textContent.trim());
  });

  const makePill = (label, value) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "blog__filter-pill";
    btn.dataset.tag = value;
    btn.textContent = label;
    return btn;
  };

  filterContainer.appendChild(makePill("All", "*"));
  Array.from(tags).sort().forEach(t => filterContainer.appendChild(makePill(t, t)));

  const pills = filterContainer.querySelectorAll(".blog__filter-pill");
  pills[0].classList.add("is-active");

  filterContainer.addEventListener("click", (e) => {
    const btn = e.target.closest(".blog__filter-pill");
    if (!btn) return;
    pills.forEach(p => p.classList.toggle("is-active", p === btn));
    const tag = btn.dataset.tag;
    cards.forEach(card => {
      const cardTag = card.querySelector(".post-card__tag");
      const text = cardTag ? cardTag.textContent.trim() : "";
      const show = tag === "*" || text === tag;
      card.style.display = show ? "" : "none";
    });
  });
})();

/* ---- Reading progress bar (post pages only) ---- */
(function () {
  const body = document.querySelector(".post__body");
  if (!body) return;

  const bar = document.createElement("div");
  bar.className = "reading-progress";
  document.body.appendChild(bar);

  const update = () => {
    const rect = body.getBoundingClientRect();
    const total = rect.height - window.innerHeight;
    const scrolled = Math.min(Math.max(-rect.top, 0), total);
    const pct = total > 0 ? (scrolled / total) * 100 : 0;
    bar.style.width = pct + "%";
  };

  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
})();

/* ---- Heading slugs + anchor icons + TOC + scrollspy ---- */
(function () {
  const body = document.querySelector(".post__body");
  if (!body) return;

  const headings = Array.from(body.querySelectorAll("h3"));
  if (!headings.length) return;

  const slugify = (text) =>
    text.toLowerCase().trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .slice(0, 60);

  const used = new Set();
  headings.forEach(h => {
    let id = h.id || slugify(h.textContent);
    let n = 2;
    const base = id;
    while (used.has(id)) id = base + "-" + n++;
    used.add(id);
    h.id = id;

    const anchor = document.createElement("a");
    anchor.className = "post__heading-anchor";
    anchor.href = "#" + id;
    anchor.setAttribute("aria-label", "Copy link to section");
    anchor.textContent = "#";
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      const url = window.location.origin + window.location.pathname + "#" + id;
      history.replaceState(null, "", "#" + id);
      if (navigator.clipboard) navigator.clipboard.writeText(url).catch(() => {});
      h.scrollIntoView({ behavior: "smooth" });
    });
    h.appendChild(anchor);
  });

  // Build TOC
  const toc = document.createElement("details");
  toc.className = "post__toc";
  toc.open = window.matchMedia("(min-width: 800px)").matches;
  const summary = document.createElement("summary");
  summary.className = "post__toc-summary";
  summary.textContent = "On this page";
  toc.appendChild(summary);

  const list = document.createElement("ul");
  list.className = "post__toc-list";
  headings.forEach(h => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = "#" + h.id;
    a.className = "post__toc-link";
    a.textContent = h.firstChild ? h.firstChild.textContent.trim() : h.textContent.trim();
    li.appendChild(a);
    list.appendChild(li);
  });
  toc.appendChild(list);
  body.insertBefore(toc, body.firstChild);

  // Scrollspy
  const links = toc.querySelectorAll(".post__toc-link");
  const linkById = new Map();
  links.forEach(l => linkById.set(l.getAttribute("href").slice(1), l));

  const setActive = (id) => {
    links.forEach(l => l.classList.toggle("is-active", l.getAttribute("href") === "#" + id));
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) setActive(entry.target.id);
    });
  }, {
    rootMargin: "-90px 0px -70% 0px",
    threshold: 0
  });
  headings.forEach(h => observer.observe(h));
})();