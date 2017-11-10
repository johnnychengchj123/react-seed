import { addReducer } from '../../store';
import Req, { Methods } from '../../utils/req';
import Api from '../../config/api';

const LOAD_NEWS = 'LOAD_NEWS';

function loadNews(pageConf) {
  return dispatch => {
    Req(process.env.REACT_APP_API_ZTBSAS, Methods.POST, {
      method: Api.QUERY_UP_TEXT_BY_PAGE,
      params: pageConf,
    })
      .then(res => {
        dispatch({
          type: LOAD_NEWS,
          data: res.result,
        });
      })
      .catch(err => {
        console.warn('fetch err: ', err);
      });
  };
}

export default { loadNews };

const initialState = {
  list: [],
};

function news(state = initialState, action) {
  const { type, data } = action;

  switch (type) {
    case LOAD_NEWS:
      return {
        ...state,
        ...data,
      };
    default:
      return state;
  }
}

addReducer({
  news,
});
