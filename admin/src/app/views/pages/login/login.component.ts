import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupName, Validators } from "@angular/forms";
import { ToasterComponent, ToasterPlacement } from '@coreui/angular';
import { ApiService } from "../../../service/login/api.service";
import { AppToastComponent } from "../../../components/notifications/toasters/toast-simple/toast.component";
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild(ToasterComponent) toaster!: ToasterComponent;

  constructor(private fb: FormBuilder, private api: ApiService, private toastr: ToastrService, public spiner: NgxSpinnerService, private route: Router) {
  }
  loginform: FormGroup | any;
  ngOnInit() {

    this.loginform = this.fb.group({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required]),
      character: new FormControl("admin", [Validators.required]),
    })
  }

  placement = ToasterPlacement.TopCenter;
  options = {
    title: `CoreUI for Angular Toast`,
    delay: 5000,
    placement: this.placement,
    color: 'info',
    autohide: true,
  }


  submit() {
    this.spiner.show()
    if (this.loginform.valid) {
      this.api.adminLogin(this.loginform.value).subscribe((res: any) => {
        localStorage.setItem('token', res.token)
        localStorage.setItem("userData", res.useData)
        this.toastr.success('login')
        setTimeout(() => {
          this.route.navigate(['/dashboard'])
          this.spiner.hide()
        }, 200);
      })
    } else {
      this.toastr.warning('login Fail');
      this.spiner.show()
    }
  }
  tost(){
    this.toastr.warning('login Fail');

  }

}
