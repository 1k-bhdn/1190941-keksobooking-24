import {disableForm} from './util.js';
import {adForm, adFormPrice} from './ad-form-validate.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const adFormCoords = document.querySelector('#address');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const avatarChooser = adForm.querySelector('input[name=avatar]');
const avatarPreview = adForm.querySelector('.ad-form-header__preview img');
const imagesContainer = adForm.querySelector('.ad-form__photo-container');
const imagesChooser = adForm.querySelector('input[name=images]');
const imagesPreviewContainer = adForm.querySelector('.ad-form__photo');

avatarChooser.addEventListener('change', () => {
  const file = avatarChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    avatarPreview.src = URL.createObjectURL(file);
  }
});

const validateImg = (files, index) => {
  let img;
  let newContainer;

  const fileName = files[index].name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    if (!imagesPreviewContainer.querySelector('img')) {
      img = document.createElement('img');
      img.width = 70;
      img.height = 70;
    } else {
      newContainer = imagesPreviewContainer.cloneNode(true);
      img = newContainer.querySelector('img');
    }

    img.src = URL.createObjectURL(files[index]);

    if (newContainer) {
      imagesContainer.appendChild(newContainer);
    } else {
      imagesPreviewContainer.appendChild(img);
    }
  }
};

imagesChooser.addEventListener('change', () => {
  const images = imagesChooser.files;

  if (images.length > 1) {
    for (let i = 0; i < images.length; i++) {
      validateImg(images, i);
    }
  } else {
    validateImg(images, 0);
  }
});

const resetAdFrom = () => {
  adForm.reset();
  adFormPrice.setAttribute('placeholder', '0');

  avatarPreview.src = 'img/muffin-grey.svg';

  if (imagesContainer.querySelectorAll('.ad-form__photo').length > 1) {
    imagesContainer.querySelectorAll('.ad-form__photo').forEach((element, i) => {
      i === 0 ? element.querySelector('img').remove() : element.remove();
    });
  }
};

const renderMessage = (tpl, message) => {
  const element = tpl.cloneNode(true);
  element.querySelector('p').textContent = message;

  document.body.appendChild(element);
};

const onSuccessMessageShown = () => {
  removeMessage();
};

const onMessageEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    removeMessage();
  }
};

const removeMessage = () => {
  document.body.lastChild.remove();

  document.removeEventListener('click', onSuccessMessageShown);
  document.removeEventListener('keydown', onMessageEscKeydown);
};

const setFormStatusOnSendSuccess = (resetFilterForm, resetMap, fullData, mainPin, map, pinGroup) => () => {
  renderMessage(successTemplate, 'Ваше объявление успешно размещено');
  adFormCoords.setAttribute('disabled', '');

  resetAdFrom();
  resetFilterForm();
  resetMap(mainPin, map, pinGroup, fullData);

  document.addEventListener('click', onSuccessMessageShown);
  document.addEventListener('keydown', onMessageEscKeydown);
};

const setFormStatusOnSendError = (message, errorFields = null) => {
  renderMessage(errorTemplate, message);
  adFormCoords.setAttribute('disabled', '');

  if (errorFields) {
    errorFields.forEach((current) => {
      document.querySelector(`[name=${current}]`).style.border = '2px solid red';
    });
  }

  document.addEventListener('click', onSuccessMessageShown);
  document.addEventListener('keydown', onMessageEscKeydown);
};

disableForm(adForm);

const setAdFormReset = (resetFilterForm, resetMap, mainPin, map, pinGroup, fullData = null) => {
  adForm.addEventListener('reset', () => {
    resetAdFrom();
    resetFilterForm();
    resetMap(mainPin, map, pinGroup, fullData);
  });
};

const setAdFormSubmit = (resetFilterForm, resetMap, sendData, mainPin, map, pinGroup, fullData = null) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    adFormCoords.removeAttribute('disabled');
    sendData(
      setFormStatusOnSendSuccess(resetFilterForm, resetMap, fullData, mainPin, map, pinGroup),
      setFormStatusOnSendError,
      new FormData(evt.target),
    );
  });
};

const setStartCoordsToAddressField = (START_COORDS) => {
  adFormCoords.defaultValue = `${START_COORDS.lat} ${START_COORDS.lng}`;
};

const setCoordsToAddressField = (coords) => {
  adFormCoords.value = `${(coords.lat).toFixed(5)} ${(coords.lng).toFixed(5)}`;
};

export {adForm, setAdFormReset, setAdFormSubmit, setStartCoordsToAddressField, setCoordsToAddressField};
