import {SET_INPUTS, SET_FORM} from '../constants/inputs.constant';

const setInputs = (type, form, key, value) => ({
  type: `${SET_INPUTS}_${type}`,
  form,
  key,
  value,
});
const setForms = (type, form, value) => ({
  type: `${SET_FORM}_${type}`,
  form,
  value,
});

export const setInputValue = (type, form, key, value) => dispatch => {
  return dispatch(setInputs(type, form, key, value));
};

export const setFormValue = (type, form, value) => dispatch => {
  return dispatch(setForms(type, form, value));
};
