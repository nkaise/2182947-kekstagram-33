import {MIN_RANGE_VALUE,MAX_RANGE_VALUE,START_VALUE,STEP_RANGE_VALUE,EFFECT_MIN_START_VALUE,EFFECT_MAX_START_VALUE,EFFECT_MAX_END_VALUE,EFFECT_MIN_END_VALUE,EFFECT_VALUE,EFFECT_MIN_STEP_VALUE,EFFECT_MAX_STEP_VALUE,ZERO_VALUE} from './image-effects-data';

const imagePreviewElement = document.querySelector('.img-upload__preview-container');
const effectLevelValueElement = imagePreviewElement.querySelector('.effect-level__value');
const effectLevelSlider = imagePreviewElement.querySelector('.effect-level__slider');
const effectLevelSliderContainer = imagePreviewElement.querySelector('.img-upload__effect-level');
const imageUploadedPreviewElement = imagePreviewElement.querySelector('.img-upload__preview img');
const imageEffectsElement = document.querySelector('.effects');
const effectNoneElement = imageEffectsElement.querySelector('#effect-none').id;
const effectChromeElement = imageEffectsElement.querySelector('#effect-chrome').id;
const effectSepiaElement = imageEffectsElement.querySelector('#effect-sepia').id;
const effectMarvinElement = imageEffectsElement.querySelector('#effect-marvin').id;
const effectPhobosElement = imageEffectsElement.querySelector('#effect-phobos').id;
const effectHeatElement = imageEffectsElement.querySelector('#effect-heat').id;

noUiSlider.create(effectLevelSlider, {
  range: {
    min: MIN_RANGE_VALUE,
    max: MAX_RANGE_VALUE,
  },
  start: START_VALUE,
  step: STEP_RANGE_VALUE,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  }
});

const changeEffectsElement = (min, max, step, styleFunction, isDefault) => {
  if (!isDefault) {
    effectLevelSliderContainer.classList.remove('hidden');
    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: min,
        max: max,
      },
      start: START_VALUE,
      step: step,
    });
    effectLevelSlider.noUiSlider.on('update', () => {
      const value = effectLevelSlider.noUiSlider.get();
      imageUploadedPreviewElement.style.filter = styleFunction(value);
      effectLevelValueElement.setAttribute('value', `${value}`);
    });
  } else {
    imageUploadedPreviewElement.style.filter = '';
    effectLevelSliderContainer.classList.add('hidden');
    effectLevelValueElement.setAttribute('value', '');
  }
};

const stylesHandler = (evt) => {
  switch (evt.target.id) {
    case effectHeatElement: {
      changeEffectsElement(EFFECT_MAX_START_VALUE, EFFECT_VALUE, EFFECT_MIN_STEP_VALUE, (value) => `brightness(${value})`, false);
      break;
    }
    case effectPhobosElement: {
      changeEffectsElement(EFFECT_MIN_START_VALUE, EFFECT_VALUE, EFFECT_MIN_STEP_VALUE, (value) => `blur(${value}px)`, false);
      break;
    }
    case effectMarvinElement: {
      changeEffectsElement(EFFECT_MIN_START_VALUE, EFFECT_MAX_END_VALUE, EFFECT_MAX_STEP_VALUE, (value) => `invert(${value}%)`, false);
      break;
    }
    case effectSepiaElement: {
      changeEffectsElement(EFFECT_MIN_START_VALUE, EFFECT_MIN_END_VALUE, EFFECT_MIN_STEP_VALUE, (value) => `sepia(${value})`, false);
      break;
    }
    case effectChromeElement: {
      changeEffectsElement(EFFECT_MIN_START_VALUE, EFFECT_MIN_END_VALUE, EFFECT_MIN_STEP_VALUE, (value) => `grayscale(${value})`);
      break;
    }
    case effectNoneElement: {
      changeEffectsElement(EFFECT_MIN_START_VALUE, ZERO_VALUE, ZERO_VALUE, '', true);
      break;
    }
    default:
      changeEffectsElement(EFFECT_MIN_START_VALUE, ZERO_VALUE, ZERO_VALUE, '', true);
  }
};

export {stylesHandler};
