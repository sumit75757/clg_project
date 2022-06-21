import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatagoryRoutingModule } from './catagory-routing.module';
import { CatagoryComponent } from './catagory.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';


@NgModule({
  declarations: [CatagoryComponent],
  imports: [
    CommonModule,
    CatagoryRoutingModule,

    SharedModule
  ]
})
export class CatagoryModule { }
