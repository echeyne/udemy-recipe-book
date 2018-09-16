import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs/operators';
import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../auth/store/auth.reducer';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor( private store: Store<fromApp.AppState> ) {
  }

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ) {
    return this.store.select( 'auth' ).pipe(
      take( 1 ),
      map(
        ( authState: fromAuth.State ) => {
          return authState.authenticated;
        }
      )
    );
  }

  canLoad( route: Route ): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.select( 'auth' ).pipe(
      take( 1 ),
      map(
        ( authState: fromAuth.State ) => {
          return authState.authenticated;
        }
      )
    );
  }
}
