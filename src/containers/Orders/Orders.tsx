import React from 'react';
import Order from '../../components/Order/Order';
import orders from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { AppState } from '../../store/app.state';
import { MapStateToProps, MapDispatchToPropsFunction, connect } from 'react-redux';
import { OrdersStateProps, OrdersOwnProps, OrdersProps, OrdersDispatchProps } from './OrdersProps';
import { fetchOrders } from '../../store/actions';
import Spinner from '../../components/Spinner/Spinner';

class Orders extends React.Component<OrdersProps> {
  componentDidMount() {
    this.props.fetchOrders()
  }

  render = () => {
    let ordersComponent: any = <Spinner />;
    if (!this.props.loading) {
      ordersComponent = this.props.orders.map((order: any) => (
        <Order
          key={ order.id }
          ingredients={ order.ingredients }
          price={order.price}
        />)
      );
    }
    return (
      <div>
        {ordersComponent}
      </div>
    );
  }
}

const mapStateToProps: MapStateToProps<OrdersStateProps, OrdersOwnProps, AppState> = (state: AppState) => ({
    loading: state.order.loading,
    orders: state.order.orders,
})

const mapDispatchToProps: MapDispatchToPropsFunction<OrdersDispatchProps, OrdersOwnProps> = (dispatch: Function) => ({
  fetchOrders: () => {
    dispatch(fetchOrders())
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withErrorHandler(
    Orders,
    orders
  )
);
// export default (withErrorHandler(Orders, orders));
