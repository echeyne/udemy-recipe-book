import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../store/auth.actions';

@Component( {
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: [ './signup.component.css' ]
} )
export class SignupComponent implements OnInit {

  constructor( private store: Store<fromApp.AppState> ) {
  }

  ngOnInit() {
  }

  onSignup( form: NgForm ) {
    const email = form.value.email;
    const password = form.value.password;

    // Note firebase requires a minimum password length of 6 characters
    this.store.dispatch( new AuthActions.DoSignup( { username: email, password: password } ) );
  }

}
