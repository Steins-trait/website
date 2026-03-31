document.addEventListener('DOMContentLoaded', () => {
  const lightbox        = document.getElementById('photo-lightbox');
  const lightboxImg     = document.getElementById('photo-lightbox-img');
  const lightboxCaption = document.getElementById('photo-lightbox-caption');
  const closeBtn        = document.getElementById('photo-lightbox-close');

  if (!lightbox) return;

  const open = (img, captionText) => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = captionText;
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
    // Clear src after transition so previous image doesn't flash on next open
    setTimeout(() => { lightboxImg.src = ''; }, 250);
  };

  document.querySelectorAll('.gallery__item').forEach(item => {
    item.addEventListener('click', () => {
      const img     = item.querySelector('img');
      const caption = item.querySelector('.gallery__item-caption');
      open(img, caption ? caption.textContent.trim() : '');
    });
  });

  // Click the dark backdrop to close; click the image itself does nothing
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });

  closeBtn.addEventListener('click', close);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('is-open')) close();
  });
});