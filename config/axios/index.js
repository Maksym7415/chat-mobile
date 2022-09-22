import axios from 'axios';
import {BASE_URL} from '../constants/url';
import {showSnackbar, getHeaders} from '../../helpers';
import {store} from '../../redux/store';
// import {onLogOut} from '../actions/auth';

const parseErrorCode = error => {
  if (error.response) {
    if (error.response.status === 401) {
      // store.dispatch(onLogOut());
    } else if (error.response.status === 404) {
      const {message} = error.response.data;
      // showSnackbar({message});
    }
  } else {
    // showSnackbar({message: 'something'});
  }

  return Promise.reject(error.response);
};

const API = axios.create();

// Request parsing interceptor
API.interceptors.request.use(
  async config => {
    const headers = await getHeaders();
    config.baseURL = BASE_URL;
    config.timeout = 10000;
    if (headers) {
      config.headers = {
        common: {
          ['Content-Type']: 'application/json',
          accept: 'application/json',
          ['X-Requested-With']: 'XMLHttpRequest',
        },
        ...headers,
      };
    }
    return config;
  },
  error => Promise.reject(error),
);

// Response parsing interceptor
API.interceptors.response.use(
  response => response,
  error => parseErrorCode(error),
);

export default API;
