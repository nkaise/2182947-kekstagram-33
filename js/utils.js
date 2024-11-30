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

const showDownloadErrorMessage = () => {
  const downloadErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
  const errorMessage = downloadErrorTemplate.cloneNode(true);
  const container = document.body;
  container.append(errorMessage);
  setTimeout(() => {
    errorMessage.remove();
  }, 5000);
};

const successUploadMessage = () => {
  const successUploadTemplate = document.querySelector('#success').content.querySelector('.success');
  const successMessage = successUploadTemplate.cloneNode(true);
  const container = document.body;
  container.append(successMessage);
};

const errorUploadMessage = () => {
  const errorUploadTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorMessage = errorUploadTemplate.cloneNode(true);
  const container = document.body;
  container.append(errorMessage);
};

export {getRandomInteger, getRandomArrayElement, getUniqueValue, clearInnerElements, isEscapeKey, toggleClassName, stopPropagation,showDownloadErrorMessage,successUploadMessage,errorUploadMessage};
