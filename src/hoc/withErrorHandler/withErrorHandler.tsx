import React from 'react';
import Modal from '../../components/UI/Modal/Modal';
import { AxiosInstance } from 'axios';
import useHttpErrorHandler from '../../hooks/http-error-handler';

const withErrorHandler = (WrappedComponent: any, axios: AxiosInstance) => {

  return (props: any) => {
    const [error, clearError] = useHttpErrorHandler(axios);

    return (
      <React.Fragment>
        <Modal show={ !!error } backdropClicked={ clearError }>
          { error ? (error as Error).message : null }
        </Modal>
        <WrappedComponent { ...props } >
        </WrappedComponent>
      </React.Fragment>
    )
  }
}

export default withErrorHandler;
