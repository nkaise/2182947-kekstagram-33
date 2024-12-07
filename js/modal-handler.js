import {isEscapeKey, toggleClassName} from './utils';
import {handleScaleListeners,removeScaleListeners,resetScaleValue} from './scale-modifier';
import {stylesHandler} from './image-effects';
import {pristine} from './form-controller';

const uploadImageFormElement = document.querySelector('#upload-select-image');
const uploadImageOverlayElement = uploadImageFormElement.querySelector('.img-upload__overlay');
const cancelUploadButtonElement = uploadImageFormElement.querySelector('.img-upload__cancel');
const effectLevelSliderContainerElement = uploadImageFormElement.querySelector('.img-upload__effect-level');
const effectsListElement = uploadImageFormElement.querySelector('.effects__list');
const imageUploadedPreviewElement = uploadImageFormElement.querySelector('.img-upload__preview img');

const openUploadForm = () => {
  toggleClassName(uploadImageOverlayElement, 'hidden');
  toggleClassName(document.body, 'modal-open');
  handleScaleListeners();
  effectLevelSliderContainerElement.classList.add('hidden');
  effectsListElement.addEventListener('change', stylesHandler);
};

const removeErrorPristineElements = () => {
  const errorPristineElements = uploadImageFormElement.querySelectorAll('.pristine-error');
  errorPristineElements.forEach((error) => {
    error.remove();
  });
};

const resetDataForm = () => {
  resetScaleValue();
  uploadImageFormElement.reset();
  imageUploadedPreviewElement.removeAttribute('style');
  removeErrorPristineElements();
  pristine.reset();
};

const closeUploadForm = () => {
  toggleClassName(uploadImageOverlayElement, 'hidden');
  toggleClassName(document.body, 'modal-open');
  cancelUploadButtonElement.removeEventListener('click', closeUploadForm);
  effectsListElement.removeEventListener('change', stylesHandler);
  document.removeEventListener('keydown', onCancelUploadEscKeydown);
  removeScaleListeners();
  resetDataForm();
};

function onCancelUploadEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadForm();
  }
}

const openModalForm = (element) => {
  element.addEventListener('change', (evt) => {
    evt.preventDefault();
    openUploadForm();
    cancelUploadButtonElement.addEventListener('click', closeUploadForm);
    document.addEventListener('keydown', onCancelUploadEscKeydown);
  });
};

export {openModalForm,closeUploadForm};
