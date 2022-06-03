import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { LoginComponent } from './login/login.component';
import { Page404Component } from './page404/page404.component';
import { Page500Component } from './page500/page500.component';
import { ButtonModule, CardModule, FormModule, GridModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { NotificationsModule } from "../../components/notifications/notifications.module";
import { ApiService } from 'src/app/service/login/api.service';
import { HttpClientModule } from "@angular/common/http";
import { ToastModule } from '@coreui/angular';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
@NgModule({
  declarations: [
    LoginComponent,
    Page404Component,
    Page500Component
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    CardModule,
    ButtonModule,
    GridModule,
    IconModule,
    FormModule,
    FormsModule,
    ReactiveFormsModule,
    NotificationsModule,
    HttpClientModule,
    ToastModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
  ],
  providers:[
    ApiService
  ]
})
export class PagesModule {
}
