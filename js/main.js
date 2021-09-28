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
const getRandomInteger = (min, max) => {
  validateValues(min, max);
  return Math.round(min - 0.5 + Math.random() * (max - min + 1));
};

getRandomInteger(4, 9);

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
