import React from 'react';
import { ContactDataState } from './ContactDataState';
import Button from '../../../components/UI/Button/Button';
import { ButtonType } from '../../../components/UI/Button/ButtonProps';
import classes from './ContactData.module.scss';
import { ContactDataProps } from './ContactDataProps';
import orders from '../../../axios-orders';
import Spinner from '../../../components/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { InputType } from '../../../components/UI/Input/InputProps';

class ContactData extends React.Component<ContactDataProps, ContactDataState> {
  state: ContactDataState = {
    loading: false,
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: '',
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

  render = () => {
    let form = (
      <form>
        <Input inputtype={InputType.INPUT} label="Name" name="name" id="name" placeholder="Your Name" />
        <Input inputtype={InputType.INPUT} label="Email" name="email" id="email" placeholder="Your Mail" />
        <Input inputtype={InputType.INPUT} label="Street" name="street" id="street" placeholder="Your Street" />
        <Input inputtype={InputType.INPUT} label="Postal Code" name="postal" id="postal" placeholder="Your Postal Code" />
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
