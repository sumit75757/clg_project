import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/login/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.scss']
})
export class SingupComponent implements OnInit {
  imageURL = environment.imageURL
  tableData: any;
  file: any;
  id: any;
  serch: any;
  constructor(private toastr: ToastrService, private fb: FormBuilder, private api: ApiService, public spiner: NgxSpinnerService, private route: Router, private activeRoute: ActivatedRoute) {}
  seller: FormGroup;
  ngOnInit(): void {
    this.seller = this.fb.group({
      username: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
      phone: new FormControl("", [Validators.required]),
      address: new FormControl("", [Validators.required]),
      city: new FormControl("", [Validators.required]),
      state: new FormControl("", [Validators.required]),
      zip: new FormControl("", [Validators.required]),
      age: new FormControl("", [Validators.required]),
      zender: new FormControl("", [Validators.required]),
      userImage: new FormControl(this.file),

    })
  }
  fileHendler(e: any) {
    let file = e.target.files[0]
    this.file = file
    this.seller.controls['userImage'].setValue(this.file)
  }
  submit() {
    this.spiner.show()
    console.log(this.file);
    console.log(this.seller.controls['zender'].value);
    let formdata = new FormData();
    // formdata.set('data',this.seller.)
    formdata.set('username', this.seller.controls['username'].value ? this.seller.controls['username'].value : '');
    formdata.set('email', this.seller.controls['email'].value ? this.seller.controls['email'].value : '');
    formdata.set('password', this.seller.controls['password'].value ? this.seller.controls['password'].value : '');
    formdata.set('phone', this.seller.controls['phone'].value ? this.seller.controls['phone'].value : '');
    formdata.set('address', this.seller.controls['address'].value ? this.seller.controls['address'].value : '');
    formdata.set('city', this.seller.controls['city'].value ? this.seller.controls['city'].value : '');
    formdata.set('zip', this.seller.controls['zip'].value ? this.seller.controls['zip'].value : '');
    formdata.set('age', this.seller.controls['age'].value ? this.seller.controls['age'].value : '');
    formdata.set('state', this.seller.controls['state'].value ? this.seller.controls['state'].value : '');
    formdata.set('zender', this.seller.controls['zender'].value ? this.seller.controls['zender'].value : '');
    formdata.set('character', 'seller');
    formdata.append('userImage', this.file);

    this.api.addSeller(formdata).subscribe((res: any) => {
        if (res.response = 'success') {
          console.log(res);
          this.spiner.hide()
        } else {
          this.spiner.hide()
        }
      })

    this.spiner.hide()
  }

}
