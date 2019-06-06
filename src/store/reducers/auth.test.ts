import { authReducer, initialState as authInitialState } from './auth';
import { authSuccess } from '../actions/auth';

describe('authReducer', () => {

  it('should return the initial state', () => {
    expect.assertions(1);
    expect(authReducer(undefined, {} as any)).toEqual(authInitialState);
  });

  it('should store the token upon login', () => {
    const updatedState = authReducer(authInitialState, authSuccess({idToken: '123', userId: '321'}));
    expect.assertions(2);
    expect(updatedState.token).toBe('123');
    expect(updatedState.userId).toBe('321');
  });


});
