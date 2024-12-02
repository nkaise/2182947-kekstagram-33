import '../vendor/pristine/pristine.min.js';
import '../vendor/nouislider/nouislider.js';
import {openModalForm,closeUploadingForm} from './modal-handler';
import {setUploadFormSubmit} from './form-controller';
import {messagesHandler} from './notification-modal-handler';
import {getData} from './api';
import {renderPosts,registerFilterElementEvent} from './miniature-rendering';
import {filterPosts} from './posts-filter';
import {debounce} from './utils';
import {fileUploadingForm} from './upload-personal-photo';

openModalForm(document.querySelector('.img-upload__input'));
getData(
  (posts) => {
    renderPosts(document.querySelector('.pictures'), posts);
    registerFilterElementEvent(posts);
    fileUploadingForm();
  },
  () => messagesHandler('data-error'),
);

setUploadFormSubmit(closeUploadingForm);
