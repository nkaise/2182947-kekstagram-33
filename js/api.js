import {BASE_URL,Route} from './api-data';

const getData = (onSuccess, onFail) => {
  fetch(`${BASE_URL}${Route.GET_DATA}`)
    .then((response) => response.json())
    .then((posts) => {
      onSuccess(document.querySelector('.pictures'), posts);
    })
    .catch(() => {
      onFail();
    });
};

const sendData = (onSuccess, onFail, onHandlerFinally, body) => {
  fetch(
    `${BASE_URL}${Route.SEND_DATA}`,
    {
      method: 'POST',
      body,
    },
  ).then((response) => {
    if (response.ok) {
      onSuccess();
    } else {
      onFail();
    }
  })
    .catch(() => {
      onFail();
    })
    .finally(() => {
      onHandlerFinally();
    });
};

export {getData,sendData};
