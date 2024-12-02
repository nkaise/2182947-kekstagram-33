import {BASE_URL,Route,METHOD_POST} from './api-data';

const getData = (onSuccess, onFail) => {
  fetch(`${BASE_URL}${Route.GET_DATA}`)
    .then((response) => response.json())
    .then((posts) => {
      onSuccess(posts);
    })
    .catch(() => {
      onFail();
    });
};

const sendData = ({onSuccess, onFail, onHandlerFinally, body}) => {
  fetch(
    `${BASE_URL}${Route.SEND_DATA}`,
    {
      method: METHOD_POST,
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
