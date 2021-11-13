import {disableForm} from './util.js';
import {adForm, adFormPrice} from './ad-form-validate.js';

const adFormCoords = document.querySelector('#address');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

const resetAdFrom = () => {
  adForm.reset();
  adFormPrice.setAttribute('placeholder', '0');
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

  resetAdFrom();
  resetFilterForm();
  resetMap(fullData, mainPin, map, pinGroup);

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

const setAdFormReset = (resetFilterForm, resetMap, fullData, mainPin, map, pinGroup) => {
  adForm.addEventListener('reset', () => {
    resetAdFrom();
    resetFilterForm();
    resetMap(fullData, mainPin, map, pinGroup);
  });
};

const setAdFormSubmit = (resetFilterForm, resetMap, sendData, fullData, mainPin, map, pinGroup) => {
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
