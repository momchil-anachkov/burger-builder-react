import axios from 'axios';
import { AxiosRequestConfig } from 'axios';
import { store } from './store/app.store';

const orders = axios.create({
  baseURL: 'http://localhost:8080'
});

orders.interceptors.request.use((config: AxiosRequestConfig) => {
  console.log(config);
  const modifiedConfig: AxiosRequestConfig = {
    ...config,
    params: {
      auth: store.getState().auth.token,
    },
  }
  return modifiedConfig;
});

export default orders;
