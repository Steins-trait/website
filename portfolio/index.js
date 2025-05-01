/* -----------------------------------------
  Have focus outline only for keyboard users 
 ---------------------------------------- */

const handleFirstTab = (e) => {
  if(e.key === 'Tab') {
    document.body.classList.add('user-is-tabbing')

    window.removeEventListener('keydown', handleFirstTab)
    window.addEventListener('mousedown', handleMouseDownOnce)
  }

}

const handleMouseDownOnce = () => {
  document.body.classList.remove('user-is-tabbing')

  window.removeEventListener('mousedown', handleMouseDownOnce)
  window.addEventListener('keydown', handleFirstTab)
}

window.addEventListener('keydown', handleFirstTab)

const backToTopButton = document.querySelector(".back-to-top");
let isBackToTopRendered = false;

let alterStyles = (isBackToTopRendered) => {
  backToTopButton.style.visibility = isBackToTopRendered ? "visible" : "hidden";
  backToTopButton.style.opacity = isBackToTopRendered ? 1 : 0;
  backToTopButton.style.transform = isBackToTopRendered
    ? "scale(1)"
    : "scale(0)";
};

window.addEventListener("scroll", () => {
  if (window.scrollY > 700) {
    isBackToTopRendered = true;
    alterStyles(isBackToTopRendered);
  } else {
    isBackToTopRendered = false;
    alterStyles(isBackToTopRendered);
  }
});

const navToggle = document.querySelector('.nav__toggle');
const navItems = document.querySelector('.nav__items');

navToggle.addEventListener('click', () => {
    navItems.classList.toggle('nav__items--visible');
    navToggle.classList.toggle('nav__toggle--open');
});


navToggle.addEventListener('click', () => {
  console.log("Hamburger clicked!");
  navItems.classList.toggle('nav__items--open');
});


document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('crimmi-modal');
  const modalImage = document.getElementById('modal-image');
  const modalClose = document.querySelector('.modal__close');
  const projectImage = document.querySelector('[data-modal="crimmi-modal"]');

  // Open modal when the image is clicked
  projectImage.addEventListener('click', () => {
    modal.style.display = 'flex';
    modalImage.src = projectImage.querySelector('img').src; // Set the modal image source
  });

  // Close modal when the close button is clicked
  modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // Close modal when clicking outside the image
  modal.addEventListener('click', (e) => {
      modal.style.display = 'none';
    });

  // Close modal when pressing the Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modal.style.display = 'none';
    }
  });
});