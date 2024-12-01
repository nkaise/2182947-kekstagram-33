const errorsMessage = {
  ERROR_VALIDATION_MESSAGE_COMMENT: 'Длина комментария больше 140 символов',
  ERROR_VALIDATION_MESSAGE_HASHTAG_DEFAULT: 'Введён невалидный хэштег',
  ERROR_VALIDATION_MESSAGE_HASHTAG_EXCEEDED: 'Превышено количество хэштегов',
  ERROR_VALIDATION_MESSAGE_HASHTAG_DUPLICATE: 'Хэштеги повторяются'
};
const VALID_HASHTAG = /^#[a-zа-яё0-9]{1,19}$/i;
const ZERO_LENGTH = 0;
const MAX_HASHTAGS_LIST = 5;
const MAX_COMMENT_LENGTH = 140;
const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Опубликовываю...'
};

export {errorsMessage,VALID_HASHTAG,ZERO_LENGTH,MAX_HASHTAGS_LIST,SubmitButtonText,MAX_COMMENT_LENGTH};
