import {clearInnerElements,isEscapeKey,toggleClassName} from './utils';
import {COMMENT_COUNT_STEP} from './fullscreen-image-viewer-data';

const similarCommentFragment = document.createDocumentFragment();
const bigPictureContainerElement = document.querySelector('.big-picture');
const socialCommentContainerElement = bigPictureContainerElement.querySelector('.social__comments');
const socialCommentElement = bigPictureContainerElement.querySelector('.social__comment');
const bigPictureCloseElement = bigPictureContainerElement.querySelector('#picture-cancel');
const bigPictureElement = bigPictureContainerElement.querySelector('.big-picture__img img');
const likeCountElement = bigPictureContainerElement.querySelector('.likes-count');
const totalCommentElement = bigPictureContainerElement.querySelector('.social__comment-total-count');
const shownCommentElement = bigPictureContainerElement.querySelector('.social__comment-shown-count');
const photoDescriptionElement = bigPictureContainerElement.querySelector('.social__caption');
const commentCountElement = bigPictureContainerElement.querySelector('.social__comment-count');
const commentLoaderElement = bigPictureContainerElement.querySelector('.comments-loader');
let currentComments = [];
let shownComment = COMMENT_COUNT_STEP;

const onBigPictureEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture(bigPictureContainerElement, socialCommentContainerElement);
  }
};

function closeBigPicture (pictureContainer, commentsContainer) {
  toggleClassName(pictureContainer, 'hidden');
  clearInnerElements(commentsContainer);
  toggleClassName(document.body, 'modal-open');
  document.removeEventListener('keydown', onBigPictureEscKeydown);
  commentLoaderElement.removeEventListener('click', loadMoreComments);
}

const createPostComments = (comment) => {
  const commentElement = socialCommentElement.cloneNode(true);
  commentElement.querySelector('.social__picture').src = comment.avatar;
  commentElement.querySelector('.social__picture').alt = comment.name;
  commentElement.querySelector('.social__text').alt = comment.name;
  commentElement.querySelector('.social__text').textContent = comment.message;
  similarCommentFragment.append(commentElement);
};

const renderPostComments = () => {
  commentCountElement.classList.remove('hidden');
  commentLoaderElement.classList.remove('hidden');
  socialCommentContainerElement.textContent = '';
  shownComment = shownComment > currentComments.length ? currentComments.length : shownComment;
  const showPartComments = currentComments.slice(0, shownComment);
  for (let i = 0; i < showPartComments.length; i++) {
    createPostComments(showPartComments[i]);
  }
  if (shownComment === currentComments.length) {
    toggleClassName(commentLoaderElement, 'hidden');
    commentLoaderElement.classList.add('hidden');
  }
  socialCommentContainerElement.append(similarCommentFragment);
  shownCommentElement.textContent = shownComment;
  if (currentComments.length > 5) {
    commentLoaderElement.addEventListener('click', loadMoreComments);
  }
};

function loadMoreComments() {
  shownComment += COMMENT_COUNT_STEP;
  renderPostComments();
}

const openBigPicture = (pictureContainer) => {
  shownComment = COMMENT_COUNT_STEP;
  toggleClassName(pictureContainer, 'hidden');
  toggleClassName(document.body, 'modal-open');
  document.addEventListener('keydown', onBigPictureEscKeydown);
};

bigPictureCloseElement.addEventListener('click', () => {
  closeBigPicture(bigPictureContainerElement, socialCommentContainerElement);
});

const renderDataForBigPicture = (data) => {
  bigPictureElement.src = data.url;
  likeCountElement.textContent = data.likes;
  totalCommentElement.textContent = data.comments.length.toString();
  photoDescriptionElement.textContent = data.description;
};

const renderBigPicture = (smallPicture) => {
  currentComments = smallPicture.comments.slice();
  openBigPicture(bigPictureContainerElement);
  renderDataForBigPicture(smallPicture);
  clearInnerElements(socialCommentContainerElement);
  if (currentComments.length !== 0) {
    renderPostComments();
  } else {
    commentLoaderElement.classList.add('hidden');
    commentCountElement.classList.add('hidden');
  }
};

export {renderBigPicture};
