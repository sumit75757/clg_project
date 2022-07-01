import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { UserComponent } from './user.component';
import { CartComponent } from './cart/cart.component';


@NgModule({
  declarations: [UserComponent, CartComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ],
  schemas: []
})
export class UserModule { }
