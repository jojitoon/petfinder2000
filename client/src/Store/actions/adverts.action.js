import * as AdvertConst from '../constants/adverts.constants';
import AxiosDefault from '../defaults/axiosInstance';
import actionCreator from '../../utils/actionCreator';

export const fetchAdverts = () => async (dispatch) => {
  try {
    dispatch(actionCreator(AdvertConst.FETCH_ADVERTS_REQUEST));
    const { data } = await AxiosDefault({
      method: 'GET',
      url: 'advertisement',
    });

    if (data.status === 'success') {
      dispatch(actionCreator(AdvertConst.FETCH_ADVERTS_SUCCESS, data.adverts));
    }
  } catch (error) {
    dispatch(actionCreator(AdvertConst.FETCH_ADVERTS_FAILURE));
    console.log(error.stack, error.response);
  }
};

export const fetchOneAdvert = (id) => async (dispatch) => {
  try {
    dispatch(actionCreator(AdvertConst.FETCH_ONE_ADVERT_REQUEST));
    const { data } = await AxiosDefault({
      method: 'GET',
      url: `advertisement/${id}`,
    });

    if (data.status === 'success') {
      dispatch(
        actionCreator(AdvertConst.FETCH_ONE_ADVERT_SUCCESS, data.advert)
      );
    }
  } catch (error) {
    dispatch(actionCreator(AdvertConst.FETCH_ONE_ADVERT_FAILURE));
    console.log(error.stack, error.response);
  }
};
