import {RERENDER_DELAY} from './miniature-rendering-data';

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

export {clearInnerElements,isEscapeKey,toggleClassName,stopPropagation,debounce};
