import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Breakfast Wrap',
      'A wholesome breakfast wrap',
      'https://upload.wikimedia.org/wikipedia/commons/a/a8/Chicken-kathi-roll-recipe.jpg',
      [
        new Ingredient( 'egg', 2 ),
        new Ingredient( 'onion', 1 )
      ]
    ),
    new Recipe( 'Hamburger',
      'Tasty hamburger with fries',
      'https://images-na.ssl-images-amazon.com/images/I/91iuElQtUDL._SL1500_.jpg',
      [
        new Ingredient( 'beef patty', 1 ),
        new Ingredient( 'lettuce leaves', 2 ),
        new Ingredient( 'jalapenos', 1 )
      ]
    )
  ];

  constructor( private shoppingListService: ShoppingListService ) {
  }

  setRecipes( recipes: Recipe[] ) {
    this.recipes = recipes;
    this.recipesChanged.next( this.recipes.slice() );
  }


  getRecipes() {
    // return a copy instead of the object, otherwise external modifications can be made
    return this.recipes.slice();
  }

  getRecipe( id: number ) {
    return this.recipes[ id ];
  }

  onAddIngredientsToShoppingList( ingredients: Ingredient[] ) {
    this.shoppingListService.addIngredients( ingredients );
  }

  addRecipe( recipe: Recipe ) {
    this.recipes.push( recipe );
    this.recipesChanged.next( this.recipes.slice() );
  }

  updateRecipe( index: number, recipe: Recipe ) {
    this.recipes[ index ] = recipe;
    this.recipesChanged.next( this.recipes.slice() );
  }

  deleteRecipe( index: number ) {
    this.recipes.splice( index, 1 );
    this.recipesChanged.next( this.recipes.slice() );
  }
}
