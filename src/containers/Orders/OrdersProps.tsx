import { RouteChildrenProps } from 'react-router';

export interface OrdersStateProps {
  orders: any[]
  loading: boolean,
  userId: string,
}

export interface OrdersDispatchProps {
  fetchOrders: (userId: string) => any;
}

export interface OrdersOwnProps {
}

export interface OrdersProps extends RouteChildrenProps, OrdersStateProps, OrdersOwnProps, OrdersDispatchProps {
}
