import axios, { AxiosRequestConfig } from 'axios';
import { store } from './store/app.store';

axios.defaults.baseURL = 'http://localhost:8080';

axios.interceptors.request.use((config: AxiosRequestConfig) => {
  console.log(config);
  const modifiedConfig: AxiosRequestConfig = {
    ...config,
    params: store.getState().auth.token,
  }
  return modifiedConfig;
});

export default axios;
