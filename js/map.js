import {createAd} from './baloon.js';

const ADS_LIMIT = 10;
const offerTemplate = document.querySelector('#card').content.querySelector('.popup');

const START_COORDS = {
  lat: 35.68950,
  lng: 139.69171,
};

const createPin = (data, pinGroup) => {
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

const renderPins = (dataArray, pinGroup) => {
  pinGroup.clearLayers();

  for (let i = 0; i < dataArray.length && i < ADS_LIMIT; i++) {
    createPin(dataArray[i], pinGroup);
  }
};

const mapInit = (map, data, pinGroup) => {
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  renderPins(data, pinGroup);
};

const mainPinIcon = L.icon({
  iconUrl: '/img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
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

const resetMap = (fullData, mainPin, map, pinGroup) => {
  mainPin.setLatLng(START_COORDS);
  map.setView(START_COORDS);
  map.closePopup();

  renderPins(fullData, pinGroup);
};

export {START_COORDS, mapInit, createPin, setCurrentAddress, renderPins, resetMap, setMainPin};
