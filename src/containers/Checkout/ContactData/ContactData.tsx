import React, { useState } from 'react';
import Button from '../../../components/UI/Button/Button';
import { ButtonType } from '../../../components/UI/Button/ButtonProps';
import classes from './ContactData.module.scss';
import {
  ContactDataProps,
  ContactDataStateProps,
  ContactDataOwnProps,
  ContactDataDispatchProps
} from './ContactDataProps';
import Spinner from '../../../components/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { MapDispatchToPropsFunction, MapStateToProps, connect } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { purchaseBurger } from '../../../store/actions';
import { AppState } from '../../../store/app.state';
import axiosInstance from '../../../axios';

const ContactData = (props: ContactDataProps) => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [orderForm, setOrderForm]: [any, Function] = useState({
    name: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Your Name'
      },
      value: '',
      valid: false,
      validation: {
        required: true
      },
      touched: false
    },

    street: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Your Street'
      },
      value: '',
      valid: false,
      validation: {
        required: true
      },
      touched: false
    },

    zipCode: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'ZIP Code'
      },
      value: '',
      validation: {
        required: true,
        minLength: 5,
        maxLength: 5
      },
      touched: false
    },

    country: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Country'
      },
      value: '',
      valid: false,
      validation: {
        required: true
      },
      touched: false
    },

    email: {
      elementType: 'email',
      elementConfig: {
        type: 'text',
        placeholder: 'Your Email'
      },
      value: '',
      valid: false,
      validation: {
        required: true
      },
      touched: false
    },

    deliveryMethod: {
      elementType: 'select',
      elementConfig: {
        options: [{ value: 'fastest', displayValue: 'Fastest' }, { value: 'cheapest', displayValue: 'Cheapest' }]
      },
      value: 'fastest',
      validation: {},
      valid: true,
      touched: false
    }
  });


  const orderSubmittedHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const formData: any = {};
    Object.keys(orderForm).forEach((formElementKey) => {
      formData[formElementKey] = orderForm[formElementKey].value;
    });

    const order = {
      ingredients: props.ingredients,
      price: props.totalPrice,
      orderData: formData,
      userId: props.userId,
    };
    props.orderBurger(order);
  };

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
  }

  const inputChangedHandler = (inputIdentifier: string, event: any) => {
    let inputIsValid = true;
    const validationConfig = orderForm[inputIdentifier].validation;
    if (validationConfig) {
      inputIsValid = checkValidity(validationConfig, event.target.value);
    }

    const updatedOrderForm = {
      ...orderForm,
      [inputIdentifier]: {
        ...orderForm[inputIdentifier],
        value: event.target.value,
        valid: inputIsValid,
        touched: true
      }
    };

    const formIsValid =
      inputIsValid &&
      Object.values(updatedOrderForm).reduce((accumulator: boolean, currentItem: any) => {
        return accumulator && currentItem.valid;
      }, true);

    setOrderForm(updatedOrderForm);
    setFormIsValid(formIsValid);
  };

  const formElementsArray = Object.keys(orderForm)
    .map((key) => ({
      id: key,
      config: orderForm[key]
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

  let form = (
    <form onSubmit={ orderSubmittedHandler }>
      { formElementsArray }
      <Button buttonType={ ButtonType.SUCCESS } disabled={ !formIsValid } clicked={ orderSubmittedHandler }>
        ORDER
        </Button>
    </form>
  );

  if (props.loading) {
    form = <Spinner />;
  }

  return (
    <div className={ classes.ContactData }>
      <h4>Enter your Contact Data</h4>
      { form }
    </div>
  );
};

const mapStateToProps: MapStateToProps<ContactDataStateProps, ContactDataOwnProps, AppState> = (state): ContactDataStateProps => ({
  ingredients: state.burgerBuilder.ingredients!,
  totalPrice: state.burgerBuilder.totalPrice,
  loading: state.order.loading,
  userId: state.auth.userId!,
});

const mapDispatchToProps: MapDispatchToPropsFunction<ContactDataDispatchProps, ContactDataOwnProps> = (
  dispatch: Function
) => ({
  orderBurger: (orderData: any) => dispatch(purchaseBurger(orderData))
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axiosInstance));
