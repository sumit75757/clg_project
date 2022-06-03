import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardComponent} from './dashboard.component'

import { UsersComponent } from "../container/users/users.component";
@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class DashboardModule { }
