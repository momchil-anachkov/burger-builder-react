import React from 'react';
import classes from './Modal.module.scss';
import { ModalProps } from './ModalProps';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends React.Component<ModalProps> {

  shouldComponentUpdate = (nextProps: ModalProps): boolean => {
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  }

  render = () => (
    <React.Fragment>
      <Backdrop show={this.props.show} clicked={this.props.backdropClicked} />
      <div
        className={classes.Modal}
        style={{
          transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: this.props.show ? 1 : 0
        }}
      >
        {this.props.children}
      </div>
    </React.Fragment>
  );

}

export default Modal;
