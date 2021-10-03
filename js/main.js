/**
 * @param min {number}
 * @param max {number}
 * @return {undefined}
 */
const validateValues = (min, max) => {
  if (min < 0 || max < 0) {
    throw new Error('Аргументы не могут быть меньше 0');
  } else if (min > max || min === max) {
    throw new Error('Аргумент max не может быть меньше min или равен ему');
  }
};

/**
 * @author https://learn.javascript.ru/task/random-int-min-max
 * @param min {number}
 * @param max {number}
 * @return {number} Случайное целое число
 */
const getRandomInt = (min, max) => {
  validateValues(min, max);
  return Math.round(min - 0.5 + Math.random() * (max - min + 1));
};

/**
 * @param min {number}
 * @param max {number}
 * @param digits {number} Количество знаков после запятой
 * @return {number} Случайное число с плавающей точкой
 */
const getRandomFloat = (min, max, digits) => {
  validateValues(min, max);
  return parseFloat((min + Math.random() * (max - min)).toFixed(digits));
};

getRandomFloat(1.1, 1.7, 2);

/**
 * @param arr {array}
 * @return {array}
 */
const getArrRandomLength = (arr) => arr.slice(0, getRandomInt(1, arr.length));

const ADS_COUNT = 10;

const TYPE_OF_HOUSING = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const TIME = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const generateAdData = (index) => {
  const lat = getRandomFloat(35.65, 35.70, 5);
  const lng = getRandomFloat(139.7, 139.8, 5);

  return {
    author: {
      avatar: `img/avatars/user${index < 10 ? `0${index}` : index}.png`,
    },
    offer: {
      title: 'Заголовок предложения',
      price: getRandomInt(200, 1000),
      address: `${lat}, ${lng}`,
      type: TYPE_OF_HOUSING[getRandomInt(0, TYPE_OF_HOUSING.length - 1)],
      rooms: getRandomInt(1, 4),
      guests: getRandomInt(1, 8),
      checkin: TIME[getRandomInt(0, TIME.length - 1)],
      checkout: TIME[getRandomInt(0, TIME.length - 1)],
      features: getArrRandomLength(FEATURES),
      description: 'Повседневная практика показывает, что консультация с широким активом способствует подготовки и реализации систем массового участия. Равным образом новая модель организационной деятельности позволяет выполнять важные задания по разработке систем массового участия.',
      photos: getArrRandomLength(PHOTOS),
    },
    location: {
      lat: lat,
      lng: lng,
    },
  };
};

const data = [];

for (let index = 1; index <= ADS_COUNT; index++) {
  data.push(generateAdData(index));
}
