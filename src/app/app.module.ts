import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { CoreModule } from './core/core.module';
import { reducers } from './store/app.reducers';
import { AuthEffects } from './auth/store/auth.effects';

@NgModule( {
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    // HttpModule,
    HttpClientModule,
    AuthModule,
    ShoppingListModule,
    // Note: app routing module has to go after other modules else wildcard routing gets messed up
    AppRoutingModule,
    SharedModule,
    CoreModule,
    StoreModule.forRoot( reducers ),
    EffectsModule.forRoot( [ AuthEffects ] ),
    StoreRouterConnectingModule,
    // Must be added after StoreModule
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  bootstrap: [ AppComponent ]
} )
export class AppModule {
}
