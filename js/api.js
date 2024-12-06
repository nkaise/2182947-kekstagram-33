import {BASE_URL,Route,Methods} from './api-data';

const getData = async (onSuccess, onFail) => {
  try {
    const response = await fetch(`${BASE_URL}${Route.GET_DATA}`);
    if (!response.ok) {
      onFail();
      return;
    }
    if (response.ok) {
      const posts = await response.json();
      onSuccess(posts);
    }
  } catch (error) {
    onFail();
  }
};

const sendData = async ({onSuccess, onFail, onHandlerFinally, body}) => {
  try {
    const response = await fetch(`${BASE_URL}${Route.SEND_DATA}`, {
      method: Methods.POST,
      body,
    });
    if (!response.ok) {
      onFail();
      return;
    }
    if (response.ok) {
      onSuccess();
    }
  } catch (error) {
    onFail();
  } finally {
    onHandlerFinally();
  }
};

export {getData,sendData};
