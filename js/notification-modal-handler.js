import {StatusOption,ALERT_SHOW_TIME,TAG_NAME,INNER_CLASSNAME} from './notification-modal-handler-data';
import {isEscapeKey} from './utils';

const closeErrorStatusMessageBtn = (status) => {
  const statusMessage = document.querySelector(`.${status}`);
  const statusButtonElement = statusMessage.querySelector(`.${status}__${TAG_NAME}`);
  const onMessageRemove = () => {
    statusMessage.remove();
    document.removeEventListener('click', onOutsideClick);
  };
  function onOutsideClick (evt) {
    if (!evt.target.closest(`.${status}__${INNER_CLASSNAME}`)) {
      onMessageRemove();
    }
  }
  statusButtonElement.addEventListener('click', onMessageRemove);
  document.addEventListener('click', onOutsideClick);
};

const closeSuccessStatusMessage = (status) => {
  const statusMessage = document.querySelector(`.${status}`);
  const statusButtonElement = statusMessage.querySelector(`.${status}__${TAG_NAME}`);
  const onMessageRemove = () => {
    statusMessage.remove();
    document.removeEventListener('keydown', onDocumentKeyDown);
    document.removeEventListener('click', onOutsideClick);
  };
  function onDocumentKeyDown (evt){
    if (isEscapeKey(evt)) {
      onMessageRemove();
    }
  }
  function onOutsideClick (evt) {
    if (!evt.target.closest(`.${status}__${INNER_CLASSNAME}`)) {
      onMessageRemove();
    }
  }
  statusButtonElement.addEventListener('click', onMessageRemove);
  document.addEventListener('keydown', onDocumentKeyDown);
  document.addEventListener('click', onOutsideClick);
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
