export const createAd = (data, template) => {
  const offer = template.cloneNode(true);

  offer.querySelector('.popup__avatar').src = data.author.avatar ? data.author.avatar : 'img/avatars/default.png';
  offer.querySelector('.popup__title').textContent = data.offer.title ? data.offer.title : 'Заголовок не указа';
  offer.querySelector('.popup__text--address').textContent = data.offer.address ? data.offer.address : 'Адрес не указан';
  offer.querySelector('.popup__text--price').textContent = data.offer.price ? `${data.offer.price} ₽/ночь` : 'Цена не указана';

  const TYPE_OF_HOUSING_MAP = new Map;
  TYPE_OF_HOUSING_MAP.set('palace', 'Дворец');
  TYPE_OF_HOUSING_MAP.set('flat', 'Квартира');
  TYPE_OF_HOUSING_MAP.set('house', 'Дом');
  TYPE_OF_HOUSING_MAP.set('bungalow', 'Бунгало');
  TYPE_OF_HOUSING_MAP.set('hotel', 'Отель');

  offer.querySelector('.popup__type').textContent = data.offer.type ? TYPE_OF_HOUSING_MAP.get(data.offer.type) : 'Тип жилья не указан';
  offer.querySelector('.popup__text--capacity')
    .textContent = `${data.offer.rooms ? data.offer.rooms : 'Не указано кол-во'} комнат для
    ${data.offer.guests ? data.offer.guests : 'не определенного кол-ва'} гостей`;
  offer.querySelector('.popup__text--time')
    .textContent = `Заезд после
    ${data.offer.checkin ? data.offer.checkin : 'время не указано'}, выезд до
    ${data.offer.checkout ? data.offer.checkin :'время не указано'}`;

  if (data.offer.features) {
    offer.querySelectorAll('.popup__feature').forEach((feature) => {
      const isCorrect = data.offer.features.some(
        (dataFeature) => feature.classList.contains(`popup__feature--${dataFeature}`),
      );

      if (!isCorrect) {
        feature.remove();
      }
    });
  } else {
    const featuresInfo = document.createElement('p');
    featuresInfo.textContent = 'Удобства не указаны';
    offer.replaceChild(featuresInfo, offer.querySelector('.popup__features'));
  }

  offer.querySelector('.popup__description')
    .textContent = data.offer.description ? data.offer.description : 'Описание не указано';

  const img = offer.querySelector('.popup__photo');

  if (!data.offer.photos) {
    offer.querySelector('.popup__photos').remove();
  } else {
    data.offer.photos.forEach((dataSrc, i) => {
      if (i === 0) {
        img.src = dataSrc;
      } else {
        const clonedImg = img.cloneNode();
        clonedImg.src = dataSrc;
        offer.querySelector('.popup__photos').appendChild(clonedImg);
      }
    });
  }

  return offer;
};
