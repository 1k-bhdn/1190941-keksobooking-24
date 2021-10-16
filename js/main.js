import {generateAdData} from './data.js';
import {createAd} from './card.js';

const ADS_COUNT = 10;
const data = [];
const mapCanvas = document.querySelector('.map__canvas');
const offerTemplate = document.querySelector('#card').content.querySelector('.popup');
const documentFragment = document.createDocumentFragment();

for (let i = 0; i < ADS_COUNT; i++) {
  data.push(generateAdData(i + 1));
  const offer = createAd(data[i], offerTemplate);

  documentFragment.appendChild(offer);
  mapCanvas.appendChild(documentFragment);
}
