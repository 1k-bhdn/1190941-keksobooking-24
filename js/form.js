/**
 * @param form {Element} Форма из DOM
 * @return {undefined}
 */
const disableForm = (form) => {
  !form.classList.contains(`${form.classList[0]}--disabled`)
    ? form.classList.add(`${form.classList[0]}--disabled`) : null;

  form.querySelectorAll('fieldset, select').forEach((element) => {
    if (!element.hasAttribute('disabled')) {
      element.setAttribute('disabled','');
    }
  });
};

/**
 * @param form {Element} Форма из DOM
 * @return {undefined}
 */
const activateForm = (form) => {
  form.classList.contains(`${form.classList[0]}--disabled`)
    ? form.classList.remove(`${form.classList[0]}--disabled`) : null;

  form.querySelectorAll('fieldset, select').forEach((element) => {
    if (element.hasAttribute('disabled')) {
      element.removeAttribute('disabled');
    }
  });
};

export {disableForm, activateForm};
