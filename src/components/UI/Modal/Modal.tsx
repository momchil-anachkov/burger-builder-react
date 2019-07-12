import React from 'react';
import classes from './Modal.module.scss';
import { ModalProps } from './ModalProps';
import Backdrop from '../Backdrop/Backdrop';

const Modal = (props: ModalProps) => (
  <React.Fragment>
    <Backdrop show={ props.show } clicked={ props.backdropClicked } />
    <div
      className={ classes.Modal }
      style={ {
        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: props.show ? 1 : 0
      } }
    >
      { props.children }
    </div>
  </React.Fragment>
)

export default React.memo(Modal, (previousProps, nextProps) => {
  return nextProps.show === previousProps.show && nextProps.children === previousProps.children;
});
