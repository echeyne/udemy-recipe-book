import { Action } from '@ngrx/store';

export const DO_SIGNUP = 'DO_SIGNUP';
export const DO_SIGNIN = 'DO_SIGNIN';
export const SIGN_UP = 'SIGN_UP';
export const SIGN_IN = 'SIGN_IN';
export const LOG_OUT = 'LOG_OUT';
export const SET_TOKEN = 'SET_TOKEN';

export class DoSignup implements Action {
  readonly type = DO_SIGNUP;

  constructor( public payload: { username: string, password: string } ) {
  }
}

export class DoSignin implements Action {
  readonly type = DO_SIGNIN;

  constructor( public payload: { username: string, password: string } ) {
  }
}

export class SignUp implements Action {
  readonly type = SIGN_UP;
}

export class SignIn implements Action {
  readonly type = SIGN_IN;
}

export class Logout implements Action {
  readonly type = LOG_OUT;
}

export class SetToken implements Action {
  readonly type = SET_TOKEN;

  constructor( public payload: string ) {
  }
}

export type AuthActions = SignIn | SignUp | Logout | SetToken | DoSignup | DoSignin;
