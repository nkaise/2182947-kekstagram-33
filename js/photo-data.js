const DESCRIPTIONS = [
  'Закатное небо над тихим океаном.',
  'Горный пейзаж, скрытый утренним туманом.',
  'Солнечные лучи сквозь осенние листья.',
  'Уютное кафе с горячим кофе.',
  'Заснеженная тропа среди хвойных деревьев.',
  'Городские огни ночью из высоты.',
  'Романтичный мост под дождём вечером.',
  'Поле цветов под ярким солнцем.',
  'Дети играют на пляже у воды.',
  'Пустыня с одиноким кактусом на закате.'
];
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const NAMES = [
  'Иван',
  'Матвей',
  'Дмитрий',
  'Анна',
  'Сергей',
  'Оксана',
  'Михаил',
  'Мария',
  'Илья',
  'Наталья'
];
const LIKES_MIN_AMOUNT = 15;
const LIKES_MAX_AMOUNT = 200;
const COMMENTS_MIN_AMOUNT = 0;
const COMMENTS_MAX_AMOUNT = 30;
const AVATAR_MIN_ID = 1;
const AVATAR_MAX_ID = 6;
const SIMILAR_POST_DESCRIPTION_COUNT = 25;
const COMMENTS_COUNT_STEP = 5;
const MAX_COMMENT_LENGTH = 140;
const ERROR_VALIDATION_MESSAGE_COMMENT = 'Длина комментария больше 140 символов';
const ERROR_VALIDATION_MESSAGE_HASHTAG_DEFAULT = 'Введён невалидный хэштег';
const ERROR_VALIDATION_MESSAGE_HASHTAG_EXCEEDED = 'Превышено количество хэштегов';
const ERROR_VALIDATION_MESSAGE_HASHTAG_DUPLICATE = 'Хэштеги повторяются';
const VALID_HASHTAG = /^#[a-zа-яё0-9]{1,19}$/i;

export {DESCRIPTIONS,MESSAGES,NAMES,LIKES_MIN_AMOUNT,LIKES_MAX_AMOUNT,COMMENTS_MIN_AMOUNT,COMMENTS_MAX_AMOUNT,AVATAR_MIN_ID,AVATAR_MAX_ID,SIMILAR_POST_DESCRIPTION_COUNT,COMMENTS_COUNT_STEP,MAX_COMMENT_LENGTH,ERROR_VALIDATION_MESSAGE_COMMENT,ERROR_VALIDATION_MESSAGE_HASHTAG_DEFAULT,ERROR_VALIDATION_MESSAGE_HASHTAG_EXCEEDED,ERROR_VALIDATION_MESSAGE_HASHTAG_DUPLICATE,VALID_HASHTAG};
