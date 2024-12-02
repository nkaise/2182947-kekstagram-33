import {MAX_IMAGE_SCALE,MIN_IMAGE_SCALE,NUMERAL_SYSTEM} from './scale-modifier-data';

const imageUploadPreviewContainer = document.querySelector('.img-upload__preview-container');
const imageScaleSmallerElement = imageUploadPreviewContainer.querySelector('.scale__control--smaller');
const imageScaleBiggerElement = imageUploadPreviewContainer.querySelector('.scale__control--bigger');
const imagePreviewElement = imageUploadPreviewContainer.querySelector('.img-upload__preview img');
const scaleValueElement = imageUploadPreviewContainer.querySelector('.scale__control--value');
let changingScaleValue = scaleValueElement.value;

const changeScaleValue = () => {
  const updatedScaleValue = changingScaleValue / MAX_IMAGE_SCALE;
  imagePreviewElement.style.transform = `scale(${updatedScaleValue})`;
  scaleValueElement.setAttribute('value', `${changingScaleValue}%`);
};

const zoomOutImage = () => {
  changingScaleValue = parseInt(changingScaleValue, NUMERAL_SYSTEM) - MIN_IMAGE_SCALE;
  changingScaleValue = Math.max(changingScaleValue, MIN_IMAGE_SCALE);
  changeScaleValue();
};

const zoomInImage = () => {
  changingScaleValue = parseInt(changingScaleValue, NUMERAL_SYSTEM) + MIN_IMAGE_SCALE;
  changingScaleValue = Math.min(changingScaleValue, MAX_IMAGE_SCALE);
  changeScaleValue();
};

const resetScaleValue = () => {
  changingScaleValue = MAX_IMAGE_SCALE;
  changeScaleValue();
  scaleValueElement.setAttribute('value', `${MAX_IMAGE_SCALE}%`);
};

const handleScaleListeners = () => {
  imageScaleSmallerElement.addEventListener('click', zoomOutImage);
  imageScaleBiggerElement.addEventListener('click', zoomInImage);
};

const removeScaleListeners = () => {
  imageScaleSmallerElement.removeEventListener('click', zoomOutImage);
  imageScaleBiggerElement.removeEventListener('click', zoomInImage);
};

export {handleScaleListeners,removeScaleListeners,resetScaleValue};

