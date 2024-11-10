import {similarPosts} from './generate-photo-data';
import {clearInnerElements, isEscapeKey} from './utils';

const bigPictureContainer = document.querySelector('.big-picture');
const socialCommentsContainer = document.querySelector('.social__comments');
const socialCommentElement = document.querySelector('.social__comment');
const similarCommentFragment = document.createDocumentFragment();
const bigPictureCloseElement = document.querySelector('#picture-cancel');
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

const renderPostComments = (idPicture) => {
  similarPosts.forEach(({comments}, id) => {
    if (idPicture === id) {
      comments.forEach((comment) => {
        const commentElement = socialCommentElement.cloneNode(true);
        commentElement.querySelector('.social__picture').src = comment.avatar;
        commentElement.querySelector('.social__text').alt = comment.name;
        commentElement.querySelector('.social__text').textContent = comment.message;
        similarCommentFragment.append(commentElement);
      });
    }
  });
};

const renderBigPicture = () => {
  const smallPicturesContainerList = document.querySelectorAll('.picture');
  smallPicturesContainerList.forEach((smallPicture, idPicture) => {
    smallPicture.addEventListener('click', () => {
      openBigPicture(bigPictureContainer, commentsCountElement, commentsLoaderElement, socialCommentsContainer);
      bigPictureElement.src = smallPicture.querySelector('.picture__img').src;
      likesCountElement.textContent = smallPicture.querySelector('.picture__likes').textContent;
      totalCommentsElement.textContent = smallPicture.querySelector('.picture__comments').textContent;
      photoDescriptionElement.textContent = smallPicture.querySelector('.picture__img').alt;
      clearInnerElements(socialCommentsContainer);
      renderPostComments(idPicture);
      socialCommentsContainer.append(similarCommentFragment);
    });
  });
};

export {renderBigPicture};
