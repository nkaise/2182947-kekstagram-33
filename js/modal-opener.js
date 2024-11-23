import {isEscapeKey, toggleClassName} from './utils';

const uploadImageForm = document.querySelector('#upload-select-image');
const uploadedImageElement = uploadImageForm.querySelector('.img-upload__input');
const uploadImageOverlay = uploadImageForm.querySelector('.img-upload__overlay');
const cancelUploadButton = uploadImageForm.querySelector('.img-upload__cancel');

const openUploadingForm = () => {
  toggleClassName(uploadImageOverlay, 'hidden');
  toggleClassName(document.body, 'modal-open');
};

const closeUploadPopup = () => {
  toggleClassName(uploadImageOverlay, 'hidden');
  toggleClassName(document.body, 'modal-open');
  document.removeEventListener('keydown', onCancelUploadEscKeydown);
  cancelUploadButton.removeEventListener('click', closeUploadPopup);
  uploadImageForm.reset();
};

function onCancelUploadEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    closeUploadPopup();
  }
}

const openModalForm = () => {
  uploadedImageElement.addEventListener('change', (evt) => {
    evt.preventDefault();
    openUploadingForm();
    cancelUploadButton.addEventListener('click', closeUploadPopup);
    document.addEventListener('keydown', onCancelUploadEscKeydown);
  });
};

export {openModalForm};
