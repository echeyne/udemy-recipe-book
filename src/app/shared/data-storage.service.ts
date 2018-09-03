import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map } from 'rxjs/operators';

@Injectable()
export class DataStorageService {
  private databaseUrl = 'https://ng-recipe-book-bfbbe.firebaseio.com/';
  private recipeJson = 'recipe.json';

  constructor( private http: Http, private recipeService: RecipeService ) {
  }

  storeRecipes() {
    return this.http.put( this.databaseUrl + this.recipeJson, this.recipeService.getRecipes() );
  }

  getRecipes() {
    return this.http.get( this.databaseUrl + this.recipeJson ).pipe( map(
      ( response: Response ) => {
        const recipes: Recipe[] = response.json();
        for ( const recipe of recipes ) {
          if ( !recipe[ 'ingredients' ] ) {
            console.log( recipe );
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
