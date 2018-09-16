import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import * as firebase from 'firebase';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  @Effect()
  authSignup = this.actions$.pipe(
    ofType( AuthActions.DO_SIGNUP ),
    map(
      ( action: AuthActions.DoSignup ) => {
        return action.payload;
      }
    ),
    switchMap(
      ( authData: { username: string, password: string } ) => {
        return from( firebase.auth().createUserWithEmailAndPassword( authData.username, authData.password ) );
      }
    ),
    switchMap(
      () => {
        return from( firebase.auth().currentUser.getIdToken() );
      }
    ),
    mergeMap(
      ( token: string ) => {
        this.router.navigate( [ '/recipes' ] );
        return [
          {
            type: AuthActions.SIGN_UP
          },
          {
            type: AuthActions.SET_TOKEN,
            payload: token
          }
        ];
      }
    )
  );

  @Effect()
  authSignin = this.actions$.pipe(
    ofType( AuthActions.DO_SIGNIN ),
    map(
      ( action: AuthActions.DoSignin ) => {
        return action.payload;
      }
    ),
    switchMap(
      ( authData: { username: string, password: string } ) => {
        return from( firebase.auth().signInWithEmailAndPassword( authData.username, authData.password ) );
      }
    ),
    switchMap(
      () => {
        return from( firebase.auth().currentUser.getIdToken() );
      }
    ),
    mergeMap(
      ( token: string ) => {
        this.router.navigate( [ '/recipes' ] );
        return [
          {
            type: AuthActions.SIGN_IN
          },
          {
            type: AuthActions.SET_TOKEN,
            payload: token
          }
        ];
      }
    )
  );

  @Effect()
  authLogout = this.actions$.pipe(
    ofType( AuthActions.LOG_OUT ),
    tap( () => {
        this.router.navigate( [ '/' ] );
      }
    )
  );


  // $ after to indicate an observable
  constructor( private actions$: Actions, private router: Router ) {
  }
}
