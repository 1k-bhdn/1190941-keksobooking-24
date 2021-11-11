import {activateForm} from './util.js';
import {renderPins, START_COORDS, setCurrentAddress, resetMap, isMapLoaded} from './map.js';
import {setFilterFormChange, resetFilterForm, mapFilters} from './filter.js';
import {
  setAdFormReset,
  setAdFormSubmit,
  setStartCoordsToAddressField,
  setCoordsToAddressField
} from './ad-form.js';
import {getData, sendData} from './api.js';
import {debounce} from './utils/debounce.js';

// todo решение с флагом isMapLoaded похоже на костыль, нужно уточнить

if (isMapLoaded) {
  getData((data) => {
    renderPins(data);

    activateForm(mapFilters);
    setFilterFormChange(debounce(renderPins), data);

    setAdFormReset(resetFilterForm, resetMap, data);
    setAdFormSubmit(resetFilterForm, resetMap, sendData, data);

    setStartCoordsToAddressField(START_COORDS);
    setCurrentAddress(setCoordsToAddressField);
  });
}
