import {renderPosts} from './miniature-rendering';
import {similarPosts} from './generate-photo-data';

renderPosts(document.querySelector('.pictures'), similarPosts);
