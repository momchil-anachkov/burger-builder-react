import React from 'react';
import Order from '../../components/Order/Order';
import orders from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { RouteChildrenProps } from 'react-router';
import { OrdersState } from './OrdersState';

export class Orders extends React.Component<RouteChildrenProps, OrdersState> {
  state: OrdersState = {
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
        {
          this.state.orders
            .map((order: any) => (
              <Order
                key={ order.id }
                ingredients={ order.ingredients }
                price={order.price}
              />)
            )
        }
      </div>
    );
  }
}

export default withErrorHandler(Orders, orders);
