import {activateForms} from './form.js';
import {generateAdData} from './data.js';
import {createAd} from './card.js';

const ADS_COUNT = 20;
const dataArr = [];
const offerTemplate = document.querySelector('#card').content.querySelector('.popup');
const mapFilters = document.querySelector('.map__filters');
const housingType = mapFilters.querySelector('#housing-type');
const housingPrice = mapFilters.querySelector('#housing-price');
const housingRooms = mapFilters.querySelector('#housing-rooms');
const housingGuests = mapFilters.querySelector('#housing-guests');
const housingFeatures = mapFilters.querySelector('#housing-features');
const filterCheckboxes = housingFeatures.querySelectorAll('input[type=checkbox]');

const START_COORDS = {
  lat: 35.68950,
  lng: 139.69171,
};

for (let i = 0; i < ADS_COUNT; i++) {
  dataArr.push(generateAdData(i + 1));
}

const map = L.map('map-canvas')
  .on('load', () => {
    activateForms();
  })
  .setView(START_COORDS, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const pinGroup = L.layerGroup().addTo(map);

const createPin = (data) => {
  const pinIcon = L.icon({
    iconUrl: '/img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const marker = L.marker(
    {
      lat: data.location.lat,
      lng: data.location.lng,
    },
    {
      icon: pinIcon,
    },
  );

  marker
    .addTo(pinGroup)
    .bindPopup(createAd(data, offerTemplate));
};

dataArr.forEach((data) => {
  createPin(data);
});

const mainPinIcon = L.icon({
  iconUrl: '/img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPin = L.marker(
  START_COORDS,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPin.addTo(map);

const adFormCoords = document.querySelector('#address');
adFormCoords.value = `${START_COORDS.lat} ${START_COORDS.lng}`;

mainPin.on('moveend', (evt) => {
  const coords = evt.target.getLatLng();

  adFormCoords.value = `${(coords.lat).toFixed(5)} ${(coords.lng).toFixed(5)}`;
});

mapFilters.addEventListener('change', () => {
  pinGroup.clearLayers();

  let filteredData = dataArr.slice();

  if (housingType.value !== 'any') {
    filteredData = filteredData.filter((data) => data.offer.type === housingType.value);
  }

  if (housingPrice.value !== 'any') {
    if (housingPrice.value === 'low') {
      filteredData = filteredData.filter((data) => data.offer.price < 10000);
    }

    if (housingPrice.value === 'middle') {
      filteredData = filteredData.filter((data) => data.offer.price > 10000 && data.offer.price < 50000);
    }

    if (housingPrice.value === 'high') {
      filteredData = filteredData.filter((data) => data.offer.price > 50000);
    }
  }

  if (housingRooms.value !== 'any') {
    filteredData = filteredData.filter((data) => data.offer.guests === Number(housingRooms.value));
  }

  if (housingGuests.value !== 'any') {
    filteredData = filteredData.filter((data) => data.offer.guests === Number(housingGuests.value));
  }

  // TODO Сложновато получилось, уточнить может можно проще
  const checkedCheckboxValues = [];

  Array.from(filterCheckboxes).filter((checkbox) => checkbox.checked).forEach((checkbox) => {
    checkedCheckboxValues.push(checkbox.defaultValue);
  });

  if (checkedCheckboxValues) {
    filteredData = filteredData.filter((data) => checkedCheckboxValues.every((current) => data.offer.features.includes(current)));
  }

  filteredData.forEach((data) => {
    createPin(data);
  });
});
