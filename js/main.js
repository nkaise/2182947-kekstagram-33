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
const DESCRIPTION_MIN_ID = 0;
const DESCRIPTION_MAX_ID = 9;
const MESSAGES_MIN_ID = 0;
const MESSAGES_MAX_ID = 5;
const NAMES_MIN_ID = 0;
const NAMES_MAX_ID = 9;
const SIMILAR_POST_DESCRIPTION_COUNT = 25;
let currentIdIndex = 0;
let currentUrlIndex = 0;
let currentCommentIndex = 0;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const createSimilarPost = (length, functionName) => Array.from({length: length}, functionName);

const createComment = () => ({
  id: `${++currentCommentIndex}`,
  avatar: `img/avatar-${getRandomInteger(AVATAR_MIN_ID,AVATAR_MAX_ID)}.svg`,
  message: MESSAGES[`${getRandomInteger(MESSAGES_MIN_ID,MESSAGES_MAX_ID)}`],
  name: NAMES[`${getRandomInteger(NAMES_MIN_ID,NAMES_MAX_ID)}`]
});

const comments = createSimilarPost((getRandomInteger(COMMENTS_MIN_AMOUNT,COMMENTS_MAX_AMOUNT)), createComment);

const createPhotoPost = () => ({
  id: `${++currentIdIndex}`,
  url: `photos/${++currentUrlIndex}.jpg`,
  description: DESCRIPTIONS[`${getRandomInteger(DESCRIPTION_MIN_ID,DESCRIPTION_MAX_ID)}`],
  likes: `${[getRandomInteger(LIKES_MIN_AMOUNT,LIKES_MAX_AMOUNT)]}`,
  comments
});

const similarPosts = createSimilarPost(SIMILAR_POST_DESCRIPTION_COUNT, createPhotoPost);

console.log(similarPosts);
