import axios from 'axios';
import { AxiosRequestConfig } from 'axios';
import { store } from './store/app.store';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080'
});

axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
  console.log(config);
  const modifiedConfig: AxiosRequestConfig = {
    ...config,
    params: {
      ...config.params,
      auth: store.getState().auth.token,
    },
  }
  return modifiedConfig;
});

export default axiosInstance;
