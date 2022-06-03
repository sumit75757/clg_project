import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  constructor(private classToggler: ClassToggleService,private route :Router,private spiner : NgxSpinnerService) {
    super();
  }
  logout(){
    let token = localStorage.getItem('token')
    if(token){
      this.spiner.show();
      setTimeout(() => {
        localStorage.removeItem('token')
        this.route.navigate(['login'])
        this.spiner.hide();
      }, 600);
    }
    else{
      this.spiner.hide();

    }
  }
}
