import {MIN_RANGE_VALUE,MAX_RANGE_VALUE,START_VALUE,STEP_RANGE_VALUE,EffectValue,ZERO_VALUE} from './image-effects-data';

const imagePreviewElement = document.querySelector('.img-upload__preview-container');
const effectLevelValueElement = imagePreviewElement.querySelector('.effect-level__value');
const effectLevelSliderElement = imagePreviewElement.querySelector('.effect-level__slider');
const effectLevelSliderContainerElement = imagePreviewElement.querySelector('.img-upload__effect-level');
const imageUploadedPreviewElement = imagePreviewElement.querySelector('.img-upload__preview img');
const imageEffectsElement = document.querySelector('.effects');
const effectNoneId = imageEffectsElement.querySelector('#effect-none').id;
const effectChromeId = imageEffectsElement.querySelector('#effect-chrome').id;
const effectSepiaId = imageEffectsElement.querySelector('#effect-sepia').id;
const effectMarvinId = imageEffectsElement.querySelector('#effect-marvin').id;
const effectPhobosId = imageEffectsElement.querySelector('#effect-phobos').id;
const effectHeatId = imageEffectsElement.querySelector('#effect-heat').id;

noUiSlider.create(effectLevelSliderElement, {
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
    effectLevelSliderContainerElement.classList.remove('hidden');
    effectLevelSliderElement.noUiSlider.updateOptions({
      range: {
        min: min,
        max: max,
      },
      start: START_VALUE,
      step: step,
    });
    effectLevelSliderElement.noUiSlider.on('update', () => {
      const value = effectLevelSliderElement.noUiSlider.get();
      imageUploadedPreviewElement.style.filter = styleFunction(value);
      effectLevelValueElement.setAttribute('value', `${value}`);
    });
  } else {
    imageUploadedPreviewElement.style.filter = '';
    effectLevelSliderContainerElement.classList.add('hidden');
    effectLevelValueElement.setAttribute('value', '');
  }
};

const onEffectsListChange = (evt) => {
  switch (evt.target.id) {
    case effectHeatId: {
      changeEffectsElement(EffectValue.EFFECT_MAX_START_VALUE, EffectValue.EFFECT_VALUE, EffectValue.EFFECT_MIN_STEP_VALUE, (value) => `brightness(${value})`, false);
      break;
    }
    case effectPhobosId: {
      changeEffectsElement(EffectValue.EFFECT_MIN_START_VALUE, EffectValue.EFFECT_VALUE, EffectValue.EFFECT_MIN_STEP_VALUE, (value) => `blur(${value}px)`, false);
      break;
    }
    case effectMarvinId: {
      changeEffectsElement(EffectValue.EFFECT_MIN_START_VALUE, EffectValue.EFFECT_MAX_END_VALUE, EffectValue.EFFECT_MAX_STEP_VALUE, (value) => `invert(${value}%)`, false);
      break;
    }
    case effectSepiaId: {
      changeEffectsElement(EffectValue.EFFECT_MIN_START_VALUE, EffectValue.EFFECT_MIN_END_VALUE, EffectValue.EFFECT_MIN_STEP_VALUE, (value) => `sepia(${value})`, false);
      break;
    }
    case effectChromeId: {
      changeEffectsElement(EffectValue.EFFECT_MIN_START_VALUE, EffectValue.EFFECT_MIN_END_VALUE, EffectValue.EFFECT_MIN_STEP_VALUE, (value) => `grayscale(${value})`);
      break;
    }
    case effectNoneId: {
      changeEffectsElement(EffectValue.EFFECT_MIN_START_VALUE, ZERO_VALUE, ZERO_VALUE, '', true);
      break;
    }
    default:
      changeEffectsElement(EffectValue.EFFECT_MIN_START_VALUE, ZERO_VALUE, ZERO_VALUE, '', true);
  }
};

export {onEffectsListChange};
