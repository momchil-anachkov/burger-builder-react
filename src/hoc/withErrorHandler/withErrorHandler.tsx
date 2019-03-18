import React, { ReactNode } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import { AxiosInstance, AxiosRequestConfig } from 'axios';

const withErrorHandler = (WrappedComponent: any, axios: AxiosInstance) => {
  return class A extends React.Component {
    state = {
      error: undefined
    };

    componentDidMount = () => {
      axios.interceptors.request.use(
        (request: AxiosRequestConfig) => {
          this.setState({ error: undefined });
          return request;
        }
      );
      axios.interceptors.response.use(
        response => response,
        (error: any) => {
          this.setState({ error: error });
        }
      );
    }

    componentDidCatch = (error: Error) => {
      this.setState({ error: true });
    }

    backdropClickedHandler = () => {
      this.setState({ error: false });
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
