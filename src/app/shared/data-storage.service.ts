import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpRequest } from '@angular/common/http';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { environment } from '../../environments/environment';

@Injectable()
export class DataStorageService {
  private databaseUrl = environment.firebaseDatabaseURL;
  private recipeJson = 'recipe.json';

  constructor( private httpClient: HttpClient, private recipeService: RecipeService ) {
  }

  storeRecipes() {
    // return this.httpClient.put( this.databaseUrl + this.recipeJson, this.recipeService.getRecipes(), {
    //   // observe: 'events'
    //   // headers: new HttpHeaders().set( 'Authorization', 'add token' ).append( 'A', 'B' )
    //   params: new HttpParams().set( 'auth', token )
    // } );
    const req = new HttpRequest( 'PUT', this.databaseUrl, this.recipeService.getRecipes(), {
      reportProgress: true,
    } );

    // loaded/total in the reportProgress could be displayed to the user

    return this.httpClient.request( req );
  }

  getRecipes() {

    this.httpClient.get<Recipe[]>( this.databaseUrl + this.recipeJson )
    // this.httpClient.get( this.databaseUrl + this.recipeJson + '?auth=' + token, {
    //   observe: 'response', could also be body
    //   responseType: 'text' could also be blob, arraybuffer, json (default)
    // } )
      .pipe( map(
        ( recipes ) => {
          for ( const recipe of recipes ) {
            if ( !recipe[ 'ingredients' ] ) {
              recipe[ 'ingredients' ] = [];
            }
          }
          return recipes;
        }
      ) ).subscribe(
      ( recipes: Recipe[] ) => {
        this.recipeService.setRecipes( recipes );
      }
    );
  }
}
