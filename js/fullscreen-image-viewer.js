import {clearInnerElements, isEscapeKey, toggleClassName} from './utils';
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
let totalComments = COMMENTS_COUNT_STEP;

const onBigPictureEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture(bigPictureContainer, socialCommentsContainer);
  }
};

function closeBigPicture (pictureContainer, commentsContainer) {
  toggleClassName(pictureContainer, 'hidden');
  clearInnerElements(commentsContainer);
  toggleClassName(document.body, 'modal-open');
  document.removeEventListener('keydown', onBigPictureEscKeydown);
  commentsLoaderElement.removeEventListener('click', loadMoreComments);
}

const createPostComments = (comment) => {
  const commentElement = socialCommentElement.cloneNode(true);
  commentElement.querySelector('.social__picture').src = comment.avatar;
  commentElement.querySelector('.social__text').alt = comment.name;
  commentElement.querySelector('.social__text').textContent = comment.message;
  similarCommentFragment.append(commentElement);
};

const renderPostComments = () => {
  commentsCountElement.classList.remove('hidden');
  commentsLoaderElement.classList.remove('hidden');
  socialCommentsContainer.textContent = '';
  totalComments = totalComments > currentComments.length ? currentComments.length : totalComments;
  const showPartComments = currentComments.slice(0, totalComments);
  for (let i = 0; i < showPartComments.length; i++) {
    createPostComments(showPartComments[i]);
  }
  if (totalComments === currentComments.length) {
    toggleClassName(commentsLoaderElement, 'hidden');
    commentsLoaderElement.classList.add('hidden');
  }
  socialCommentsContainer.append(similarCommentFragment);
  shownCommentsElement.textContent = totalComments;
  if (currentComments.length > 5) {
    commentsLoaderElement.addEventListener('click', loadMoreComments);
  }
};

function loadMoreComments() {
  totalComments += 5;
  renderPostComments();
}

const openBigPicture = (pictureContainer) => {
  totalComments = COMMENTS_COUNT_STEP;
  toggleClassName(pictureContainer, 'hidden');
  toggleClassName(document.body, 'modal-open');
  document.addEventListener('keydown', onBigPictureEscKeydown);
};

bigPictureCloseElement.addEventListener('click', () => {
  closeBigPicture(bigPictureContainer, socialCommentsContainer);
});

const renderDataForBigPicture = (data) => {
  bigPictureElement.src = data.url;
  likesCountElement.textContent = data.likes;
  totalCommentsElement.textContent = data.comments.length.toString();
  photoDescriptionElement.textContent = data.description;
};

const renderBigPicture = (smallPicture) => {
  currentComments = smallPicture.comments.slice();
  openBigPicture(bigPictureContainer);
  renderDataForBigPicture(smallPicture);
  clearInnerElements(socialCommentsContainer);
  if (currentComments.length !== 0) {
    renderPostComments();
  } else {
    commentsLoaderElement.classList.add('hidden');
    commentsCountElement.classList.add('hidden');
  }
};

export {renderBigPicture};
