export interface AuthStateProps {
}

export interface AuthDispatchProps {
  auth: (username: string, password: string, isSignUp: boolean) => void
}

export interface AuthOwnProps {
}

export interface AuthProps extends AuthStateProps, AuthDispatchProps, AuthOwnProps {
}