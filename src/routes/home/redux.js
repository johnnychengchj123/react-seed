import Req, { Methods } from '../../utils/req';
import Api from '../../config/api';

const LOAD_NEWS = 'LOAD_NEWS';

export async function fetchNews(pageConf) {
  return Req(process.env.REACT_APP_API_ZTBSAS, Methods.POST, {
    method: Api.QUERY_UP_TEXT_BY_PAGE,
    params: pageConf,
  }).then(res => res.result);
}

function setNews(ret) {
  return {
    type: LOAD_NEWS,
    data: ret,
  };
}

export default { setNews };

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

export const reducers = { news };
