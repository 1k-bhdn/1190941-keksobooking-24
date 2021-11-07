import {activateForm} from './util.js';
import {renderPins, START_COORDS, setCurrentAddress, resetMap} from './map.js';
import {setFilterFormChange, resetFilterForm, mapFilters} from './filter.js';
import {
  setAdFormReset,
  setAdFormSubmit,
  setStartCoordsToAddressField,
  setCoordsToAddressField
} from './ad-form.js';
import {getData, sendData} from './api.js';

getData((data) => {
  renderPins(data);

  activateForm(mapFilters);
  setFilterFormChange(renderPins, data);

  setAdFormReset(resetFilterForm, resetMap, data);
  setAdFormSubmit(resetFilterForm, resetMap, sendData, data);

  setStartCoordsToAddressField(START_COORDS);
  setCurrentAddress(setCoordsToAddressField);
});
