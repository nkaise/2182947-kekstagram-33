import {isEscapeKey, toggleClassName} from './utils';
import {handleScaleListeners,removeScaleListeners,resetScaleValue} from './scale-modifier';
import {stylesHandler} from './image-effects';

const uploadImageFormElement = document.querySelector('#upload-select-image');
const uploadImageOverlayElement = uploadImageFormElement.querySelector('.img-upload__overlay');
const cancelUploadButtonElement = uploadImageFormElement.querySelector('.img-upload__cancel');
const effectLevelSliderContainerElement = uploadImageFormElement.querySelector('.img-upload__effect-level');
const effectsListElement = uploadImageFormElement.querySelector('.effects__list');
const imageUploadedPreviewElement = uploadImageFormElement.querySelector('.img-upload__preview img');

const openUploadingForm = () => {
  toggleClassName(uploadImageOverlayElement, 'hidden');
  toggleClassName(document.body, 'modal-open');
  handleScaleListeners();
  effectLevelSliderContainerElement.classList.add('hidden');
  effectsListElement.addEventListener('change', stylesHandler);
};

const resetDataForm = () => {
  resetScaleValue();
  uploadImageFormElement.reset();
  imageUploadedPreviewElement.removeAttribute('style');
};

const closeUploadForm = () => {
  toggleClassName(uploadImageOverlayElement, 'hidden');
  toggleClassName(document.body, 'modal-open');
  document.removeEventListener('keydown', onCancelUploadEscKeydown);
  cancelUploadButtonElement.removeEventListener('click', closeUploadForm);
  effectsListElement.removeEventListener('change', stylesHandler);
  removeScaleListeners();
  resetDataForm();
};

function onCancelUploadEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    closeUploadForm();
  }
}

const openModalForm = (element) => {
  element.addEventListener('change', (evt) => {
    evt.preventDefault();
    openUploadingForm();
    cancelUploadButtonElement.addEventListener('click', closeUploadForm);
    document.addEventListener('keydown', onCancelUploadEscKeydown);
  });
};

export {openModalForm,closeUploadForm};
