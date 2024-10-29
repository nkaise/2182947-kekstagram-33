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
let currentIdIndex = -1;
let currentUrlIndex = -1;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const checkForDuplicateIds = () => {
  const idsArray = [];
  const generateId = (a, b) => {
    const id = getRandomInteger(1, 25);
    if (!idsArray.includes(id)) {
      idsArray.push(id);
    }
  };
  while (idsArray.length !== 25) {
    generateId(1, 25);
  }
  return idsArray;
};

const idArray = checkForDuplicateIds();
const urlArray = checkForDuplicateIds();

const createPhotoPost = () => ({
  id: `${idArray[currentIdIndex++]}`,
  url: `photos/${urlArray[currentUrlIndex++]}.jpg`,
  description: DESCRIPTION[`${getRandomInteger(0,9)}`],
  likes: `${[getRandomInteger(15,200)]}`
});

createPhotoPost();

const similarWizards = Array.from({length: 25}, createPhotoPost);
