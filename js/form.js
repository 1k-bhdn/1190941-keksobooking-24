const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const adFormTitle = adForm.querySelector('#title');
const adFormTitleMinLength = adFormTitle.getAttribute('minlength');
const adFormPrice = adForm.querySelector('#price');
const adFormPriceMin = adFormPrice.getAttribute('min');
const adFormPriceMax = adFormPrice.getAttribute('max');
const adFormRoomNumber = adForm.querySelector('#room_number');
const adFormCapacity = adForm.querySelector('#capacity');

/**
 * @param form {Element} Форма из DOM
 * @return {undefined}
 */
const disableForm = (form) => {
  !form.classList.contains(`${form.classList[0]}--disabled`)
    ? form.classList.add(`${form.classList[0]}--disabled`) : null;

  form.querySelectorAll('fieldset, select').forEach((element) => {
    if (!element.hasAttribute('disabled')) {
      element.setAttribute('disabled','');
    }
  });
};

/**
 * @param form {Element} Форма из DOM
 * @return {undefined}
 */
const activateForm = (form) => {
  form.classList.contains(`${form.classList[0]}--disabled`)
    ? form.classList.remove(`${form.classList[0]}--disabled`) : null;

  form.querySelectorAll('fieldset, select').forEach((element) => {
    if (element.hasAttribute('disabled')) {
      element.removeAttribute('disabled');
    }
  });
};

disableForm(adForm);
disableForm(mapFilters);

document.querySelector('.promo').addEventListener('click', () => {
  activateForm(adForm);
  activateForm(mapFilters);
});

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
  if (adFormPrice.validity.rangeOverflow || adFormPrice.validity.rangeUnderflow) {
    adFormPrice.setCustomValidity(`Цена может быть в диапазоне от ${adFormPriceMin} до ${adFormPriceMax} руб.`);
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
