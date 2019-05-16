import React from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import { ButtonType } from '../../components/UI/Button/ButtonProps';
import classes from './Auth.module.scss';

class Auth extends React.Component {
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

  inputChangedHandler = () => {
    console.log('input changed');
  }

  formSubmittedHandler = () => {
    console.log('form submitted');
  }

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
        <form>
          { formElementsArray }
          <Button buttonType={ButtonType.SUCCESS} clicked={this.formSubmittedHandler}>Submit</Button>
        </form>
      </div>
    );
  };
}

export default Auth;
