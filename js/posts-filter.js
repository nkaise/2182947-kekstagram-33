import {renderPosts} from './miniature-rendering';
import {debounce} from './utils';
import {RERENDER_DELAY} from './miniature-rendering-data';

const picturesContainerElement = document.querySelector('.pictures');
const filterElement = document.querySelector('.img-filters');
const defaultFilterElement = filterElement.querySelector('#filter-default');
const randomFilterElement = filterElement.querySelector('#filter-random');
const filterDiscussedElement = filterElement.querySelector('#filter-discussed');

const changeFilters = (currentFilter) => {
  const activeButtonElement = filterElement.querySelector('.img-filters__button--active');
  if (activeButtonElement) {
    activeButtonElement.classList.remove('img-filters__button--active');
  }
  currentFilter.classList.add('img-filters__button--active');
};

const debouncedRenderPosts = debounce((postsToRender) => {
  const currentPicturesElement = document.querySelectorAll('.picture');
  currentPicturesElement.forEach((element) => element.remove());
  renderPosts(picturesContainerElement, postsToRender);
}, RERENDER_DELAY);

const filterPosts = (evt, posts) => {

  const initialPostsList = posts;
  if (evt.target.closest(`#${randomFilterElement.id}`)) {
    changeFilters(randomFilterElement);
    const randomPosts = posts.toSorted(() => Math.random() - 0.5).slice(0, 10);
    debouncedRenderPosts(randomPosts);
    return;
  }
  if (evt.target.closest(`#${defaultFilterElement.id}`)) {
    changeFilters(defaultFilterElement);
    debouncedRenderPosts(initialPostsList);
    return;
  }
  if (evt.target.closest(`#${filterDiscussedElement.id}`)) {
    changeFilters(filterDiscussedElement);
    const mostDiscussedPosts = posts.toSorted((a, b) => b.comments.length - a.comments.length);
    debouncedRenderPosts(mostDiscussedPosts);
  }
};

export {filterPosts};
