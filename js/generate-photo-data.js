import {getRandomInteger, getRandomArrayElement, getUniqueValue} from './utils';
import {DESCRIPTIONS,MESSAGES,NAMES,LIKES_MIN_AMOUNT,LIKES_MAX_AMOUNT,COMMENTS_MIN_AMOUNT,COMMENTS_MAX_AMOUNT,AVATAR_MIN_ID,AVATAR_MAX_ID,SIMILAR_POST_DESCRIPTION_COUNT} from './photo-data';
const generateSimilarItems = (length, cb) => Array.from({length: length}, cb);

const getCommentId = getUniqueValue();
const getPostId = getUniqueValue();
const getPhotoId = getUniqueValue();

const createComment = () => {
  const commentId = getCommentId();
  return {
    id: commentId,
    avatar: `img/avatar-${getRandomInteger(AVATAR_MIN_ID,AVATAR_MAX_ID)}.svg`,
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(NAMES)
  };
};

const createPhotoPost = () => {
  const postId = getPostId();
  const photoId = getPhotoId();
  return {
    id: postId,
    url: `photos/${photoId}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: `${[getRandomInteger(LIKES_MIN_AMOUNT,LIKES_MAX_AMOUNT)]}`,
    comments: generateSimilarItems((getRandomInteger(COMMENTS_MIN_AMOUNT,COMMENTS_MAX_AMOUNT)), createComment)
  };
};

const similarPosts = generateSimilarItems(SIMILAR_POST_DESCRIPTION_COUNT, createPhotoPost);

export {similarPosts};
