import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { SellerComponent } from './seller.component';
import { ShopsComponent } from './shops/shops.component';


const routes: Routes = [{
  path: '', component: ShopsComponent,

},
{
  path: 'prodects/:id', component: ProductsComponent
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule { }
