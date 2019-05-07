import { RouteChildrenProps } from 'react-router';

export interface OrdersStateProps {
  orders: any[]
  loading: boolean,
}

export interface OrdersDispatchProps {
  fetchOrders: () => any;
}

export interface OrdersOwnProps {
}

export interface OrdersProps extends RouteChildrenProps, OrdersStateProps, OrdersOwnProps, OrdersDispatchProps {
}
