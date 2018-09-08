import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { environment } from '../environments/environment';
import { AuthService } from './auth/auth.service';

@Component( {
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
} )
export class AppComponent implements OnInit {
  loadedPage = 'recipe';

  constructor( private authService: AuthService ) {
  }

  ngOnInit() {
    firebase.initializeApp( {
      apiKey: environment.firebaseApiKey,
      authDomain: environment.firebaseAuthDomain
    } );
    this.authService.loadUser();
  }

  onNavigate( feature: string ) {
    this.loadedPage = feature;
  }
}
