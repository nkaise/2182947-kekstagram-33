import {isEscapeKey,toggleClassName} from './utils';
import {handleScaleListeners,removeScaleListeners,resetScaleValue} from './scale-modifier';
import {stylesHandler} from './image-effects';
import {pristine} from './form-controller';
import {closeKeyDownErrorStatusMessage} from './notification-modal-handler';
import {StatusOption} from './notification-modal-handler-data';

const uploadImageFormElement = document.querySelector('#upload-select-image');
const uploadImageOverlayElement = uploadImageFormElement.querySelector('.img-upload__overlay');
const cancelUploadButtonElement = uploadImageFormElement.querySelector('.img-upload__cancel');
const effectLevelSliderContainerElement = uploadImageFormElement.querySelector('.img-upload__effect-level');
const effectsListElement = uploadImageFormElement.querySelector('.effects__list');
const imageUploadedPreviewElement = uploadImageFormElement.querySelector('.img-upload__preview img');
let popUpsStack = [];

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
  const errorStatusElement = document.querySelector(`.${StatusOption.ERROR_STATUS}`);
  if (errorStatusElement) {
    popUpsStack.push(errorStatusElement);
  }
  if (isEscapeKey(evt)) {
    if (popUpsStack.length > 1) {
      popUpsStack.pop();
      return closeKeyDownErrorStatusMessage(errorStatusElement);
    } if (popUpsStack.length === 1) {
      evt.preventDefault();
      popUpsStack = [];
      return closeUploadForm();
    }
  }
}

const openModalForm = (element) => {
  element.addEventListener('change', (evt) => {
    evt.preventDefault();
    openUploadForm();
    cancelUploadButtonElement.addEventListener('click', closeUploadForm);
    document.addEventListener('keydown', onCancelUploadEscKeydown);
    popUpsStack.push(element);
  });
};

export {openModalForm,closeUploadForm};
