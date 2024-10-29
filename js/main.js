const DESCRIPTION = [
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
const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const NAMES = [
  'Александр',
  'Екатерина',
  'Дмитрий',
  'Анна',
  'Сергей',
  'Ольга',
  'Михаил',
  'Мария',
  'Илья',
  'Наталья'
];
let currentIdIndex = -1;
let currentUrlIndex = -1;
let currentCommentIndex = -1;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const checkForDuplicateIds = (min, max) => {
  const idArray = [];
  const generateId = () => {
    const id = getRandomInteger(min, max);
    if (!idArray.includes(id)) {
      idArray.push(id);
    }
  };
  while (idArray.length !== max) {
    generateId(min, max);
  }
  return idArray;
};

const idsArray = checkForDuplicateIds(1,25);
const urlsArray = checkForDuplicateIds(1,25);
const commentsArray = checkForDuplicateIds(1,1000);

const createPhotoPost = () => ({
  id: `${idsArray[currentIdIndex++]}`,
  url: `photos/${urlsArray[currentUrlIndex++]}.jpg`,
  description: DESCRIPTION[`${getRandomInteger(0,9)}`],
  likes: `${[getRandomInteger(15,200)]}`,
  comments: [{
    id: `${commentsArray[currentCommentIndex++]}`,
    avatar: `img/avatar-${getRandomInteger(1,6)}.svg`,
    message: MESSAGE[`${getRandomInteger(0,5)}`],
    name: NAMES[`${getRandomInteger(0,9)}`]
  }]
});

createPhotoPost();

const similarWizards = Array.from({length: 25}, createPhotoPost);

console.log(similarWizards);
