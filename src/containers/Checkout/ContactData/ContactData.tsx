import React, { ChangeEvent } from 'react';
import { ContactDataState } from './ContactDataState';
import Button from '../../../components/UI/Button/Button';
import { ButtonType } from '../../../components/UI/Button/ButtonProps';
import classes from './ContactData.module.scss';
import { ContactDataProps } from './ContactDataProps';
import orders from '../../../axios-orders';
import Spinner from '../../../components/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends React.Component<ContactDataProps, any> {
  state: any = {
    loading: false,
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
      },
      email: {
        elementType: 'email',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Email'
        },
        value: '',
      },

      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'}
          ]
        },
        value: '',
      },

      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Street'
        },
        value: '',
      },

      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP Code'
        },
        value: '',
      },

      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
      },

    }
  }

  orderSubmittedHandler = (event: Event) => {
    event.preventDefault();
    console.log(this.props.ingredients);
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      customer: {
        name: 'Momchil',
        email: 'some@fakemail.com',
        deliveryMethod: 'fastest',
        address: {
          street: '123 Main street',
          zipCode: '71239837192',
          country: 'Shanosville'
        }
      }
    }
    this.setState({ loading: true });
    orders
      .post('/orders', order)
      .then(response => {
        console.log(response)
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch(error => {
        console.log(error)
        this.setState({ loading: false });
      });
  }

  inputChangedHandler = (inputIdentifier: string, event: any) => {
    const updatedOrderForm = {
      ...this.state.orderForm,
      [inputIdentifier]: {
        ...this.state.orderForm[inputIdentifier],
        value: event.target.value,
      }
    }
    this.setState({orderForm: updatedOrderForm});
  }

  render = () => {
    
    const formElementsArray = Object.keys(this.state.orderForm)
      .map((key) => ({
        id: key,
        config: this.state.orderForm[key],
      }))
      .map((item) => (
        <Input
          key={item.id}
          label={item.config.elementConfig.placeholder}
          elementType={item.config.elementType}
          elementConfig={item.config.elementConfig}
          value={item.config.value}
          changed={this.inputChangedHandler.bind(this, item.id)}
        />
      ))

    let form = (
      <form>
        {formElementsArray}
        {/* <Input elementType="..." elementConfig="..." value="..." /> */}
        {/* <Input inputtype={InputType.INPUT} label="Email" name="email" id="email" placeholder="Your Mail" />
        <Input inputtype={InputType.INPUT} label="Street" name="street" id="street" placeholder="Your Street" />
        <Input inputtype={InputType.INPUT} label="Postal Code" name="postal" id="postal" placeholder="Your Postal Code" /> */}
        <Button buttonType={ ButtonType.SUCCESS } clicked={ this.orderSubmittedHandler }>ORDER</Button>
      </form>
    );

    if (this.state.loading) {
      form = <Spinner></Spinner>
    }

    return (
      <div className={ classes.ContactData }>
        <h4>Enter your Contact Data</h4>
        { form }
      </div>
    );
  }
}

export default ContactData;
