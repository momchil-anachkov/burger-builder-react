import { Props } from '../../types/Props';

export interface LayoutStateProps {
  isAuthenticated: boolean;
}

export interface LayoutOwnProps {
}

export interface LayoutDispatchProps {
}

export interface LayoutProps extends LayoutOwnProps, LayoutDispatchProps, LayoutStateProps, Props {
}
