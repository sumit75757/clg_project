import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { SharedModule } from "./theme/shared/shared.module";

import { AppComponent } from "./app.component";
import { AdminComponent } from "./theme/layout/admin/admin.component";
import { AuthComponent } from "./theme/layout/auth/auth.component";
import { NavigationComponent } from "./theme/layout/admin/navigation/navigation.component";
import { NavContentComponent } from "./theme/layout/admin/navigation/nav-content/nav-content.component";
import { NavGroupComponent } from "./theme/layout/admin/navigation/nav-content/nav-group/nav-group.component";
import { NavCollapseComponent } from "./theme/layout/admin/navigation/nav-content/nav-collapse/nav-collapse.component";
import { NavItemComponent } from "./theme/layout/admin/navigation/nav-content/nav-item/nav-item.component";
import { NavBarComponent } from "./theme/layout/admin/nav-bar/nav-bar.component";
import { NavLeftComponent } from "./theme/layout/admin/nav-bar/nav-left/nav-left.component";
import { NavSearchComponent } from "./theme/layout/admin/nav-bar/nav-left/nav-search/nav-search.component";
import { NavRightComponent } from "./theme/layout/admin/nav-bar/nav-right/nav-right.component";
import { ConfigurationComponent } from "./theme/layout/admin/configuration/configuration.component";
import { HashLocationStrategy, LocationStrategy } from "@angular/common";

import { ToggleFullScreenDirective } from "./theme/shared/full-screen/toggle-full-screen";
import { NgxSpinnerModule } from "ngx-spinner";
import { AngularEditorModule } from "@kolkov/angular-editor";
/* Menu Items */
import { NavigationItem } from "./theme/layout/admin/navigation/navigation";
import {
  NgbButtonsModule,
  NgbDropdownModule,
  NgbTabsetModule,
  NgbTooltipModule,
} from "@ng-bootstrap/ng-bootstrap";
import { ApiService } from "./service/login/api.service";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ToastrModule, ToastrService } from "ngx-toastr";
import { SingupComponent } from "./theme/layout/singup/singup.component";
import { InterceptorService } from "./service/interceptor.service";
@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AuthComponent,
    NavigationComponent,
    NavContentComponent,
    NavGroupComponent,
    NavCollapseComponent,
    NavItemComponent,
    NavBarComponent,
    NavLeftComponent,
    NavSearchComponent,
    NavRightComponent,
    ConfigurationComponent,
    ToggleFullScreenDirective,
    SingupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgbButtonsModule,
    NgbTabsetModule,
    HttpClientModule,
    NgxSpinnerModule,
    AngularEditorModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    NavigationItem,
    ApiService,
    { provide: ToastrService },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
