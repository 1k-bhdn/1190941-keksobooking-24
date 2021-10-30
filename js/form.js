import {changeAttributes, setFieldDependence} from './util.js';

const BUNGALOW_MIN_COST = 0;
const FLAT_MIN_COST = 1000;
const HOTEL_MIN_COST = 3000;
const HOUSE_MIN_COST = 5000;
const PALACE_MIN_COST = 10000;

const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const adFormTitle = adForm.querySelector('#title');
const adFormTitleMinLength = adFormTitle.getAttribute('minlength');
const adFormPrice = adForm.querySelector('#price');
const adFormRoomNumber = adForm.querySelector('#room_number');
const adFormCapacity = adForm.querySelector('#capacity');
const adFormType = adForm.querySelector('#type');
const adFormTimeIn = adForm.querySelector('#timein');
const adFormTimeOut = adForm.querySelector('#timeout');

const disableForms = () => {
  [adForm, mapFilters].forEach((form) => {
    !form.classList.contains(`${form.classList[0]}--disabled`)
      ? form.classList.add(`${form.classList[0]}--disabled`) : null;

    form.querySelectorAll('fieldset, select').forEach((element) => {
      if (!element.hasAttribute('disabled')) {
        element.setAttribute('disabled','');
      }
    });
  });
};

disableForms();

const activateForms = () => {
  [adForm, mapFilters].forEach((form) => {
    form.classList.contains(`${form.classList[0]}--disabled`)
      ? form.classList.remove(`${form.classList[0]}--disabled`) : null;

    form.querySelectorAll('fieldset, select').forEach((element) => {
      if (element.hasAttribute('disabled')) {
        element.removeAttribute('disabled');
      }
    });
  });
};

adFormTitle.addEventListener('input', () => {
  const titleLength = adFormTitle.value.length;

  if (titleLength < adFormTitleMinLength) {
    adFormTitle.setCustomValidity(`Ещё ${adFormTitleMinLength - titleLength} симв.`);
  } else {
    adFormTitle.setCustomValidity('');
  }

  adFormTitle.reportValidity();
});

adFormPrice.addEventListener('blur', () => {
  const roomCost = adFormPrice.value;
  const roomType = adFormType.value;

  if (roomType === 'flat' && roomCost < FLAT_MIN_COST) {
    adFormPrice.setCustomValidity(`Минимальная цена для размещения в квартире на 1-ну ночь ${FLAT_MIN_COST} руб.`);
  } else if (roomType === 'hotel' && roomCost < HOTEL_MIN_COST) {
    adFormPrice.setCustomValidity(`Минимальная цена для размещения в отеле на 1-ну ночь ${HOTEL_MIN_COST} руб.`);
  } else if (roomType === 'house' && roomCost < HOUSE_MIN_COST) {
    adFormPrice.setCustomValidity(`Минимальная цена для размещения в доме на 1-ну ночь ${HOUSE_MIN_COST} руб.`);
  } else if (roomType === 'palace' && roomCost < PALACE_MIN_COST) {
    adFormPrice.setCustomValidity(`Минимальная цена для размещения в дворце на 1-ну ночь ${PALACE_MIN_COST} руб.`);
  } else {
    adFormPrice.setCustomValidity('');
  }

  adFormPrice.reportValidity();
});

const checkRoomsToCapacity = (field) => {
  const roomsCount = adFormRoomNumber.value;
  const roomCapacity = adFormCapacity.value;

  if (roomsCount === '1' && roomCapacity !== '1') {
    field.setCustomValidity('В 1-й комнате может разместиться только 1 гость.');
  } else if (roomsCount === '2' && roomCapacity !== '1' && roomCapacity !== '2') {
    field.setCustomValidity('2 комнаты предусматривают размещение до 2-х гостей.');
  } else if (roomsCount === '3' && roomCapacity === '0') {
    field.setCustomValidity('3 комнаты предусмотрены для размещения гостей, пожалуйста укажите количество.');
  } else if (roomsCount === '100' && roomCapacity !== '0') {
    field.setCustomValidity('100 комнат не для гостей.');
  } else {
    field.setCustomValidity('');
  }

  field.reportValidity();
};

adFormRoomNumber.addEventListener('change', () => {
  checkRoomsToCapacity(adFormRoomNumber);
});

adFormCapacity.addEventListener('change', () => {
  checkRoomsToCapacity(adFormCapacity);
});

adFormType.addEventListener('change', () => {
  const roomType = adFormType.value;

  if (roomType === 'bungalow') {
    changeAttributes(adFormPrice, String(BUNGALOW_MIN_COST), 'placeholder', 'min');
  } else if (roomType === 'flat') {
    changeAttributes(adFormPrice, String(FLAT_MIN_COST), 'placeholder', 'min');
  } else if (roomType === 'hotel') {
    changeAttributes(adFormPrice, String(HOTEL_MIN_COST), 'placeholder', 'min');
  } else if (roomType === 'house') {
    changeAttributes(adFormPrice, String(HOUSE_MIN_COST), 'placeholder', 'min');
  } else if (roomType === 'palace') {
    changeAttributes(adFormPrice, String(PALACE_MIN_COST), 'placeholder', 'min');
  }
});

adFormTimeIn.addEventListener('change', () => {
  setFieldDependence(adFormTimeIn, adFormTimeOut);
});

adFormTimeOut.addEventListener('change', () => {
  setFieldDependence(adFormTimeOut, adFormTimeIn);
});

export {activateForms};
