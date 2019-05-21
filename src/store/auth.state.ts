
export interface AuthState {
  token: null | string,
  userId: null | string,
  error: null | { message: string },
  loading: boolean,
}
