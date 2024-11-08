import {similarPosts} from './generate-photo-data';

const similarPhotos = similarPosts;

const renderBigPicture = () => {
  document.addEventListener('DOMContentLoaded', () => {
    const bigPicture = document.querySelector('.big-picture'); // блок с содержимым большой картинки
    const picturesContainer = document.querySelectorAll('.picture'); // миниатюрные картинки массив
    const socialBlockComment = document.querySelector('.social__comments'); // блок с комментами
    const socialElementComment = document.querySelector('.social__comment'); // элемент блока с комментами
    const similarCommentFragment = document.createDocumentFragment();
    const bigPictureClose = document.querySelector('#picture-cancel');

    const clearInnerElements = (block) => {
      block.textContent = '';
    };

    bigPictureClose.addEventListener('click', () => {
      bigPicture.classList.add('hidden');
      clearInnerElements(socialBlockComment);
      document.body.classList.remove('modal-open');
    });

    document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        bigPicture.classList.add('hidden');
        clearInnerElements(socialBlockComment);
        document.body.classList.remove('modal-open');
      }
    });

    const renderPostComments = (idPhoto) => {
      similarPhotos.forEach(({comments}, id) => {
        if (idPhoto === id) {
          comments.forEach((comment) => {
            const commentElement = socialElementComment.cloneNode(true);
            commentElement.querySelector('.social__picture').src = comment.avatar;
            commentElement.querySelector('.social__text').alt = comment.name;
            commentElement.querySelector('.social__text').textContent = comment.message;
            similarCommentFragment.append(commentElement);
          });
        }
      });
    };

    picturesContainer.forEach((picture, idPhoto) => {
      picture.addEventListener('click', () => { // отслеживаем клик на миниатюрку
        bigPicture.classList.remove('hidden'); // удаляем класс чтобы было видно большую картинку
        const bigPictureBlock = bigPicture.querySelector('.big-picture__img'); // находим div где лежит тег img
        const bigPictureImage = bigPictureBlock.querySelector('img'); // внутри этого div находим нужный нам img
        bigPictureImage.src = picture.querySelector('.picture__img').src; // меняем src на src соответствующей миниматюрки

        const likesCount = bigPicture.querySelector('.likes-count'); // находим внутри блока с большой картинкой элемент с лайками
        likesCount.textContent = picture.querySelector('.picture__likes').textContent; // меняем количество лайков на соответствующие миниматюре

        const totalComments = bigPicture.querySelector('.social__comment-total-count'); // общее число комментов
        totalComments.textContent = picture.querySelector('.picture__comments').textContent;


        const photoDescription = bigPicture.querySelector('.social__caption'); // описание фотограции
        photoDescription.textContent = picture.querySelector('.picture__img').alt;

        // скрываем блоки временно
        const commentsCount = bigPicture.querySelector('.social__comment-count');
        const commentsLoader = bigPicture.querySelector('.comments-loader');
        commentsCount.classList.add('hidden');
        commentsLoader.classList.add('hidden');
        // конец скрываемых блоков

        document.body.classList.add('modal-open'); // чтобы контейнер с фотографиями позади не прокручивался при скролле

        clearInnerElements(socialBlockComment); // очищаем блок чтобы не было двух дефолтных комментов
        renderPostComments(idPhoto);
        socialBlockComment.append(similarCommentFragment);
      });
    });
  });
};

export {renderBigPicture};
