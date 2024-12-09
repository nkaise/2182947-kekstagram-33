import {StatusOption,ALERT_SHOW_TIME,TAG_NAME,INNER_CLASSNAME} from './notification-modal-handler-data';
import {isEscapeKey} from './utils';

const closeErrorStatusMessageBtn = (status) => {
  const statusMessage = document.querySelector(`.${status}`);
  const statusButtonElement = statusMessage.querySelector(`.${status}__${TAG_NAME}`);
  const onStatusButtonClick = () => {
    statusMessage.remove();
    document.removeEventListener('click', onDocumentClick);
  };
  function onDocumentClick (evt) {
    if (!evt.target.closest(`.${status}__${INNER_CLASSNAME}`)) {
      onStatusButtonClick();
    }
  }
  statusButtonElement.addEventListener('click', onStatusButtonClick);
  document.addEventListener('click', onDocumentClick);
};

const closeSuccessStatusMessage = (status) => {
  const statusMessage = document.querySelector(`.${status}`);
  const statusButtonElement = statusMessage.querySelector(`.${status}__${TAG_NAME}`);
  const onStatusButtonClick = () => {
    statusMessage.remove();
    document.removeEventListener('keydown', onDocumentKeyDown);
    document.removeEventListener('click', onDocumentClick);
  };
  function onDocumentKeyDown (evt){
    if (isEscapeKey(evt)) {
      onStatusButtonClick();
    }
  }
  function onDocumentClick (evt) {
    if (!evt.target.closest(`.${status}__${INNER_CLASSNAME}`)) {
      onStatusButtonClick();
    }
  }
  statusButtonElement.addEventListener('click', onStatusButtonClick);
  document.addEventListener('keydown', onDocumentKeyDown);
  document.addEventListener('click', onDocumentClick);
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
