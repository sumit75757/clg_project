import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SamplePageRoutingModule } from './sample-page-routing.module';
import { SamplePageComponent } from './sample-page.component';
import {SharedModule} from '../../../theme/shared/shared.module';

@NgModule({
  declarations: [SamplePageComponent],
  imports: [
    CommonModule,
    SharedModule,
    SamplePageRoutingModule,
  ]
})
export class SamplePageModule { }
