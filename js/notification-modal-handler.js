import {StatusOption,ALERT_SHOW_TIME,TAG_NAME,INNER_CLASSNAME} from './notification-modal-handler-data';
import {isEscapeKey} from './utils';

const closeErrorStatusMessageBtn = (status) => {
  const statusMessage = document.querySelector(`.${status}`);
  const statusButtonElement = statusMessage.querySelector(`.${status}__${TAG_NAME}`);
  const removeMessage = () => {
    statusMessage.remove();
    document.removeEventListener('click', onClickOutsideHandler);
  };
  function onClickOutsideHandler (evt) {
    if (!evt.target.closest(`.${status}__${INNER_CLASSNAME}`)) {
      removeMessage();
    }
  }
  statusButtonElement.addEventListener('click', removeMessage);
  document.addEventListener('click', onClickOutsideHandler);
};

const closeSuccessStatusMessage = (status) => {
  const statusMessage = document.querySelector(`.${status}`);
  const statusButtonElement = statusMessage.querySelector(`.${status}__${TAG_NAME}`);
  const removeMessage = () => {
    statusMessage.remove();
    document.removeEventListener('keydown', onKeyDownHandler);
    document.removeEventListener('click', onClickOutsideHandler);
  };
  function onKeyDownHandler (evt){
    if (isEscapeKey(evt)) {
      removeMessage();
    }
  }
  function onClickOutsideHandler (evt) {
    if (!evt.target.closest(`.${status}__${INNER_CLASSNAME}`)) {
      removeMessage();
    }
  }
  statusButtonElement.addEventListener('click', removeMessage);
  document.addEventListener('keydown', onKeyDownHandler);
  document.addEventListener('click', onClickOutsideHandler);
};

const showStatusMessage = (status) => {
  const messageUploadTemplate = document.querySelector(`#${status}`).content.querySelector(`.${status}`);
  const textMessage = messageUploadTemplate.cloneNode(true);
  const container = document.body;
  container.append(textMessage);
  if (status === StatusOption.DATA_ERROR_STATUS) {
    setTimeout(() => {
      textMessage.remove();
    }, ALERT_SHOW_TIME);
    return;
  }
  if (status === StatusOption.SUCCESS_STATUS) {
    closeSuccessStatusMessage(status);
    return;
  }
  if (status === StatusOption.ERROR_STATUS) {
    closeErrorStatusMessageBtn(status);
  }
};

function closeKeyDownErrorStatusMessage (status) {
  status.remove();
}

export {showStatusMessage,closeKeyDownErrorStatusMessage};
