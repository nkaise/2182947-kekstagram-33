const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const fileChooser = document.querySelector('#upload-file');
const preview = document.querySelector('.img-upload__preview img');
const effectPreview = document.querySelectorAll('.effects__preview');

const fileUploadingForm = () => {
  fileChooser.addEventListener('change', () => {
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
    if (matches) {
      const imageUrl = URL.createObjectURL(file);
      preview.src = imageUrl;
      effectPreview.forEach((photoPreview) => photoPreview.style.backgroundImage = `url("${imageUrl}")`);
    }
  });
};

export {fileUploadingForm};

