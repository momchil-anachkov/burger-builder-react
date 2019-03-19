import React from 'react';
import { ContactDataState } from './ContactDataState';
import Button from '../../../components/UI/Button/Button';
import { ButtonType } from '../../../components/UI/Button/ButtonProps';
import classes from './ContactData.module.scss';

class ContactData extends React.Component<any, ContactDataState> {
  state: ContactDataState = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: '',
    }
  }

  render = () => {
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        <form>
          <input className={classes.Input} type="text" name="name" id="name" placeholder="Your Name"/>
          <input className={classes.Input} type="email" name="email" id="email" placeholder="Your Mail"/>
          <input className={classes.Input} type="text" name="street" id="street" placeholder="Your Street"/>
          <input className={classes.Input} type="text" name="postal" id="postal" placeholder="Your Postal"/>
          <Button buttonType={ButtonType.SUCCESS} clicked={()=>{}}>ORDER</Button>
        </form>
      </div>
    );
  }
}

export default ContactData;
