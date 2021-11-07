import {activateForm} from './util.js';
import {adForm} from './ad-form.js';
import {createAd} from './baloon.js';

const ADS_LIMIT = 10;
const offerTemplate = document.querySelector('#card').content.querySelector('.popup');

const START_COORDS = {
  lat: 35.68950,
  lng: 139.69171,
};

// todo тут беда с онлоадом, нужно придумать как вынести его в мэйн

const map = L.map('map-canvas')
  .on('load', () => {
    activateForm(adForm);
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

const setCurrentAddress = (setCoordsToAddress) => {
  mainPin.on('moveend', (evt) => {
    const coords = evt.target.getLatLng();

    setCoordsToAddress(coords);
  });
};

const renderPins = (dataArray) => {
  pinGroup.clearLayers();

  for (let i = 0; i < dataArray.length && i < ADS_LIMIT; i++) {
    createPin(dataArray[i]);
  }
};

const resetMap = (fullData) => {
  mainPin.setLatLng(START_COORDS);
  map.setView(START_COORDS);
  map.closePopup();

  renderPins(fullData);
};

// todo перебрать экспорты/импорты везде
export {renderPins, map, pinGroup, mainPin, START_COORDS, setCurrentAddress, resetMap};
