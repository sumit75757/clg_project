import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { SellerComponent } from './seller.component';
import { ShopsComponent } from './shops/shops.component';
import { ViewComponent } from './view/view.component';


const routes: Routes = [
  {
    path: '', component: ShopsComponent,

  },
  {
    path: 'prodects/:id', component: ProductsComponent
  },

  {
    path: "prodects/:id/view/:productId", component: ViewComponent
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule { }
