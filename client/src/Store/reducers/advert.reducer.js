import * as AdvertConst from '../constants/adverts.constants';

import { SET_FORM, SET_INPUTS } from '../constants/inputs.constant';

const initialState = {
  allAdverts: [],
  fetching: false,
  oneAdvert: {},
  fetchingOne: false,
};

const advertReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${SET_FORM}_ADVERT`:
      return {
        ...state,
        [action.form]: action.value,
      };
    case `${SET_INPUTS}_ADVERT`:
      return {
        ...state,
        [action.form]: {
          ...state[action.form],
          [action.key]: action.value,
        },
      };
    case AdvertConst.FETCH_ADVERTS_REQUEST:
      return {
        ...state,
        fetching: true,
        allAdverts: [],
      };

    case AdvertConst.FETCH_ADVERTS_SUCCESS:
      return {
        ...state,
        allAdverts: action.payload,
        fetching: false,
      };

    case AdvertConst.FETCH_ADVERTS_FAILURE:
      return {
        ...state,
        fetching: false,
      };

    case AdvertConst.FETCH_ONE_ADVERT_REQUEST:
      return {
        ...state,
        fetchingOne: true,
        oneAdvert: {},
      };

    case AdvertConst.FETCH_ONE_ADVERT_SUCCESS:
      return {
        ...state,
        oneAdvert: action.payload,
        fetchingOne: false,
      };

    case AdvertConst.FETCH_ONE_ADVERT_FAILURE:
      return {
        ...state,
        fetchingOne: false,
      };

    default:
      return state;
  }
};

export default advertReducer;
