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

const map = L.map('map-canvas').on('load', () => {
  activateForm(adForm);
  getData((data) => {
    const pinGroup = getPinGroup(map);
    const mainPin = setMainPin();
    mainPin.addTo(map);

    mapInit(map, data, pinGroup);

    activateForm(mapFilters);
    setFilterFormChange(debounce(renderPins), data, pinGroup);

    setAdFormReset(resetFilterForm, resetMap, data, mainPin, map, pinGroup);
    setAdFormSubmit(resetFilterForm, resetMap, sendData, data, mainPin, map, pinGroup);

    setStartCoordsToAddressField(START_COORDS);
    setCurrentAddress(setCoordsToAddressField, mainPin);
  });
})
  .setView(START_COORDS, 10);
