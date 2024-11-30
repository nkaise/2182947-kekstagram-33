import '../vendor/pristine/pristine.min.js';
import '../vendor/nouislider/nouislider.js';
import {openModalForm,closeUploadingForm} from './modal-opener';
import {setUploadFormSubmit} from './form-controller';
import {showDownloadErrorMessage} from './utils';
import {getData} from './api';
import {renderPosts} from './miniature-rendering';

openModalForm(document.querySelector('.img-upload__input'));
getData(
  (picturesContainer, posts) => renderPosts(picturesContainer, posts),
  () => showDownloadErrorMessage(),
);

setUploadFormSubmit(closeUploadingForm);
