import {RERENDER_DELAY} from './miniature-rendering-data';

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const getUniqueValue = () => {
  let id = 0;
  return () => {
    id += 1;
    return id;
  };
};

const clearInnerElements = (block) => {
  block.textContent = '';
};

const toggleClassName = (element, className) => {
  element.classList.toggle(className);
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const stopPropagation = (evt) => {
  evt.stopPropagation();
  evt.preventDefault();
};

function debounce (callback, timeoutDelay = RERENDER_DELAY) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {getRandomInteger, getRandomArrayElement, getUniqueValue, clearInnerElements, isEscapeKey, toggleClassName, stopPropagation, debounce};
