import React from 'react';
import { MapDispatchToProps, connect } from 'react-redux';
import { authLogout } from '../../../store/actions/auth';
import { LogoutProps } from './LogoutProps';
import { Redirect } from 'react-router';

const Logout = (props: LogoutProps) => {
  props.logout();
  return <Redirect to="/"></Redirect>
}

const mapDispatchToProps: MapDispatchToProps<{}, {}> = (dispatch: Function) => ({
  logout: () => dispatch(authLogout()),
});

export default connect(null, mapDispatchToProps)(Logout);
