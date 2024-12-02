import '../vendor/pristine/pristine.min.js';
import '../vendor/nouislider/nouislider.js';
import {openModalForm,closeUploadingForm} from './modal-handler';
import {setUploadFormSubmit} from './form-controller';
import {messagesHandler} from './notification-modal-handler';
import {getData} from './api';
import {renderPosts} from './miniature-rendering';

openModalForm(document.querySelector('.img-upload__input'));
getData(
  (picturesContainer, posts) => renderPosts(picturesContainer, posts),
  () => messagesHandler('data-error'),
);

setUploadFormSubmit(closeUploadingForm);
