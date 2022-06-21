import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CatagoryComponent } from './catagory.component';


const routes: Routes = [
  { path:'',component:CatagoryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatagoryRoutingModule { }
