import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {
  private databaseUrl = environment.firebaseDatabaseURL;
  private recipeJson = 'recipe.json';

  constructor( private http: Http, private recipeService: RecipeService, private authService: AuthService ) {
  }

  storeRecipes() {
    const token = this.authService.getToken();

    return this.http.put( this.databaseUrl + this.recipeJson + '?auth=' + token, this.recipeService.getRecipes() );
  }

  getRecipes() {
    const token = this.authService.getToken();

    this.http.get( this.databaseUrl + this.recipeJson + '?auth=' + token ).pipe( map(
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
