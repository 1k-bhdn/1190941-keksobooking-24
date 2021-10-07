import {generateAdData} from './data.js';

const ADS_COUNT = 10;
const data = [];

for (let i = 1; i <= ADS_COUNT; i++) {
  data.push(generateAdData(i));
}
