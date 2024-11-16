import {clearInnerElements, isEscapeKey} from './utils';
import {COMMENTS_COUNT_STEP} from './photo-data';

const similarCommentFragment = document.createDocumentFragment();
const bigPictureContainer = document.querySelector('.big-picture');
const socialCommentsContainer = bigPictureContainer.querySelector('.social__comments');
const socialCommentElement = bigPictureContainer.querySelector('.social__comment');
const bigPictureCloseElement = bigPictureContainer.querySelector('#picture-cancel');
const bigPictureElement = bigPictureContainer.querySelector('.big-picture__img img');
const likesCountElement = bigPictureContainer.querySelector('.likes-count');
const totalCommentsElement = bigPictureContainer.querySelector('.social__comment-total-count');
const shownCommentsElement = bigPictureContainer.querySelector('.social__comment-shown-count');
const photoDescriptionElement = bigPictureContainer.querySelector('.social__caption');
const commentsCountElement = bigPictureContainer.querySelector('.social__comment-count');
const commentsLoaderElement = bigPictureContainer.querySelector('.comments-loader');
let currentComments = [];

const onBigPictureEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture(bigPictureContainer, socialCommentsContainer);
  }
};

function closeBigPicture (pictureContainer, commentsContainer) {
  pictureContainer.classList.add('hidden');
  clearInnerElements(commentsContainer);
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onBigPictureEscKeydown);
}

const createPostComments = (comment) => {
  const commentElement = socialCommentElement.cloneNode(true);
  commentElement.querySelector('.social__picture').src = comment.avatar;
  commentElement.querySelector('.social__text').alt = comment.name;
  commentElement.querySelector('.social__text').textContent = comment.message;
  similarCommentFragment.append(commentElement);
};

let totalComments = COMMENTS_COUNT_STEP;
const renderPostComments = () => {
  socialCommentsContainer.textContent = '';
  totalComments = totalComments > currentComments.length ? currentComments.length : totalComments;
  const showPartComments = currentComments.slice(0, totalComments);
  for (let i = 0; i < showPartComments.length; i++) {
    createPostComments(showPartComments[i]);
  }
  if (totalComments === currentComments.length) {
    commentsLoaderElement.classList.add('hidden');
  }
  socialCommentsContainer.append(similarCommentFragment);
  shownCommentsElement.textContent = totalComments;
};

commentsLoaderElement.addEventListener('click', () => {
  totalComments += 5;
  renderPostComments();
});

const openBigPicture = (pictureContainer) => {
  totalComments = COMMENTS_COUNT_STEP;
  pictureContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onBigPictureEscKeydown);
};

bigPictureCloseElement.addEventListener('click', () => {
  closeBigPicture(bigPictureContainer, socialCommentsContainer);
});

const dataForBigPicture = (data) => {
  bigPictureElement.src = data.url;
  likesCountElement.textContent = data.likes;
  totalCommentsElement.textContent = data.comments.length.toString();
  photoDescriptionElement.textContent = data.description;
};

const renderBigPicture = (smallPicture) => {
  currentComments = smallPicture.comments.slice();
  openBigPicture(bigPictureContainer, commentsCountElement);
  dataForBigPicture(smallPicture);
  clearInnerElements(socialCommentsContainer);
  renderPostComments();
};

export {renderBigPicture};
