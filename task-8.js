import transactionGallery from './gallery-items.js';

const galleryEl = document.querySelector('.js-gallery');
const isModalOn = document.querySelector('div.lightbox');
const imageAtrr = document.querySelector('.lightbox__image');
const modalCloseBtn = document.querySelector(
  'button[data-action="close-lightbox"]',
);

const cardsMarkup = createPhotoMarcup();
galleryEl.insertAdjacentHTML('beforeend', cardsMarkup);

function createPhotoMarcup() {
  return transactionGallery
    .map(imageEl => {
      const { preview, original, description } = imageEl;
      return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
    })
    .join('');
}

galleryEl.addEventListener('click', onOpenModal);

function onOpenModal(evt) {
  evt.preventDefault();
  const isImageClick = evt.target;

  if (isImageClick) {
    isModalOn.classList.add('is-open');

    imageAtrr.src = evt.target.dataset.source;
  }
}

// Закрытие модального окна по клику на кнопку button[data-action="close-modal"].

modalCloseBtn.addEventListener('click', onModalCloseBtn);

function onModalCloseBtn() {
  isModalOn.classList.remove('is-open');
  imageAtrr.src = '';
}
