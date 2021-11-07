import {disableForm} from './util.js';

const mapFilters = document.querySelector('.map__filters');
const housingType = mapFilters.querySelector('#housing-type');
const housingPrice = mapFilters.querySelector('#housing-price');
const housingRooms = mapFilters.querySelector('#housing-rooms');
const housingGuests = mapFilters.querySelector('#housing-guests');
const housingFeatures = mapFilters.querySelector('#housing-features');
const filterCheckboxes = housingFeatures.querySelectorAll('input[type=checkbox]');

disableForm(mapFilters);

const setFilterFormChange = (renderPins, fullData) => {
  mapFilters.addEventListener('change', () => {
    let filteredData = fullData.slice();

    if (housingType.value !== 'any') {
      filteredData = filteredData.filter((data) => data.offer.type === housingType.value);
    }

    if (housingPrice.value !== 'any') {
      if (housingPrice.value === 'low') {
        filteredData = filteredData.filter((data) => data.offer.price < 10000);
      }

      if (housingPrice.value === 'middle') {
        filteredData = filteredData.filter((data) => data.offer.price >= 10000 && data.offer.price < 50000);
      }

      if (housingPrice.value === 'high') {
        filteredData = filteredData.filter((data) => data.offer.price > 50000);
      }
    }

    if (housingRooms.value !== 'any') {
      filteredData = filteredData.filter((data) => data.offer.rooms === Number(housingRooms.value));
    }

    if (housingGuests.value !== 'any') {
      filteredData = filteredData.filter((data) => data.offer.guests === Number(housingGuests.value));
    }

    const checkedCheckboxValues = [];

    Array.from(filterCheckboxes).filter((checkbox) => checkbox.checked).forEach((checkbox) => {
      checkedCheckboxValues.push(checkbox.defaultValue);
    });

    if (checkedCheckboxValues.length > 0) {
      filteredData = filteredData.filter((data) => {
        if (data.offer.features) {
          return checkedCheckboxValues.every((current) => data.offer.features.includes(current));
        }
      });
    }

    renderPins(filteredData);
  });
};

const resetFilterForm = () => {
  mapFilters.reset();
};

export {mapFilters, setFilterFormChange, resetFilterForm};
