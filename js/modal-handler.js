import {isEscapeKey, toggleClassName} from './utils';
import {handleScaleListeners,removeScaleListeners,resetScaleValue} from './scale-modifier';
import {stylesHandler} from './image-effects';

const uploadImageForm = document.querySelector('#upload-select-image');
const uploadImageOverlay = uploadImageForm.querySelector('.img-upload__overlay');
const cancelUploadButton = uploadImageForm.querySelector('.img-upload__cancel');
const effectLevelSliderContainer = uploadImageForm.querySelector('.img-upload__effect-level');
const effectsListElement = uploadImageForm.querySelector('.effects__list');
const imageUploadedPreviewElement = uploadImageForm.querySelector('.img-upload__preview img');

const openUploadingForm = () => {
  toggleClassName(uploadImageOverlay, 'hidden');
  toggleClassName(document.body, 'modal-open');
  handleScaleListeners();
  effectLevelSliderContainer.classList.add('hidden');
  effectsListElement.addEventListener('change', stylesHandler);
};

const resetDataForm = () => {
  resetScaleValue();
  uploadImageForm.reset();
  imageUploadedPreviewElement.removeAttribute('style');
};

const removeErrorPristineElements = () => {
  const errorPristineElements = uploadImageForm.querySelectorAll('.pristine-error');
  errorPristineElements.forEach((error) => {
    error.remove();
  });
};

const closeUploadingForm = () => {
  toggleClassName(uploadImageOverlay, 'hidden');
  toggleClassName(document.body, 'modal-open');
  document.removeEventListener('keydown', onCancelUploadEscKeydown);
  cancelUploadButton.removeEventListener('click', closeUploadingForm);
  effectsListElement.removeEventListener('change', stylesHandler);
  removeScaleListeners();
  resetDataForm();
  removeErrorPristineElements();
};

function onCancelUploadEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    closeUploadingForm();
  }
}

const openModalForm = (element) => {
  element.addEventListener('change', (evt) => {
    evt.preventDefault();
    openUploadingForm();
    cancelUploadButton.addEventListener('click', closeUploadingForm);
    document.addEventListener('keydown', onCancelUploadEscKeydown);
  });
};

export {openModalForm,closeUploadingForm};
