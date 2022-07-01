import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { UserComponent } from './user.component';


const routes: Routes = [
  {
    path: '',
    component:UserComponent
  },
  {
    path: 'cart/:id',
    component: CartComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
