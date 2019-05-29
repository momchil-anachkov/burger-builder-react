export interface AppStateProps {
  isAuthenticated?: boolean;
}

export interface AppDispatchProps {
  init?: () => void;
}

export interface AppOwnProps {
}

export interface AppProps extends AppStateProps, AppDispatchProps, AppOwnProps {
}
