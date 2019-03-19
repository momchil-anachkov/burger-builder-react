import React from 'react';
import Order from '../../components/Order/Order';
import orders from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

export class Orders extends React.Component {
  state: any = {
    orders: [],
    loading: true,
  };

  componentDidMount() {
    orders.get('/orders')
      .then((response) => {
        const orders = Object.entries(response.data).map(([key, value]: [string, any]) => {
          return {
            ...value,
            id: key,
          }
        });
        this.setState({ orders: orders, loading: false });
      })
      .catch((error) => this.setState({ loading: false }));
  }

  render = () => {
    return (
      <div>
        { this.state.orders.map((order: any) => <Order key={ order.id }></Order>) }
      </div>
    );
  }
}

export default withErrorHandler(Orders, orders);
