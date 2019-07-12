import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { useState, useEffect } from 'react';

const useHttpErrorHandler = (httpClient: AxiosInstance) => {
    const [error, setError] = useState<any>(undefined);

    const requestInterceptor: number = httpClient.interceptors.request.use(
      (request: AxiosRequestConfig) => {
        setError(undefined);
        return request;
      }
    );

    const responseInterceptor: number = httpClient.interceptors.response.use(
      response => response,
      (error: any) => {
        setError(error);
      }
    );

    const errorConfirmedHandler = () => {
      setError(false);
    }

    useEffect(() => () => {
      httpClient.interceptors.request.eject(requestInterceptor);
      httpClient.interceptors.response.eject(responseInterceptor);
    }, [requestInterceptor, responseInterceptor]);

    return [error, errorConfirmedHandler]
}

export default useHttpErrorHandler;
