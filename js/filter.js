import {disableForm} from './util.js';

const mapFilters = document.querySelector('.map__filters');
const housingType = mapFilters.querySelector('#housing-type');
const housingPrice = mapFilters.querySelector('#housing-price');
const housingRooms = mapFilters.querySelector('#housing-rooms');
const housingGuests = mapFilters.querySelector('#housing-guests');
const housingFeatures = mapFilters.querySelector('#housing-features');
const filterCheckboxes = housingFeatures.querySelectorAll('input[type=checkbox]');

disableForm(mapFilters);

const setFilterFormChange = (renderPins, fullData, pinGroup) => {
  mapFilters.addEventListener('change', () => {
    const conditions = {};

    conditions.type = housingType.value;
    conditions.price = housingPrice.value;
    conditions.rooms = housingRooms.value === 'any' ? housingRooms.value : Number(housingRooms.value);
    conditions.guests = housingGuests.value === 'any' ? housingGuests.value : Number(housingGuests.value);
    conditions.features = [];

    Array.from(filterCheckboxes).filter((checkbox) => checkbox.checked).forEach((checkbox) => {
      conditions.features.push(checkbox.defaultValue);
    });

    renderPins(fullData.slice().filter((data) => {
      let isNecessary = true;

      Object.keys(conditions).forEach((key) => {
        if (conditions[key] !== 'any' && key !== 'features' && key !== 'price' && data.offer[key] !== conditions[key]) {
          isNecessary = false;
        }

        if (key === 'price' && conditions[key] === 'low' && data.offer.price >= 10000) {
          isNecessary = false;
        } else if (key === 'price' && conditions[key] === 'middle' && data.offer.price < 10000 || data.offer.price > 50000) {
          isNecessary = false;
        } else if (key === 'price' && conditions[key] === 'high' && data.offer.price < 50000) {
          isNecessary = false;
        }

        if (key === 'features'
          && conditions[key].length > 0
          && data.offer.features
          && !conditions[key].every((current) => data.offer.features.includes(current))
          || !data.offer.features
        ) {
          isNecessary = false;
        }
      });

      return isNecessary;
    }), pinGroup);
  });
};

const resetFilterForm = () => {
  mapFilters.reset();
};

export {mapFilters, setFilterFormChange, resetFilterForm};
