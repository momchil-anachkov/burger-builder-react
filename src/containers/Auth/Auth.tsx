import React, { FormEvent, useState } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import { ButtonType } from '../../components/UI/Button/ButtonProps';
import classes from './Auth.module.scss';
import { AuthDispatchProps, AuthOwnProps, AuthProps, AuthStateProps } from './Auth.props';
import { auth } from '../../store/actions/auth';
import { MapDispatchToPropsFunction, connect, MapStateToProps } from 'react-redux';
import { AppState } from '../../store/app.state';
import Spinner from '../../components/Spinner/Spinner';
import { Redirect } from 'react-router';

const Auth = (props: AuthProps) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [controls, setControls]: [any, Function] = useState({
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Mail Address'
      },
      value: '',
      validation: {
        required: true,
        isEmail: true
      },
      valid: false,
      touched: false
    },
    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'Password'
      },
      value: '',
      validation: {
        required: true,
        minLength: 6
      },
      valid: false,
      touched: false
    }
  });

  const checkValidity = (rules: any, value: any) => {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  };

  const inputChangedHandler = (inputIdentifier: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedControls = {
      ...controls,
      [inputIdentifier]: {
        ...controls[inputIdentifier],
        value: event.target.value,
        valid: checkValidity(controls[inputIdentifier].validation, event.target.value),
        touched: true
      }
    };
    setControls(updatedControls);
  };

  const formSubmittedHandler = (event: FormEvent) => {
    event.preventDefault();
    props.auth(controls.email.value, controls.password.value, isSignUp);
  };

  const switchAuthModeHandler = (event: MouseEvent) => {
    setIsSignUp(!isSignUp);
  };

  let form = <Spinner />;

  if (!props.loading) {
    let formElements = Object.keys(controls)
      .map((key) => ({
        id: key,
        config: controls[key]
      }))
      .map((item) => (
        <Input
          key={ item.id }
          label={ item.config.elementConfig.placeholder }
          elementType={ item.config.elementType }
          elementConfig={ item.config.elementConfig }
          value={ item.config.value }
          invalid={ !item.config.valid }
          shouldValidate={ !!item.config.validation }
          touched={ item.config.touched }
          changed={ inputChangedHandler.bind(null, item.id) }
        />
      ));

    form = (
      <form onSubmit={ formSubmittedHandler }>
        { formElements }
        <Button buttonType={ ButtonType.SUCCESS } clicked={ formSubmittedHandler }>
          Submit
          </Button>
      </form>
    );
  }

  const switchButtonLabel = isSignUp ? 'Switch to Sign In' : 'Switch to Sign Up';

  let errorMessage = null;
  if (props.error) {
    errorMessage = props.error.message;
  }

  let redirectTo = new URLSearchParams(props.history.location.search).get('redirect-to');
  redirectTo = redirectTo || '/';

  let authenticatedRedirect = null;
  if (props.isAuthenticated) {
    authenticatedRedirect = <Redirect to={ redirectTo }></Redirect>;
  }

  return (
    <div className={ classes.Auth }>
      { authenticatedRedirect }
      { errorMessage }
      { form }
      <Button buttonType={ ButtonType.DANGER } clicked={ switchAuthModeHandler }>
        { switchButtonLabel }
      </Button>
    </div>
  );
};

const mapStateToProps: MapStateToProps<AuthStateProps, AuthOwnProps, AppState> = (
  state: AppState,
) => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isAuthenticated: state.auth.token !== null,
});

const mapDispatchToProps: MapDispatchToPropsFunction<AuthDispatchProps, AuthOwnProps> = (dispatch: Function) => ({
  auth: (email: string, password: string, isSignUp) => dispatch(auth(email, password, isSignUp))
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
