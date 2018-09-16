import { Ingredient } from '../../shared/ingredient.model';
import { Recipe } from '../recipe.model';
import * as RecipeActions from './recipe.actions';
import * as fromApp from '../../store/app.reducers';

export interface FeatureState extends fromApp.AppState {
  recipes: State;
}

export interface State {
  recipes: Recipe[];
}

const initalState: State = {
  recipes: [
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
  ]
};

export function recipeReducer( state = initalState, action: RecipeActions.RecipeActions ) {
  switch ( action.type ) {
    case RecipeActions.SET_RECIPES:
      return {
        ...state,
        recipes: [ ...action.payload ]
      };
    case RecipeActions.ADD_RECIPE:
      return {
        ...state,
        recipes: [ ...state.recipes, action.payload ]
      };
    case RecipeActions.UPDATE_RECIPE:
      const recipe = state.recipes[ action.payload.index ];
      const updatedRecipe = {
        ...recipe,
        ...action.payload.updatedRecipe
      };
      let recipes = [ ...state.recipes ];
      recipes[ action.payload.index ] = updatedRecipe;
      return {
        ...state,
        recipes: recipes
      };
    case RecipeActions.DELETE_RECIPE:
      recipes = [ ...state.recipes ];
      recipes.splice( action.payload, 1 );
      return {
        ...state,
        recipes: recipes
      };
    default:
      return state;
  }
}
