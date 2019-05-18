import React, { ChangeEvent, FormEvent } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import { ButtonType } from '../../components/UI/Button/ButtonProps';
import classes from './Auth.module.scss';
import { AuthDispatchProps, AuthOwnProps, AuthProps, AuthStateProps } from './Auth.props';
import { auth } from '../../store/actions/auth';
import { MapDispatchToPropsFunction, MapStateToPropsFactory, connect, MapStateToProps } from 'react-redux';

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
    }
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
    this.props.auth(
      this.state.controls.email.value,
      this.state.controls.password.value,
    );
    console.log('form submitted');
  };

  render = () => {
    const formElementsArray = Object.keys(this.state.controls)
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

    return (
      <div className={classes.Auth}>
        <form onSubmit={this.formSubmittedHandler}>
          {formElementsArray}
          <Button buttonType={ButtonType.SUCCESS} clicked={this.formSubmittedHandler}>
            Submit
          </Button>
        </form>
      </div>
    );
  };
}

const mapStateToProps: MapStateToProps<AuthStateProps, AuthOwnProps, any> = (state: any, ownProps: AuthOwnProps) => ({});

const mapDispatchToProps: MapDispatchToPropsFunction<AuthDispatchProps, AuthOwnProps> = (dispatch: Function) => ({
  auth: (email: string, password: string) => dispatch(auth(email, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
