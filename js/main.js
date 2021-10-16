import {generateAdData} from './data.js';
import {createAd} from './card.js';
import {activateForm, disableForm} from './form.js';

const ADS_COUNT = 10;
const data = [];
const mapCanvas = document.querySelector('.map__canvas');
const offerTemplate = document.querySelector('#card').content.querySelector('.popup');
const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');

disableForm(adForm);
disableForm(mapFilters);

document.querySelector('.promo').addEventListener('click', () => {
  activateForm(adForm);
  activateForm(mapFilters);
});

for (let i = 0; i < ADS_COUNT; i++) {
  data.push(generateAdData(i + 1));

  const offer = createAd(data[i], offerTemplate);
  mapCanvas.appendChild(offer);
}
