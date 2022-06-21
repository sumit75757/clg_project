import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import 'sweetalert2/src/sweetalert2.scss';

import Swal from 'sweetalert2';
import { environment } from "../../../../../environments/environment";
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.scss']
})
export class ShopsComponent implements OnInit {
  imageURL = environment.imageURL
  tableData: any;
  file: any;
  id: any;
  constructor(private fb: FormBuilder, private api: ApiService, public spiner: NgxSpinnerService, private route: Router, private activeRoute: ActivatedRoute) { }
  product: FormGroup ;

  ngOnInit(): void {
    this.product = this.fb.group({
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
      character: new FormControl("", [Validators.required]),
      userImage: new FormControl(this.file),

    })
    this.getseller()
  }

  fileHendler(e: any) {
    debugger
    let file = e.target.files[0]
    this.file = file
    this.product.controls['userImage'].setValue(this.file)
  }

  getseller() {
    this.clearForm()
    this.spiner.show()
    this.api.getSeller().subscribe((res: any) => {

      if (res.response == 'success') {
        console.log(res);
        this.tableData = res.sellers
        this.spiner.hide()
      }  else {
        this.spiner.hide()
      }
      if (res.count == 0) {
        this.spiner.hide()
        Swal.fire('Sorry!', 'Seller Not Found!', 'info');
      }

    })
  }

  update(item) {
    this.id = item._id
    if (this.id) {
      this.product.patchValue(item)
      this.product.controls['email'].disable()
      this.product.controls['password'].disable()
      console.log(item);
    }
  }

  clearForm() {

    this.id = null
    console.log(this.id);
    this.product.reset()
    this.product.controls['email'].enable()
    this.product.controls['password'].enable()
  }

  submit() {
    this.spiner.show()
    console.log(this.file);
    console.log(this.product.controls['zender'].value);
    let formdata = new FormData();
    // formdata.set('data',this.product.)
    formdata.set('username', this.product.controls['username'].value);
    formdata.set('email', this.product.controls['email'].value);
    formdata.set('password', this.product.controls['password'].value);
    formdata.set('phone', this.product.controls['phone'].value);
    formdata.set('address', this.product.controls['address'].value);
    formdata.set('city', this.product.controls['city'].value);
    formdata.set('zip', this.product.controls['zip'].value);
    formdata.set('age', this.product.controls['age'].value);
    formdata.set('state', this.product.controls['state'].value);
    formdata.set('zender', this.product.controls['zender'].value);
    formdata.set('character', 'seller');
    formdata.append('userImage', this.file);
    if (this.id) {
      this.api.updateSeller(formdata, this.id).subscribe((res:any) => {
        if (res.response = 'success') {
          console.log(res);
          this.spiner.hide()
          this.getseller()
          this.id = null
          Swal.fire('Update!', 'Seller Updated!', 'success');
        } else {
          Swal.fire('Error!', 'Somthing Wrong!', 'error');
        }
        this.id = null
      })
    }
    else {
      this.api.addSeller(formdata).subscribe((res:any) => {
        if (res.response = 'success') {
          console.log(res);
          this.spiner.hide()
          this.getseller()
          Swal.fire('Create!', 'Seller created!', 'success');
        }  else {
          Swal.fire('Error!', 'Somthing Wrong!', 'error');
        }

      })
    }
    this.spiner.hide()

  }


  remove(id) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Once deleted, you will not be able to recover this imaginary file!',
        type: 'warning',
        showCloseButton: true,
        showCancelButton: true
      }).then((willDelete) => {
        if (willDelete.dismiss) {
          Swal.fire('', 'Somthing Wrong !', 'error');
        } else {
          this.api.removeSeller(id).subscribe(res => {
            Swal.fire('', '! Seller has been deleted!', 'success');
            this.getseller()
          })
        }
      });
    }
}
