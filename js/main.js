import '../vendor/pristine/pristine.min.js';
import {renderPosts} from './miniature-rendering';
import {similarPosts} from './generate-photo-data';
import {openModalForm} from './modal-opener';
import {uploadFormData} from './form-controller';

renderPosts(document.querySelector('.pictures'), similarPosts);
openModalForm(document.querySelector('.img-upload__input'));
uploadFormData();
