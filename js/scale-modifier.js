import {ImageScale,NUMERAL_SYSTEM} from './scale-modifier-data';

const imageUploadPreviewContainerElement = document.querySelector('.img-upload__preview-container');
const imageScaleSmallerElement = imageUploadPreviewContainerElement.querySelector('.scale__control--smaller');
const imageScaleBiggerElement = imageUploadPreviewContainerElement.querySelector('.scale__control--bigger');
const imagePreviewElement = imageUploadPreviewContainerElement.querySelector('.img-upload__preview img');
const scaleValueElement = imageUploadPreviewContainerElement.querySelector('.scale__control--value');
let changingScaleValue = scaleValueElement.value;

const changeScaleValue = () => {
  const updatedScaleValue = changingScaleValue / ImageScale.MAX;
  imagePreviewElement.style.transform = `scale(${updatedScaleValue})`;
  scaleValueElement.setAttribute('value', `${changingScaleValue}%`);
};

const zoomOutImage = () => {
  changingScaleValue = parseInt(changingScaleValue, NUMERAL_SYSTEM) - ImageScale.MIN;
  changingScaleValue = Math.max(changingScaleValue, ImageScale.MIN);
  changeScaleValue();
};

const zoomInImage = () => {
  changingScaleValue = parseInt(changingScaleValue, NUMERAL_SYSTEM) + ImageScale.MIN;
  changingScaleValue = Math.min(changingScaleValue, ImageScale.MAX);
  changeScaleValue();
};

const resetScaleValue = () => {
  changingScaleValue = ImageScale.MAX;
  changeScaleValue();
  scaleValueElement.setAttribute('value', `${ImageScale.MAX}%`);
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
