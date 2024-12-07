import {ErrorStatus,ALERT_SHOW_TIME} from './notification-modal-handler-data';

const notificationModalHandler = (status) => {
  const statusMessageElement = document.querySelector(`.${status}`);
  const statusButtonElement = statusMessageElement.querySelector(`.${status}__button`);
  statusButtonElement.addEventListener('click', () => {
    statusMessageElement.remove();
  });
  document.addEventListener('keydown', (evt) => {
    if (evt.target.querySelector('section.error')) {
      statusMessageElement.remove();
    }
  });
  document.addEventListener('click', (evt) => {
    if (!evt.target.closest(`.${status}__inner`)) {
      statusMessageElement.remove();
    }
  });
};

const messagesHandler = (status) => {
  const messageUploadTemplate = document.querySelector(`#${status}`).content.querySelector(`.${status}`);
  const textMessage = messageUploadTemplate.cloneNode(true);
  const container = document.body;
  container.append(textMessage);
  if (status === ErrorStatus.DATA_ERROR_STATUS) {
    setTimeout(() => {
      textMessage.remove();
    }, ALERT_SHOW_TIME);
  }
  if (status === ErrorStatus.SUCCESS_STATUS || status === ErrorStatus.ERROR_STATUS) {
    notificationModalHandler(status);
  }
};

export {messagesHandler};
