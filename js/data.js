import {getRandomInt, getRandomFloat, getArrRandomLength} from './util.js';

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

const generateAdData = (i) => {
  const lat = getRandomFloat(35.65, 35.70, 5);
  const lng = getRandomFloat(139.7, 139.8, 5);

  return {
    author: {
      avatar: `img/avatars/user${i < 10 ? `0${i}` : i}.png`,
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
      lat,
      lng,
    },
  };
};

export {generateAdData};
