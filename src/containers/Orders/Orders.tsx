import React from 'react';
import Order from '../../components/Order/Order';

export class Orders extends React.Component {
  render = () => {
    return (
      <div>
        <Order></Order>
        <Order></Order>
      </div>
    );
  }
}
