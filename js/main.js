import {renderPosts} from './miniature-rendering';
import {similarPosts} from './generate-photo-data';
import {renderBigPicture} from './fullscreen-image-viewer';

renderPosts(document.querySelector('.pictures'), similarPosts);
renderBigPicture();
