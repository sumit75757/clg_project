import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceCatagoryRoutingModule } from './service-catagory-routing.module';

import { ServiceCatagoryComponent } from "./service-catagory.component";
import { SharedModule } from 'src/app/theme/shared/shared.module';
@NgModule({
  declarations: [ServiceCatagoryComponent],
  imports: [
    CommonModule,
    ServiceCatagoryRoutingModule,
    SharedModule
  ]
})
export class ServiceCatagoryModule { }
