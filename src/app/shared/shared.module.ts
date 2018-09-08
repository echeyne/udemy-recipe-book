// Typically only one shared module per application

import { NgModule } from '@angular/core';
import { DropdownDirective } from './dropdown.directive';
import { CommonModule } from '@angular/common';

@NgModule( {
  declarations: [
    DropdownDirective
  ],
  exports: [
    CommonModule,
    DropdownDirective
  ]
  // Don't provide services in shared modules. Especially not, if you plan to use them in lazy loaded modules!
} )
export class SharedModule {

}
