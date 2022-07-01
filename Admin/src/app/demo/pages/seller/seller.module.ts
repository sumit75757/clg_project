import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerComponent } from './seller.component';
import { ProductsComponent } from './products/products.component';
import { SellerRoutingModule } from './seller-routing.module';
import { SharedModule } from '../../../theme/shared/shared.module';
import { ShopsComponent } from './shops/shops.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ViewComponent } from './view/view.component';
import { ToastrModule } from 'ngx-toastr';
@NgModule({
  declarations: [SellerComponent, ShopsComponent, ProductsComponent, ViewComponent],
  imports: [
    CommonModule,
    SellerRoutingModule,
    SharedModule,
    AngularEditorModule,
    ToastrModule.forRoot()
  ],
  schemas: [  ]
})
export class SellerModule { }
