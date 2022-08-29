import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServiceCatagoryComponent } from './service-catagory.component';


const routes: Routes = [
  {
    path: '',
    component:ServiceCatagoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceCatagoryRoutingModule { }
