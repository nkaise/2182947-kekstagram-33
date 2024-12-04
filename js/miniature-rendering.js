import {renderBigPicture} from './fullscreen-image-viewer';
import {filterPosts} from './posts-filter';
import {debounce} from './utils';
import {RERENDER_DELAY} from './miniature-rendering-data';

const filterElement = document.querySelector('.img-filters');
const filterFormElement = document.querySelector('.img-filters__form');
const similarPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');
const similarPhotoFragment = document.createDocumentFragment();

const registerFilterElementEvent = (dataForPosts) => {
  filterElement.classList.remove('img-filters--inactive');
  const debouncedFilterPosts = debounce((evt) => {
    filterPosts(evt, dataForPosts);
  }, RERENDER_DELAY);
  filterFormElement.addEventListener('click', debouncedFilterPosts);
};

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

export {renderPosts,registerFilterElementEvent};
