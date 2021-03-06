import React, { useEffect } from 'react';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { AppState } from '../../store/app.state';
import { MapStateToProps, MapDispatchToPropsFunction, connect } from 'react-redux';
import { OrdersStateProps, OrdersOwnProps, OrdersProps, OrdersDispatchProps } from './OrdersProps';
import { fetchOrders } from '../../store/actions';
import Spinner from '../../components/Spinner/Spinner';
import axiosInstance from '../../axios';

const Orders = (props: OrdersProps) => {
  useEffect(() => {
    props.fetchOrders(props.userId);
  }, []);

  let ordersComponent: any = <Spinner />;
  if (!props.loading) {
    ordersComponent = props.orders.map((order: any) => (
      <Order
        key={ order.id }
        ingredients={ order.ingredients }
        price={ order.price }
      />)
    );
  }
  return (
    <div>
      { ordersComponent }
    </div>
  );
}

const mapStateToProps: MapStateToProps<OrdersStateProps, OrdersOwnProps, AppState> = (state: AppState): OrdersStateProps => ({
  loading: state.order.loading,
  orders: state.order.orders,
  userId: state.auth.userId!,
})

const mapDispatchToProps: MapDispatchToPropsFunction<OrdersDispatchProps, OrdersOwnProps> = (dispatch: Function) => ({
  fetchOrders: (userId: string) => {
    dispatch(fetchOrders(userId))
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withErrorHandler(
    Orders,
    axiosInstance
  )
);
// export default (withErrorHandler(Orders, orders));
