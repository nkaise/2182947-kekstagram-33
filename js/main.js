import '../vendor/pristine/pristine.min.js';
import '../vendor/nouislider/nouislider.js';
import {openModalForm,onCancelUploadButtonClick} from './modal-handler';
import {setUploadFormSubmit} from './form-controller';
import {getData} from './api';
import {renderPosts,registerFilterElementEvent} from './miniature-rendering';
import {fileUploadForm} from './upload-personal-photo';
import {showStatusMessage} from './notification-modal-handler';
import {StatusOption} from './notification-modal-handler-data';

openModalForm(document.querySelector('.img-upload__input'));
await getData(
  (posts) => {
    renderPosts(document.querySelector('.pictures'), posts);
    registerFilterElementEvent(posts);
  },
  () => showStatusMessage(`${StatusOption.DATA_ERROR_STATUS}`)
);
fileUploadForm();
setUploadFormSubmit(onCancelUploadButtonClick);
