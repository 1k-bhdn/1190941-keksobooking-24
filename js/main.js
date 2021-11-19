import {activateForm} from './util.js';
import {START_COORDS, mapInit, renderPins, resetMap, setCurrentAddress, setMainPin} from './map.js';
import {setFilterFormChange, resetFilterForm, mapFilters} from './filter.js';
import {
  setAdFormReset,
  setAdFormSubmit,
  setStartCoordsToAddressField,
  setCoordsToAddressField,
  adForm
} from './ad-form.js';
import {getData, sendData} from './api.js';
import {debounce} from './utils/debounce.js';

const getPinGroup = (LMap) => L.layerGroup().addTo(LMap);

const map = L.map('map-canvas');

const pinGroup = getPinGroup(map);
const mainPin = setMainPin();
mainPin.addTo(map);

map.on('load', () => {
  activateForm(adForm);

  getData((data) => {
    renderPins(data, pinGroup);

    activateForm(mapFilters);
    setFilterFormChange(debounce(renderPins), data, pinGroup);

    setAdFormReset(resetFilterForm, resetMap, mainPin, map, pinGroup, data);
    setAdFormSubmit(resetFilterForm, resetMap, sendData, mainPin, map, pinGroup, data);
  }, () => {
    setAdFormReset(resetFilterForm, resetMap, mainPin, map, pinGroup);
    setAdFormSubmit(resetFilterForm, resetMap, sendData, mainPin, map, pinGroup);
  });
})
  .setView(START_COORDS, 10);

mapInit(map);
setStartCoordsToAddressField(START_COORDS);
setCurrentAddress(setCoordsToAddressField, mainPin);
