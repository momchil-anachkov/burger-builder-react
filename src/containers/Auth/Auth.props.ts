export interface AuthStateProps {
}

export interface AuthDispatchProps {
  auth: (username: string, password: string) => void
}

export interface AuthOwnProps {
}

export interface AuthProps extends AuthStateProps, AuthDispatchProps, AuthOwnProps {
}
