import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { UserComponent } from './user.component';
import { CartComponent } from './cart/cart.component';
import { ToastrModule } from 'ngx-toastr';
import { SrinkPipe } from 'src/app/pipe/srink.pipe';


@NgModule({
  declarations: [UserComponent, CartComponent, SrinkPipe],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
     ToastrModule.forRoot(),

  ],
  schemas: []
})
export class UserModule { }
