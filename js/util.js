/**
 * @author https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
 * @param min {number}
 * @param max {number}
 * @return {number} Случайное целое число
 */
const getRandomInt = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));

  return Math.floor(Math.random() * (upper - lower + 1) + lower);
};

/**
 * @author https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
 * @param min {number}
 * @param max {number}
 * @param digits {number} Количество знаков после запятой
 * @return {string} Строка со случайным числом с плавающей точкой
 */
const getRandomFloat = (min, max, digits) => {
  const lower = Math.min(Math.abs(min), Math.abs(max));
  const upper = Math.max(Math.abs(min), Math.abs(max));

  return (Math.random() * (upper - lower) + lower).toFixed(digits);
};

/**
 * @param arr {array} Исходный массив
 * @return {array} Массив случайной длинны
 */
const getArrRandomLength = (arr) => arr.slice(0, getRandomInt(1, arr.length));

/**
 * @param element {Element} Элемент чьё значение атрибутов нужно изменить
 * @param value {string} Значение атрибутов
 * @param attrs {string} Различное кол-во атрибутов чьё значение будет заменено
 */
const changeAttributes = (element, value, ...attrs) => {
  attrs.forEach((attr) => {
    element.setAttribute(attr, value);
  });
};

/**
 * @param changed Элемент значение которого изменилось
 * @param dependent Зависимый элемент чьё значение нужно заменить
 */
const setFieldDependence = (changed, dependent) => {
  if (changed.value !== dependent.value) {
    dependent.value = changed.value;
  }
};

/**
 * @param array Массив форм для активации
 */
const activateForms = (array) => {
  array.forEach((form) => {
    form.classList.contains(`${form.classList[0]}--disabled`)
      ? form.classList.remove(`${form.classList[0]}--disabled`) : null;

    form.querySelectorAll('fieldset, select').forEach((element) => {
      if (element.hasAttribute('disabled')) {
        element.removeAttribute('disabled');
      }
    });
  });
};

export {getRandomInt, getRandomFloat, getArrRandomLength, changeAttributes, setFieldDependence, activateForms};
