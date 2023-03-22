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
import { PipePipe } from "../../../pipe/pipe.pipe";
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { ImageCropperModule } from 'ngx-image-cropper';
@NgModule({

  declarations: [SellerComponent, ShopsComponent, ProductsComponent , ViewComponent, PipePipe],
  imports: [
    CommonModule,
    SellerRoutingModule,
    SharedModule,
    AngularEditorModule,
    ToastrModule.forRoot(),
    NgbDropdownModule,
    NgbDatepickerModule,
    AmazingTimePickerModule,
    ImageCropperModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SellerModule { }
