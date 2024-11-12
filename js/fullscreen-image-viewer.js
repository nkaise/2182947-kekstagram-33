import {clearInnerElements, isEscapeKey} from './utils';

const similarCommentFragment = document.createDocumentFragment();
const bigPictureContainer = document.querySelector('.big-picture');
const socialCommentsContainer = bigPictureContainer.querySelector('.social__comments');
const socialCommentElement = bigPictureContainer.querySelector('.social__comment');
const bigPictureCloseElement = bigPictureContainer.querySelector('#picture-cancel');
const bigPictureElement = bigPictureContainer.querySelector('.big-picture__img img');
const likesCountElement = bigPictureContainer.querySelector('.likes-count');
const totalCommentsElement = bigPictureContainer.querySelector('.social__comment-total-count');
const photoDescriptionElement = bigPictureContainer.querySelector('.social__caption');
const commentsCountElement = bigPictureContainer.querySelector('.social__comment-count');
const commentsLoaderElement = bigPictureContainer.querySelector('.comments-loader');

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

const openBigPicture = (pictureContainer, commentsAmount, commentsLoaderButton) => {
  pictureContainer.classList.remove('hidden');
  commentsAmount.classList.add('hidden');
  commentsLoaderButton.classList.add('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onBigPictureEscKeydown);
};

bigPictureCloseElement.addEventListener('click', () => {
  closeBigPicture(bigPictureContainer, socialCommentsContainer);
});

const renderPostComments = (comments) => {
  comments.forEach((comment) => {
    const commentElement = socialCommentElement.cloneNode(true);
    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__text').alt = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;
    similarCommentFragment.append(commentElement);
  });
};

const renderBigPicture = (smallPicture) => {
  openBigPicture(bigPictureContainer, commentsCountElement, commentsLoaderElement, socialCommentsContainer);
  bigPictureElement.src = smallPicture.url;
  likesCountElement.textContent = smallPicture.likes;
  totalCommentsElement.textContent = smallPicture.comments.length.toString();
  photoDescriptionElement.textContent = smallPicture.description;
  clearInnerElements(socialCommentsContainer);
  renderPostComments(smallPicture.comments);
  socialCommentsContainer.append(similarCommentFragment);
};

export {renderBigPicture};
