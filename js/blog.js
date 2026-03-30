/**
 * BLOG PAGE SCRIPTS
 * =================
 * Handles the back-to-top button on blog post pages.
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