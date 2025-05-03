const scrollCue = document.querySelector('.scroll-cue');

// Position it at the bottom of the initial viewport
window.addEventListener('load', () => {
  const initialOffset = window.innerHeight * 0.85; // 85% of viewport height
  scrollCue.style.top = `${initialOffset}px`;
});

window.addEventListener('scroll', () => {
  if (window.scrollY > 8) {
    scrollCue.classList.add('scroll-cue--hidden');
  } else {
    scrollCue.classList.remove('scroll-cue--hidden');
  }
});
