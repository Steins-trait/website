const scrollCue = document.querySelector('.scroll-cue');
  
    window.addEventListener('scroll', () => {
      if (window.scrollY > 70) {
        scrollCue.classList.add('scroll-cue--hidden');
      } else {
        scrollCue.classList.remove('scroll-cue--hidden');
      }
    });