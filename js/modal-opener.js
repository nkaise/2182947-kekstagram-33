import {isEscapeKey, toggleClassName} from './utils';
import {openScaleImage,closeScaleImage} from './scale-modifier';
import {stylesHandler} from './image-effects';

const uploadImageForm = document.querySelector('#upload-select-image');
const uploadImageOverlay = uploadImageForm.querySelector('.img-upload__overlay');
const cancelUploadButton = uploadImageForm.querySelector('.img-upload__cancel');
const effectLevelSliderContainer = uploadImageForm.querySelector('.img-upload__effect-level');
const effectsListElement = uploadImageForm.querySelector('.effects__list');

const openUploadingForm = () => {
  toggleClassName(uploadImageOverlay, 'hidden');
  toggleClassName(document.body, 'modal-open');
  openScaleImage();
  effectLevelSliderContainer.classList.add('hidden');
  effectsListElement.addEventListener('change', stylesHandler);
};

const closeUploadPopup = () => {
  toggleClassName(uploadImageOverlay, 'hidden');
  toggleClassName(document.body, 'modal-open');
  document.removeEventListener('keydown', onCancelUploadEscKeydown);
  cancelUploadButton.removeEventListener('click', closeUploadPopup);
  closeScaleImage();
  uploadImageForm.reset();
  effectsListElement.removeEventListener('change', stylesHandler);
};

function onCancelUploadEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    closeUploadPopup();
  }
}

const openModalForm = (element) => {
  element.addEventListener('change', (evt) => {
    evt.preventDefault();
    openUploadingForm();
    cancelUploadButton.addEventListener('click', closeUploadPopup);
    document.addEventListener('keydown', onCancelUploadEscKeydown);
  });
};

export {openModalForm};
