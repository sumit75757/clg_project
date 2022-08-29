import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

import { ApiService } from 'src/app/service/login/api.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(private fb: FormBuilder, private api: ApiService, private route: Router, public spiner: NgxSpinnerService,) {
  }
  loginform: FormGroup ;

  ngOnInit() {
    this.loginform = this.fb.group({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required]),
      character: new FormControl("admin", [Validators.required]),
    })
  }
  submit() {
    this.spiner.show()
    if (this.loginform.valid) {
      this.api.adminLogin(this.loginform.value).subscribe((res: any) => {

        localStorage.setItem('token', res.token)
        localStorage.setItem("userData", JSON.stringify(res.useData))
        setTimeout(() => {
          this.route.navigate(['/'])
          this.spiner.hide()
        }, 200);
      })
    } else {
      this.spiner.show()
    }

  }
}
