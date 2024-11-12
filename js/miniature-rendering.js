import {renderBigPicture} from './fullscreen-image-viewer';

const similarPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');
const similarPhotoFragment = document.createDocumentFragment();

const renderPosts = (container, dataForPosts) => {
  dataForPosts.forEach(({url, description, likes, comments}) => {
    const photoElement = similarPhotoTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = url;
    photoElement.querySelector('.picture__img').alt = description;
    photoElement.querySelector('.picture__likes').textContent = likes;
    photoElement.querySelector('.picture__comments').textContent = comments.length;
    photoElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      renderBigPicture({url, description, likes, comments});
    });
    similarPhotoFragment.append(photoElement);
  });
  container.append(similarPhotoFragment);
};

export {renderPosts};
