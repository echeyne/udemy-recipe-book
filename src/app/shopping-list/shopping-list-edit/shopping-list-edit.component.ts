import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component( {
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: [ './shopping-list-edit.component.css' ]
} )
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild( 'f' ) shoppingListForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor( private shoppingListService: ShoppingListService ) {
  }

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      ( index: number ) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.shoppingListService.getIngredient( this.editedItemIndex );
        this.shoppingListForm.setValue( {
          name: this.editedItem.name,
          amount: this.editedItem.amount
        } );
      } );
  }

  onSubmit( form: NgForm ) {
    const value = form.value;
    const newIngredient = new Ingredient( value.name, value.amount );
    if ( this.editMode ) {
      this.shoppingListService.updateIngredient( this.editedItemIndex, newIngredient );
    } else {
      this.shoppingListService.addIngredient( newIngredient );
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.shoppingListForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppingListService.removeIngredient( this.editedItemIndex );
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
