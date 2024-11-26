import {isEscapeKey,stopPropagation} from './utils';
import {MAX_COMMENT_LENGTH} from './photo-data';
import {VALID_HASHTAG,ERROR_VALIDATION_MESSAGE_COMMENT,ERROR_VALIDATION_MESSAGE_HASHTAG_DEFAULT,ERROR_VALIDATION_MESSAGE_HASHTAG_EXCEEDED,ERROR_VALIDATION_MESSAGE_HASHTAG_DUPLICATE,ZERO_LENGTH,MAX_HASHTAGS_LIST} from './form-controller-data';

const uploadImageForm = document.querySelector('#upload-select-image');
const hashtagElement = uploadImageForm.querySelector('.text__hashtags');
const commentFieldElement = uploadImageForm.querySelector('.text__description');
let errorValidationMessageHashtag = '';

const pristine = new Pristine(uploadImageForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const errorValidationHashtag = () => errorValidationMessageHashtag || ERROR_VALIDATION_MESSAGE_HASHTAG_DEFAULT;

const validateHashtagField = () => {
  const inputValue = hashtagElement.value.trim().toLowerCase();
  if (inputValue.length === ZERO_LENGTH) {
    return true;
  }
  const hashtags = inputValue.split(/\s+/);
  const isDuplicates = hashtags.filter((hashtag, index, arrayHashtags) => arrayHashtags.indexOf(hashtag) !== index);
  errorValidationMessageHashtag = '';
  if (hashtags.length > MAX_HASHTAGS_LIST) {
    errorValidationMessageHashtag = ERROR_VALIDATION_MESSAGE_HASHTAG_EXCEEDED;
    return false;
  }
  if (isDuplicates.length !== ZERO_LENGTH) {
    errorValidationMessageHashtag = ERROR_VALIDATION_MESSAGE_HASHTAG_DUPLICATE;
    return false;
  }
  return hashtags.every((hashtag) => VALID_HASHTAG.test(hashtag));
};

const validateCommentField = () => commentFieldElement.value.length < MAX_COMMENT_LENGTH;

pristine.addValidator(hashtagElement, validateHashtagField, errorValidationHashtag);
pristine.addValidator(commentFieldElement, validateCommentField, ERROR_VALIDATION_MESSAGE_COMMENT);

hashtagElement.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    stopPropagation(evt);
  }
});

commentFieldElement.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    stopPropagation(evt);
  }
});

const uploadFormData = () => {
  uploadImageForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      uploadImageForm.submit();
    }
  });
};

export {uploadFormData};
