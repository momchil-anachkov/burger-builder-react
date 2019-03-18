import React, { ReactNode } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { Props } from '../../types/Props';

const withErrorHandler = (WrappedComponent: any, axios: AxiosInstance) => {
  return class A extends React.Component {
    state = {
      error: undefined
    };

    requestInterceptor: number = axios.interceptors.request.use(
      (request: AxiosRequestConfig) => {
        this.setState({ error: undefined });
        return request;
      }
    );
    responseInterceptor: number = axios.interceptors.response.use(
      response => response,
      (error: any) => {
        this.setState({ error: error });
      }
    );

    componentDidCatch = (error: Error) => {
      this.setState({ error: true });
    }

    backdropClickedHandler = () => {
      this.setState({ error: false });
    }

    componentWillUnmount = () => {
      axios.interceptors.request.eject(this.requestInterceptor);
      axios.interceptors.response.eject(this.responseInterceptor);
    }

    render = () => {
      return (
        <React.Fragment>
          <Modal show={!!this.state.error} backdropClicked={this.backdropClickedHandler}>
            {this.state.error ? (this.state.error as any as Error).message : null}
          </Modal>
          <WrappedComponent {...this.props} >
          </WrappedComponent>
        </React.Fragment>
      )
    }
  }
}

export default withErrorHandler;
