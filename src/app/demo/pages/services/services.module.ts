import { NgModule } from '@angular/core';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';
import { ServiceComponent } from './service.component'
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { AmazingTimePickerModule } from 'amazing-time-picker';

@NgModule({
  declarations: [ServiceComponent],
  imports: [
    CommonModule,
    SharedModule,
    ServicesRoutingModule,
    AngularEditorModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    AmazingTimePickerModule
  ]
})
export class ServicesModule { }
