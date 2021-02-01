import axios from 'axios';
import { API_BASE_URL } from '@configs/constants';
import { reqSuccess, reqError } from './interceptors/request';
import { resSuccess, resError } from './interceptors/response';

axios.defaults.baseURL = API_BASE_URL;
axios.defaults.withCredentials = true;

axios.interceptors.request.use(reqSuccess, reqError);
axios.interceptors.response.use(resSuccess, resError);

export default axios;
