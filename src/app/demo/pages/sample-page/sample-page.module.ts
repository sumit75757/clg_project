import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SamplePageRoutingModule } from './sample-page-routing.module';
import { SamplePageComponent } from './sample-page.component';
import {SharedModule} from '../../../theme/shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from 'src/app/service/interceptor.service';

@NgModule({
  declarations: [SamplePageComponent],
  imports: [
    CommonModule,
    SharedModule,
    SamplePageRoutingModule,
  ],
  providers:[
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },]
})
export class SamplePageModule { }
