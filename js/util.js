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

export {getRandomInt, getRandomFloat, getArrRandomLength};
