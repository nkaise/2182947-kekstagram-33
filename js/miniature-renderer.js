import {similarPosts} from './generate-photo-data';

const similarPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');
const similarPhotos = similarPosts;
const similarPhotoFragment = document.createDocumentFragment();

similarPhotos.forEach(({url, description, likes, comments}) => {
  const photoElement = similarPhotoTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').src = url;
  photoElement.querySelector('.picture__img').alt = description;
  photoElement.querySelector('.picture__likes').textContent = likes;
  photoElement.querySelector('.picture__comments').textContent = comments.length;
  similarPhotoFragment.append(photoElement);
});

picturesContainer.append(similarPhotoFragment);

export {picturesContainer};
