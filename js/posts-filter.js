import {renderPosts} from './miniature-rendering';

const filterElement = document.querySelector('.img-filters');
const defaultFilterElement = filterElement.querySelector('#filter-default');
const randomFilterElement = filterElement.querySelector('#filter-random');
const filterDiscussedElement = filterElement.querySelector('#filter-discussed');

const changeFilters = (currentFilter) => {
  const activeButton = filterElement.querySelector('.img-filters__button--active');
  if (activeButton) {
    activeButton.classList.remove('img-filters__button--active');
  }
  currentFilter.classList.add('img-filters__button--active');
  const currentPictures = document.querySelectorAll('.picture');
  currentPictures.forEach((element) => element.remove());
};

const filterPosts = (evt, posts) => {
  const initialPostsList = posts;
  if (evt.target.closest(`#${randomFilterElement.id}`)) {
    changeFilters(randomFilterElement);
    const randomPosts = posts.toSorted(() => Math.random() - 0.5);
    renderPosts(document.querySelector('.pictures'), randomPosts.slice(0,10));
  }
  if (evt.target.closest(`#${defaultFilterElement.id}`)) {
    changeFilters(defaultFilterElement);
    renderPosts(document.querySelector('.pictures'), initialPostsList);
  }
  if (evt.target.closest(`#${filterDiscussedElement.id}`)) {
    changeFilters(filterDiscussedElement);
    renderPosts(document.querySelector('.pictures'), posts.toSorted((a, b) => b.comments.length - a.comments.length));
  }
};

export {filterPosts};
