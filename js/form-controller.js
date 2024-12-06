import {isEscapeKey,stopPropagation} from './utils';
import {messagesHandler} from './notification-modal-handler';
import {sendData} from './api';
import {VALID_HASHTAG,ErrorMessage,ZERO_LENGTH,MAX_HASHTAGS_LIST,SubmitButtonText,MAX_COMMENT_LENGTH} from './form-controller-data';

const uploadImageFormElement = document.querySelector('#upload-select-image');
const hashtagElement = uploadImageFormElement.querySelector('.text__hashtags');
const commentFieldElement = uploadImageFormElement.querySelector('.text__description');
const submitButtonElement = uploadImageFormElement.querySelector('#upload-submit');
let errorValidationMessageHashtag = '';

const pristine = new Pristine(uploadImageFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = `${SubmitButtonText.SENDING}`;
};

const unBlockSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = `${SubmitButtonText.IDLE}`;
};

const fetchHashtagErrorMessage = () => errorValidationMessageHashtag || ErrorMessage.ERROR_VALIDATION_MESSAGE_HASHTAG_DEFAULT;

const validateHashtagField = () => {
  const inputValue = hashtagElement.value.trim().toLowerCase();
  if (inputValue.length === ZERO_LENGTH) {
    return true;
  }
  const hashtags = inputValue.split(/\s+/);
  const isDuplicates = hashtags.filter((hashtag, index, arrayHashtags) => arrayHashtags.indexOf(hashtag) !== index);
  errorValidationMessageHashtag = '';
  if (hashtags.length > MAX_HASHTAGS_LIST) {
    errorValidationMessageHashtag = ErrorMessage.ERROR_VALIDATION_MESSAGE_HASHTAG_EXCEEDED;
    return false;
  }
  if (isDuplicates.length !== ZERO_LENGTH) {
    errorValidationMessageHashtag = ErrorMessage.ERROR_VALIDATION_MESSAGE_HASHTAG_DUPLICATE;
    return false;
  }
  return hashtags.every((hashtag) => VALID_HASHTAG.test(hashtag));
};

const validateCommentField = () => commentFieldElement.value.length < MAX_COMMENT_LENGTH;

pristine.addValidator(hashtagElement, validateHashtagField, fetchHashtagErrorMessage);
pristine.addValidator(commentFieldElement, validateCommentField, ErrorMessage.ERROR_VALIDATION_MESSAGE_COMMENT);

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

const setUploadFormSubmit = (closeForm) => {
  uploadImageFormElement.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      const formData = new FormData(evt.target);
      await sendData({
        onSuccess: () => {
          messagesHandler('success');
          closeForm();
        },
        onFail: () => {
          messagesHandler('error');
        },
        onHandlerFinally: () => {
          unBlockSubmitButton();
        },
        body: formData
      });
    }
  });
};

export {pristine,setUploadFormSubmit};
