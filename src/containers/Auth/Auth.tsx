import React, { ChangeEvent, FormEvent } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import { ButtonType } from '../../components/UI/Button/ButtonProps';
import classes from './Auth.module.scss';
import { AuthDispatchProps, AuthOwnProps, AuthProps, AuthStateProps } from './Auth.props';
import { auth } from '../../store/actions/auth';
import { MapDispatchToPropsFunction, MapStateToPropsFactory, connect, MapStateToProps } from 'react-redux';
import { AppState } from '../../store/app.state';
import Spinner from '../../components/Spinner/Spinner';
import { Redirect } from 'react-router';

class Auth extends React.Component<AuthProps> {
  state: any = {
    controls: {
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
    },
    isSignUp: true
  };

  checkValidity = (rules: any, value: any) => {
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

  inputChangedHandler = (inputIdentifier: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedControls = {
      ...this.state.controls,
      [inputIdentifier]: {
        ...this.state.controls[inputIdentifier],
        value: event.target.value,
        valid: this.checkValidity(this.state.controls[inputIdentifier].validation, event.target.value),
        touched: true
      }
    };
    this.setState({ controls: updatedControls });
    console.log('input changed');
  };

  formSubmittedHandler = (event: FormEvent) => {
    event.preventDefault();
    this.props.auth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    console.log('form submitted');
  };

  switchAuthModeHandler = (event: MouseEvent) => {
    this.setState((previousState: any) => ({
      isSignUp: !previousState.isSignUp
    }));
  };

  render = () => {
    let form = <Spinner />;

    if (!this.props.loading) {
      let formElements = Object.keys(this.state.controls)
        .map((key) => ({
          id: key,
          config: this.state.controls[key]
        }))
        .map((item) => (
          <Input
            key={item.id}
            label={item.config.elementConfig.placeholder}
            elementType={item.config.elementType}
            elementConfig={item.config.elementConfig}
            value={item.config.value}
            invalid={!item.config.valid}
            shouldValidate={!!item.config.validation}
            touched={item.config.touched}
            changed={this.inputChangedHandler.bind(this, item.id)}
          />
        ));

      form = (
        <form onSubmit={this.formSubmittedHandler}>
          {formElements}
          <Button buttonType={ButtonType.SUCCESS} clicked={this.formSubmittedHandler}>
            Submit
          </Button>
        </form>
      );
    }

    const switchButtonLabel = this.state.isSignUp ? 'Switch to Sign In' : 'Switch to Sign Up';

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = this.props.error.message;
    }

    let authenticatedRedirect = null;
    if (this.props.isAuthenticated) {
      authenticatedRedirect = <Redirect to="/"></Redirect>
    }

    return (
      <div className={classes.Auth}>
        {authenticatedRedirect}
        {errorMessage}
        {form}
        <Button buttonType={ButtonType.DANGER} clicked={this.switchAuthModeHandler}>
          {switchButtonLabel}
        </Button>
      </div>
    );
  };
}

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
