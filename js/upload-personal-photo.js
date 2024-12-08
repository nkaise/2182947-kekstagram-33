import {FILE_TYPES} from './upload-personal-photo-data';

const fileChooserElement = document.querySelector('#upload-file');
const previewElement = document.querySelector('.img-upload__preview img');
const effectsPreviewElement = document.querySelectorAll('.effects__preview');

const fileUploadForm = () => {
  fileChooserElement.addEventListener('change', () => {
    const file = fileChooserElement.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
    if (matches) {
      const imageUrl = URL.createObjectURL(file);
      previewElement.src = imageUrl;
      effectsPreviewElement.forEach((photoPreview) => {
        photoPreview.style.backgroundImage = `url("${imageUrl}")`;
      });
    }
  });
};

export {fileUploadForm};
