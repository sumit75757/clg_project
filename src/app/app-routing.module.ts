import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardGuard } from './service/auth/auth-guard.guard';
import { RouteGuardGuard } from './service/route/route-guard.guard';
import { SellerGuard } from "./service/sellerroute/seller.guard";
import { AdminComponent } from './theme/layout/admin/admin.component';
import {AuthComponent} from './theme/layout/auth/auth.component';
import { SingupComponent } from './theme/layout/singup/singup.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [RouteGuardGuard],
    children: [
      {
        path: '',
        redirectTo: 'sample-page',
        pathMatch: 'full'
      },
      {
        path: 'sample-page',
        loadChildren: () => import('./demo/pages/sample-page/sample-page.module').then(module => module.SamplePageModule)
      },
      {
        path: 'seller',
        loadChildren: () => import('./demo/pages/seller/seller.module').then(module => module.SellerModule)
      },
      {
        path: 'catogory',
        loadChildren: () => import('./demo/pages/catagory/catagory.module').then(module => module.CatagoryModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./demo/pages/user/user.module').then(module => module.UserModule)
      },
      {
        path: 'services/catogory',
        loadChildren: () => import('./demo/pages/service-catagory/service-catagory.module').then(module => module.ServiceCatagoryModule)
      },
      {
        path: 'service',
        loadChildren: () => import('./demo/pages/services/services.module').then(module => module.ServicesModule)
      },
    ]
  },
  {
    path: 'login',
    component: AuthComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'singup',
    component: SingupComponent,
    canActivate: [AuthGuardGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
