import transactionGallery from './gallery-items.js';

const refs = {
  gallery: document.querySelector('.js-gallery'),
  modal: document.querySelector('div.lightbox'),
  modalImage: document.querySelector('.lightbox__image'),
  modalCloseBtn: document.querySelector('button[data-action="close-lightbox"]'),
  backdrop: document.querySelector('.lightbox__overlay'),
};

refs.gallery.addEventListener('click', onOpenModal);
refs.modalCloseBtn.addEventListener('click', onCloseModal);
refs.backdrop.addEventListener('click', onbackdropClick);

const cardsMarkup = createPhotoMarcup();
refs.gallery.insertAdjacentHTML('beforeend', cardsMarkup);

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

function onOpenModal(evt) {
  evt.preventDefault();
  const isImageClick = evt.target;

  if (isImageClick) {
    refs.modal.classList.add('is-open');
    refs.modalImage.src = evt.target.dataset.source;

    window.addEventListener('keydown', onEscKeyPress);
  }
}

function onCloseModal() {
  refs.modal.classList.remove('is-open');
  refs.modalImage.src = '';

  window.removeEventListener('keydown', onEscKeyPress);
}

function onbackdropClick(event) {
  if (event.currentTarget === event.target) {
    onCloseModal();
  }
}

function onEscKeyPress(event) {
  if (event.code === 'Escape') {
    onCloseModal();
  }
}
