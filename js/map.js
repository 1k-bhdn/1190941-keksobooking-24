import {createAd} from './baloon.js';

const ADS_LIMIT = 10;
const PIN_ICON_SIZE = 40;
const PIN_ANCHOR_COORDS = 20;
const MAIN_PIN_ICON_SIZE = 52;
const MAIN_PIN_ANCHOR_COORDS = 26;

const START_COORDS = {
  lat: 35.68950,
  lng: 139.69171,
};

const offerTemplate = document.querySelector('#card').content.querySelector('.popup');

const createPin = (data, pinGroup) => {
  const pinIcon = L.icon({
    iconUrl: '/img/pin.svg',
    iconSize: [PIN_ICON_SIZE, PIN_ICON_SIZE],
    iconAnchor: [PIN_ANCHOR_COORDS, PIN_ICON_SIZE],
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

const renderPins = (dataArray, pinGroup) => {
  if (!dataArray) {
    return;
  }

  pinGroup.clearLayers();

  for (let i = 0; i < dataArray.length && i < ADS_LIMIT; i++) {
    createPin(dataArray[i], pinGroup);
  }
};

const mapInit = (map) => {
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
};

const mainPinIcon = L.icon({
  iconUrl: '/img/main-pin.svg',
  iconSize: [MAIN_PIN_ICON_SIZE, MAIN_PIN_ICON_SIZE],
  iconAnchor: [MAIN_PIN_ANCHOR_COORDS, MAIN_PIN_ICON_SIZE],
});

const setMainPin = () => L.marker(
  START_COORDS,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const setCurrentAddress = (setCoordsToAddress, mainPin) => {
  mainPin.on('moveend', (evt) => {
    const coords = evt.target.getLatLng();

    setCoordsToAddress(coords);
  });
};

const resetMap = (mainPin, map, pinGroup, fullData) => {
  mainPin.setLatLng(START_COORDS);
  map.setView(START_COORDS);
  map.closePopup();

  renderPins(fullData, pinGroup);
};

export {START_COORDS, mapInit, createPin, setCurrentAddress, renderPins, resetMap, setMainPin};
