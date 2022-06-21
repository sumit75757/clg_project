import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerComponent } from './seller.component';
import { ProductsComponent } from './products/products.component';
import { SellerRoutingModule } from './seller-routing.module';
import { SharedModule } from '../../../theme/shared/shared.module';
import { ShopsComponent } from './shops/shops.component';


@NgModule({
  declarations: [SellerComponent, ShopsComponent, ProductsComponent],
  imports: [
    CommonModule,
    SellerRoutingModule,
    SharedModule

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SellerModule { }
