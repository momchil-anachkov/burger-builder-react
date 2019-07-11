import React, { useState, useEffect } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import { AxiosInstance, AxiosRequestConfig } from 'axios';

const withErrorHandler = (WrappedComponent: any, axios: AxiosInstance) => {

  return (props: any) => {
    const [error, setError] = useState<any>(undefined);

    const requestInterceptor: number = axios.interceptors.request.use(
      (request: AxiosRequestConfig) => {
        setError(undefined);
        return request;
      }
    );

    const responseInterceptor: number = axios.interceptors.response.use(
      response => response,
      (error: any) => {
        setError(error);
      }
    );

    const backdropClickedHandler = () => {
      setError(false);
    }

    useEffect(() => () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    }, [requestInterceptor, responseInterceptor]);

    return (
      <React.Fragment>
        <Modal show={ !!error } backdropClicked={ backdropClickedHandler }>
          { error ? (error as Error).message : null }
        </Modal>
        <WrappedComponent { ...props } >
        </WrappedComponent>
      </React.Fragment>
    )
  }
}

export default withErrorHandler;
