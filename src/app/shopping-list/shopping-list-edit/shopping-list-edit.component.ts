import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducers';

@Component( {
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: [ './shopping-list-edit.component.css' ]
} )
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild( 'f' ) shoppingListForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItem: Ingredient;

  constructor( private store: Store<fromApp.AppState> ) {
  }

  ngOnInit() {
    this.subscription = this.store.select( 'shoppingList' ).subscribe(
      data => {
        if ( data.editedIngredientIndex > -1 ) {
          this.editedItem = data.editedIngredient;
          this.editMode = true;
          this.shoppingListForm.setValue( {
            name: this.editedItem.name,
            amount: this.editedItem.amount
          } );
        } else {
          this.editMode = false;
        }
      }
    );
  }

  onSubmit( form: NgForm ) {
    const value = form.value;
    const newIngredient = new Ingredient( value.name, value.amount );
    if ( this.editMode ) {
      this.store.dispatch( new ShoppingListActions.UpdateIngredient( newIngredient ) );
    } else {
      this.store.dispatch( new ShoppingListActions.AddIngredient( newIngredient ) );
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.shoppingListForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.store.dispatch( new ShoppingListActions.DeleteIngredient() );
    this.onClear();
  }

  ngOnDestroy() {
    this.store.dispatch( new ShoppingListActions.StopEdit() );
    this.subscription.unsubscribe();
  }

}
